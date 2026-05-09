from pydantic import BaseModel

class ChatRequest(BaseModel):
    session_id: str
    message: str
    is_first_topic: bool = False

class CodeRequest(BaseModel):
    session_id: str
    code: str