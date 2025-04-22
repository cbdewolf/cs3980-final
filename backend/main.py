from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
from backend.routers.application_routes import application_router
from backend.routers.reminder_routes import reminder_router
from backend.routers.company_routes import company_router
from backend.routers.user_routes import user_router
from backend.db.db_context import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup
    print("starting app....")
    await init_db()
    yield
    # shutdown
    print("shutting down app...")


app = FastAPI(title="job-application-tracker", version="1.0.0", lifespan=lifespan)
# in the future need to include user and company routers as well
app.include_router(
    application_router, tags=["applications"], prefix="/api/applications"
)
app.include_router(reminder_router, tags=["reminders"], prefix="/api/reminders")
app.include_router(company_router, tags=["companies"], prefix="/api/companies")
app.include_router(user_router, tags=["users"], prefix="/api/users")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:8000",
        "http://localhost:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

static_path = os.path.join(os.path.dirname(__file__), "static")
app.mount("/static", StaticFiles(directory=static_path), name="static")


@app.get("/")
def root():
    return FileResponse(os.path.join(static_path, "index.html"))


@app.get("/{full_path:path}")
async def serve_spa():
    index_file_path = os.path.join(static_path, "index.html")
    if os.path.exists(index_file_path):
        return FileResponse(index_file_path)
    return {"error": "Frontend not built"}
