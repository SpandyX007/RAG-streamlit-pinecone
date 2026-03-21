import time

# Dictionary to hold session_id: last_active_timestamp
active_sessions = {}

def update_session(session_id: str):
    """Updates the last active time for a session."""
    active_sessions[session_id] = time.time()