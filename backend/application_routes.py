from typing import Annotated
from fastapi import APIRouter, Path, status
from models.application import Application, ApplicationRequest

application_router = APIRouter()


@application_router.get("")
async def get_applications() -> list[Application]:
    pass


@application_router.get("/{application_id}")
async def get_application_by_id(
    application_id: Annotated[int, Path(ge=0, lt=1000)],
) -> Application:
    pass


@application_router.post("", status_code=status.HTTP_201_CREATED)
async def add_application(application: ApplicationRequest) -> Application:
    pass


@application_router.put("/{application_id}")
async def update_application(
    input_application: ApplicationRequest, application_id: int
) -> Application:
    pass


@application_router.delete("/{application_id}")
async def remove_payment(application_id: int) -> dict:
    pass
