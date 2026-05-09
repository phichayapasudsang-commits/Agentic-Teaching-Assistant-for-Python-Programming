import operator
from typing import List, Annotated, TypedDict
from langchain_core.messages import BaseMessage

class TutorState(TypedDict):
    user_goal: str
    dynamic_plan: List[str]
    current_step: int
    chat_history: Annotated[List[BaseMessage], operator.add]
    user_code: str
    execution_results: str
    latest_action: str
    starting_code: str
    is_first_topic: bool