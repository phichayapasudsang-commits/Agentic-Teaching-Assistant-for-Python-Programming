from langchain_core.messages import HumanMessage, AIMessage
from app.core.llm import llm
from app.graph.state import TutorState

def analysis_node(state: TutorState):
    code = state.get("user_code", "")
    results = state.get("execution_results", "")
    
    prompt = f"""
    [โค้ดของนักศึกษา]:\n{code}\n
    [ผลลัพธ์จาก Sandbox]:\n{results}\n
    กฎเหล็ก: "Explain-then-Grade" ห้ามให้โค้ดเฉลย!
    จงวิเคราะห์ Syntax/Logical Error อธิบายเป็นภาษาไทยให้นักศึกษาเข้าใจ และบอกใบ้จุดที่ต้องแก้
    """
    response = llm.invoke([HumanMessage(content=prompt)])
    return {"chat_history": [AIMessage(content=response.content)]}