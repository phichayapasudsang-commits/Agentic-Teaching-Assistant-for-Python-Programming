from langchain_core.messages import HumanMessage, AIMessage
from app.core.llm import llm
from app.graph.state import TutorState

def analysis_node(state: TutorState):
    code = state.get("user_code", "")
    results = state.get("execution_results", "")
    
    prompt = f"""
    [โค้ดของนักศึกษา]:\n{code}\n
    [ผลลัพธ์จาก Sandbox]:\n{results}\n
    กฎเหล็ก: "Explain-then-Grade" ห้ามให้โค้ดเฉลยเด็ดขาด!
    หน้าที่ของคุณ:
    1. วิเคราะห์ Syntax หรือ Logical Error ที่เกิดขึ้น อธิบายด้วยภาษาไทยที่เข้าใจง่ายและเป็นมิตร
    2. ชี้เป้าว่าบรรทัดไหน หรือจุดไหนที่มีปัญหา และให้คำใบ้ว่าควรแก้ไปในทิศทางใด
    3. ลงท้ายด้วยการชวนให้นักศึกษากลับไปแก้โค้ดใน Editor แล้วกด Run Code เพื่อทดสอบอีกครั้ง
    """
    response = llm.invoke([HumanMessage(content=prompt)])
    return {"chat_history": [AIMessage(content=response.content)]}