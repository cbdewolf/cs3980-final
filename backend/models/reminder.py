from typing import Optional
from beanie import Document
from pydantic import BaseModel


class Reminder(Document):
    text: str
    completed: bool
    date: Optional[str] = ""
    time: Optional[str] = ""
    created_by: str

    class Settings:
        name = "reminders"


class ReminderRequest(BaseModel):
    text: str
    completed: bool
    date: Optional[str] = ""
    time: Optional[str] = ""
    created_by: str
