from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException, status
from backend.models.reminder import Reminder, ReminderRequest

# will have to implement user logic soon

reminder_router = APIRouter()


# get all apps
@reminder_router.get("")
async def get_reminders():
    return await Reminder.find_all().to_list()


# get app by an id
@reminder_router.get("/{id}")
async def get_reminder_by_id(id: PydanticObjectId):
    reminder = await reminder.get(id)
    if not reminder:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Reminder not found"
        )
    return reminder


# create an app
@reminder_router.post("", status_code=status.HTTP_201_CREATED)
async def add_reminder(reminder: ReminderRequest):
    new_reminder = reminder(
        title=reminder.title,
        description=reminder.description,
        date=reminder.date,
        time=reminder.time,
        status=reminder.status,
    )
    await reminder.insert(new_reminder)
    return new_reminder


# update app
@reminder_router.put("/{id}")
async def update_reminder(id: PydanticObjectId, reminder: ReminderRequest):
    existing_reminder = await reminder.get(id)
    if not existing_reminder:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="reminder not found"
        )
    existing_reminder.title = reminder.title
    existing_reminder.description = reminder.description
    existing_reminder.date = reminder.date
    existing_reminder.time = reminder.time
    existing_reminder.status = reminder.status
    await existing_reminder.save()
    return existing_reminder


# delete an app
@reminder_router.delete("/{id}")
async def remove_reminder(id: PydanticObjectId):
    reminder = await reminder.get(id)
    if not reminder:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Reminder not found"
        )
    await reminder.delete()
    return {"message": "reminder deleted successfully"}
