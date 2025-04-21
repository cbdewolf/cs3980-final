from beanie import Document
from pydantic import BaseModel


class Reminder(Document):
    title: str
    description: str
    date: str
    time: str
    status: str

    class Settings:
        name = "reminders"


class ReminderRequest(BaseModel):
    title: str
    description: str
    date: str
    time: str
    status: str
