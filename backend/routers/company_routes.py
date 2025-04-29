from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException, status, Depends
from backend.auth.jwt_auth import TokenData
from backend.models.company import Company, CompanyRequest
from backend.routers.user_routes import get_current_user

company_router = APIRouter()


# get all companies
@company_router.get("")
async def get_companies(current_user: TokenData = Depends(get_current_user)):
    return await Company.find(Company.created_by == current_user.username).to_list()


# get company by an id
@company_router.get("/{id}")
async def get_company_by_id(id: PydanticObjectId):
    company = await Company.get(id)
    if not company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Company not found"
        )
    return company


# create an company
@company_router.post("", status_code=status.HTTP_201_CREATED)
async def add_company(
    company: CompanyRequest, current_user: TokenData = Depends(get_current_user)
):
    new_company = Company(
        name=company.name,
        description=company.description,
        website=company.website,
        applications=company.applications,
        created_by=current_user.username,
    )
    await Company.insert(new_company)
    return new_company


# update company
@company_router.put("/{id}")
async def update_company(id: PydanticObjectId, company: CompanyRequest):
    existing_company = await Company.get(id)
    if not existing_company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="company not found"
        )
    existing_company.name = company.name
    existing_company.description = company.description
    existing_company.website = company.website
    existing_company.applications = company.applications
    existing_company.created_by = company.created_by
    await existing_company.save()
    return existing_company


# delete an company
@company_router.delete("/{id}")
async def remove_company(id: PydanticObjectId):
    company = await Company.get(id)
    if not company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Company not found"
        )
    await company.delete()
    return {"message": "company deleted successfully"}
