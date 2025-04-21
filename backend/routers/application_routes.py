from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException, status
from backend.models.application import Application, ApplicationRequest

# will have to implement user logic soon

application_router = APIRouter()


# get all apps
@application_router.get("")
async def get_applications():
    return await Application.find_all().to_list()


# get app by an id
@application_router.get("/{id}")
async def get_application_by_id(id: PydanticObjectId):
    application = await Application.get(id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Application not found"
        )
    return application


# create an app
@application_router.post("", status_code=status.HTTP_201_CREATED)
async def add_application(application: ApplicationRequest):
    new_application = Application(
        company=application.company,
        position=application.position,
        date_applied=application.date_applied,
        status=application.status,
        notes=application.notes,
    )
    await Application.insert(new_application)
    return new_application


# update app
@application_router.put("/{id}")
async def update_application(id: PydanticObjectId, application: ApplicationRequest):
    existing_application = await Application.get(id)
    if not existing_application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Application not found"
        )
    existing_application.company = application.company
    existing_application.position = application.position
    existing_application.date_applied = application.date_applied
    existing_application.status = application.status
    existing_application.notes = application.notes
    await existing_application.save()
    return existing_application


# delete an app
@application_router.delete("/{id}")
async def remove_application(id: PydanticObjectId):
    application = await Application.get(id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Application not found"
        )
    await application.delete()
    return {"message": "Application deleted successfully"}
