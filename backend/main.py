from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
from application_routes import application_router

app = FastAPI()
app.include_router(application_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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
async def serve_spa(full_path: str):
    index_file_path = os.path.join("static", "index.html")
    if os.path.exists(index_file_path):
        return FileResponse(index_file_path)
    return {"error": "Frontend not built"}
