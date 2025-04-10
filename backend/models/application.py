from datetime import date
from typing import Optional
from pydantic import BaseModel


class Application(BaseModel):
    id: Optional[str] = None
    company: str
    position: str
    date_applied: date
    status: str
    notes: Optional[str] = None


class ApplicationRequest(BaseModel):
    company: str
    position: str
    date_applied: date
    status: str
    notes: Optional[str] = None
