from beanie import Document
from pydantic import BaseModel
from typing import Optional


class User(Document):
    username: str
    password: str
    bio: Optional[str] = ""
    profile_pic: Optional[str] = ""
    position: Optional[str] = ""
    school: Optional[str] = ""
    major: Optional[str] = ""
    is_admin: bool = False  # Add this field
    documents: Optional[list] = []  # Add this for document storage

    class Settings:
        name = "users"

class UserRequest(BaseModel):
    """
    model for user signup
    """

    username: str
    password: str
    bio: Optional[str] = ""
    profile_pic: Optional[str] = ""
    position: Optional[str] = ""
    school: Optional[str] = ""
    major: Optional[str] = ""


class UserUpdateRequest(BaseModel):
    bio: Optional[str] = None
    profile_pic: Optional[str] = None
    position: Optional[str] = None
    school: Optional[str] = None
    major: Optional[str] = None
    is_admin: Optional[bool] = None
