"""
todo: implement company model and other company related fun stuff
what even are we doing with companies?
"""

from beanie import Document
from pydantic import BaseModel


class Company(Document):
    name: str
    description: str
    website: str
    applications: list[str]
    created_by: str

    class Settings:
        name = "companies"


class CompanyRequest(BaseModel):
    name: str
    description: str
    website: str
    applications: list[str]
    created_by: str
