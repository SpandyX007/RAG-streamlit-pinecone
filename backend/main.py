# backend/main.py
import asyncio
import time
from fastapi import FastAPI
from pydantic import BaseModel
from contextlib import asynccontextmanager

from injestion.injestion import injestion_router
from retrieval.retrieval import retrieval_router
from vectorDB.getDB import delete_records
from session_store import active_sessions

# Configuration (Times in seconds)
SESSION_TIMEOUT = 3600  # 1 hour
CLEANUP_INTERVAL = 600  # Run cleanup every 10 minutes

async def cleanup_inactive_sessions():
    while True:
        await asyncio.sleep(CLEANUP_INTERVAL)
        current_time = time.time()
        
        # Find sessions older than the timeout
        expired_sessions = [
            sid for sid, last_active in active_sessions.items()
            if current_time - last_active > SESSION_TIMEOUT
        ]
        
        for sid in expired_sessions:
            try:
                print(f"Cleaning up inactive namespace: {sid}")
                delete_records(namespace=sid)
                del active_sessions[sid]
            except Exception as e:
                print(f"Failed to delete namespace {sid}: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # This runs on startup
    cleanup_task = asyncio.create_task(cleanup_inactive_sessions())
    yield
    # This runs on shutdown
    cleanup_task.cancel()

app = FastAPI(lifespan=lifespan)

app.include_router(injestion_router)
app.include_router(retrieval_router)

class SessionInfo(BaseModel):
    session_id: str

@app.post('/clear-namespace')
async def clear_namespace(session: SessionInfo):
    try:
        delete_records(namespace=session.session_id)
        if session.session_id in active_sessions:
            del active_sessions[session.session_id]
        return {"status": "success", "message": f"Namespace {session.session_id} cleared"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get('/')
async def index():
    return {"message": "Service is Running!"}