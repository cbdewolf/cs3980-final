from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException, status, Depends
from backend.auth.jwt_auth import TokenData
from backend.models.reminder import Reminder, ReminderRequest
from backend.routers.user_routes import get_current_user

# will have to implement user logic soon

reminder_router = APIRouter()


# get all apps
@reminder_router.get("")
async def get_reminders(current_user: TokenData = Depends(get_current_user)):
    return await Reminder.find(Reminder.created_by == current_user.username).to_list()


# get app by an id
@reminder_router.get("/{id}")
async def get_reminder_by_id(id: PydanticObjectId):
    reminder = await Reminder.get(id)
    if not reminder:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Reminder not found"
        )
    return reminder


# create an app
@reminder_router.post("", status_code=status.HTTP_201_CREATED)
async def add_reminder(
    reminder: ReminderRequest, current_user: TokenData = Depends(get_current_user)
):
    new_reminder = Reminder(
        text=reminder.text,
        completed=reminder.completed,
        date=reminder.date,
        time=reminder.time,
        created_by=current_user.username,
    )
    await Reminder.insert(new_reminder)
    return new_reminder


# update app
@reminder_router.put("/{id}")
async def update_reminder(id: PydanticObjectId, reminder: ReminderRequest):
    existing_reminder = await Reminder.get(id)
    if not existing_reminder:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="reminder not found"
        )
    existing_reminder.text = reminder.text
    existing_reminder.completed = reminder.completed
    existing_reminder.date = reminder.date
    existing_reminder.time = reminder.time
    existing_reminder.created_by = reminder.created_by
    await existing_reminder.save()
    return existing_reminder


# delete an app
@reminder_router.delete("/{id}")
async def remove_reminder(id: PydanticObjectId):
    reminder = await Reminder.get(id)
    if not reminder:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Reminder not found"
        )
    await reminder.delete()
    return {"message": "reminder deleted successfully"}
