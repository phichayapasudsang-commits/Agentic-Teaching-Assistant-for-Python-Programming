from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from app.graph.state import TutorState
from app.graph.nodes.planner import planner_node
from app.graph.nodes.tutor import tutor_node
from app.graph.nodes.sandbox import sandbox_node
from app.graph.nodes.analyzer import analysis_node

workflow = StateGraph(TutorState)

workflow.add_node("planner", planner_node)
workflow.add_node("tutor", tutor_node)
workflow.add_node("sandbox", sandbox_node)
workflow.add_node("analysis", analysis_node)

def route_action(state: TutorState):
    action = state.get("latest_action")
    is_first = state.get("is_first_topic", False)
    
    if action == "run_code": return "sandbox"
    if action == "chat":
        return "planner" if is_first else "tutor"

workflow.set_conditional_entry_point(route_action)
workflow.add_edge("planner", END)
workflow.add_edge("tutor", END)
workflow.add_edge("sandbox", "analysis")
workflow.add_edge("analysis", END)

memory = MemorySaver()
app_graph = workflow.compile(checkpointer=memory)