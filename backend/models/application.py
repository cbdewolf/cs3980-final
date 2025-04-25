from datetime import date
from typing import Optional
from pydantic import BaseModel
from beanie import Document


class Application(Document):
    company: str
    position: str
    date_applied: date
    status: str
    notes: Optional[str] = None
    created_by: str

    class Settings:
        name = "applications"


class ApplicationRequest(BaseModel):
    company: str
    position: str
    date_applied: date
    status: str
    notes: Optional[str] = None
    created_by: str
