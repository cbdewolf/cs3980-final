from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os
from application_routes import application_router

app = FastAPI()
app.include_router(application_router)

static_path = os.path.join(os.path.dirname(__file__), "static")
app.mount("/static", StaticFiles(directory=static_path), name="static")


@app.get("/")
def root():
    return FileResponse(os.path.join(static_path, "index.html"))


@app.get("/{full_path:path}")
def catch_all(full_path: str):
    return FileResponse(os.path.join(static_path, "index.html"))
