from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from backend.models.user import User, UserRequest, UserUpdateRequest
import os
import shutil
from backend.auth.jwt_auth import (
    Token,
    TokenData,
    create_access_token,
    decode_jwt_token,
)

pwd_context = CryptContext(schemes=["bcrypt"])

# Define a storage path for uploaded files
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "static", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

class HashPassword:
    def create_hash(self, password: str):
        return pwd_context.hash(password)

    def verify_hash(self, input_password: str, hashed_password: str):
        return pwd_context.verify(input_password, hashed_password)


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")
hash_password = HashPassword()


def get_user(token: Annotated[str, Depends(oauth2_scheme)]) -> TokenData:
    user = decode_jwt_token(token)

    if user is None or not user.username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    return user


user_router = APIRouter()


@user_router.post("/register")
async def sign_up(user: UserRequest):
    # need to add checkers for character length and special characters and such
    existing_user = await User.find_one(User.username == user.username)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists",
        )
    hashed_password = hash_password.create_hash(user.password)
    new_user = User(
        username=user.username,
        password=hashed_password,
    )
    await new_user.create()
    token = create_access_token({"username": user.username})
    return {"access_token": token, "username": user.username}


@user_router.post("/login")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    # Authenticate user by verifying the user in DB
    username = form_data.username
    existing_user = await User.find_one(User.username == username)
    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    authenticated = hash_password.verify_hash(
        form_data.password, existing_user.password
    )
    if authenticated:
        access_token = create_access_token({"username": username})
        return Token(access_token=access_token)

    raise HTTPException(status_code=401, detail="Invalid username or password")


@user_router.get("/me")
async def get_current_user(user: TokenData = Depends(get_user)):
    existing_user = await User.find_one(User.username == user.username)
    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    return existing_user


@user_router.put("/me")
async def update_user(
    update_data: UserUpdateRequest, user: TokenData = Depends(get_user)
):
    existing_user = await User.find_one(User.username == user.username)
    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="user not found",
        )
    update_dict = update_data.model_dump(exclude_unset=True)
    await existing_user.set(update_dict)
    return {"message": "User updated successfully"}

@user_router.get("/admin/users")
async def get_all_users(current_user: TokenData = Depends(get_user)):
    # Check if user is admin
    existing_user = await User.find_one(User.username == current_user.username)
    if not existing_user or not existing_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    
    # Get all users
    all_users = await User.find_all().to_list()
    return all_users

@user_router.put("/admin/users/{user_id}")
async def admin_update_user(
    user_id: PydanticObjectId,
    update_data: UserUpdateRequest,
    current_user: TokenData = Depends(get_user)
):
    # Check if user is admin
    admin_user = await User.find_one(User.username == current_user.username)
    if not admin_user or not admin_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    
    # Find user to update
    user_to_update = await User.get(user_id)
    if not user_to_update:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    # Update the user
    update_dict = update_data.model_dump(exclude_unset=True)
    await user_to_update.set(update_dict)
    return {"message": "User updated successfully"}

@user_router.delete("/admin/users/{user_id}")
async def admin_delete_user(
    user_id: PydanticObjectId,
    current_user: TokenData = Depends(get_user)
):
    # Check if user is admin
    admin_user = await User.find_one(User.username == current_user.username)
    if not admin_user or not admin_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    
    # Find user to delete
    user_to_delete = await User.get(user_id)
    if not user_to_delete:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    # Prevent deleting self
    if user_to_delete.username == current_user.username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete your own account",
        )
    
    # Delete the user
    await user_to_delete.delete()
    return {"message": "User deleted successfully"}

@user_router.post("/upload")
async def upload_file(file: UploadFile = File(...), user: TokenData = Depends(get_user)):
    # Get the current user
    existing_user = await User.find_one(User.username == user.username)
    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )
    
    # Create a unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{user.username}_{os.urandom(8).hex()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    # Save the file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Store the file reference in the user's document list
    file_url = f"/static/uploads/{unique_filename}"
    
    # If the user doesn't have a documents list yet, create one
    if not hasattr(existing_user, 'documents') or existing_user.documents is None:
        existing_user.documents = []
    
    # Add the new document to the list
    existing_user.documents.append({
        "name": file.filename,
        "url": file_url
    })
    
    # Save the updated user
    await existing_user.save()
    
    return {"filename": unique_filename, "url": file_url}