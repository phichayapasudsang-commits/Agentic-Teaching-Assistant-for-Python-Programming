from fastapi import APIRouter
from langchain_core.messages import HumanMessage
from app.models.schemas import ChatRequest, CodeRequest
from app.graph.workflow import app_graph

router = APIRouter()

@router.post("/chat")
async def chat_endpoint(req: ChatRequest):
    config = {"configurable": {"thread_id": req.session_id}}
    inputs = {
        "latest_action": "chat",
        "chat_history": [HumanMessage(content=req.message)],
        "is_first_topic": req.is_first_topic
    }
    if req.is_first_topic:
        inputs["user_goal"] = req.message
        
    result = app_graph.invoke(inputs, config=config)
    return {
        "reply": result["chat_history"][-1].content,
        "plan": result.get("dynamic_plan", []),
        "starting_code": result.get("starting_code", "")
    }

@router.post("/run-code")
async def run_code_endpoint(req: CodeRequest):
    config = {"configurable": {"thread_id": req.session_id}}
    inputs = {
        "latest_action": "run_code",
        "user_code": req.code
    }
    result = app_graph.invoke(inputs, config=config)
    return {
        "terminal_output": result.get("execution_results", ""),
        "ai_feedback": result["chat_history"][-1].content
    }