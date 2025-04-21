from beanie import init_beanie
from backend.models.my_config import get_settings
from motor.motor_asyncio import AsyncIOMotorClient
from backend.models.application import Application
from backend.models.company import Company
from backend.models.reminder import Reminder
from backend.models.user import User


async def init_db():
    my_config = get_settings()
    client = AsyncIOMotorClient(my_config.connection_string)
    db = client["final_project"]
    await init_beanie(
        database=db,
        document_models=[User, Application, Reminder, Company],
    )
