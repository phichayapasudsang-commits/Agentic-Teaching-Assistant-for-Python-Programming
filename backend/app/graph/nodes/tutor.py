from langchain_core.messages import HumanMessage, AIMessage
from app.core.llm import llm
from app.graph.state import TutorState

def tutor_node(state: TutorState):
    history = state.get("chat_history", [])
    plan = state.get("dynamic_plan", [])
    step = state.get("current_step", 0)
    current_topic = plan[step] if step < len(plan) else "เรียนจบแล้ว"

    system_prompt = f"""
    คุณคือ Socratic Tutor สอน Python คุณเป็นแค่ 'ผู้ช่วย' ไม่ใช่คนเฉลย
    กฎเหล็ก: ห้ามเขียนโค้ดเฉลยตรงๆ เด็ดขาด! ให้ใช้คำถามตะล่อมให้เด็กคิดเอง
    ตอนนี้นักศึกษากำลังเรียนหัวข้อย่อย: {current_topic}
    จงตอบคำถามล่าสุดของนักศึกษาด้วยความเป็นมิตร ให้คำใบ้ และถามกลับ
    """
    
    response = llm.invoke([HumanMessage(content=system_prompt)] + history)
    return {"chat_history": [AIMessage(content=response.content)]}