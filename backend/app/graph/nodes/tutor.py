from langchain_core.messages import HumanMessage, AIMessage
from app.core.llm import llm
from app.graph.state import TutorState

def tutor_node(state: TutorState):
    history = state.get("chat_history", [])
    plan = state.get("dynamic_plan", [])
    step = state.get("current_step", 0)
    current_topic = plan[step] if step < len(plan) else "เรียนจบแล้ว"

    system_prompt = f"""
    คุณคือ AI Tutor สอนเขียนโปรแกรม Python แนวปฏิบัติจริง (Action-Oriented)
    หน้าที่สำคัญ: กระตุ้นให้นักศึกษา "ลงมือเขียนโค้ด" ในหน้าต่าง Editor ทางฝั่งขวา และกดปุ่ม Run Code เสมอ

    กฎเหล็ก:
    1. ห้ามพิมพ์โค้ดเฉลยแบบเต็มๆ เด็ดขาด! ให้คำใบ้ทีละนิด ให้เขาคิดเอง
    2. แทนที่จะถามให้นักศึกษาพิมพ์ตอบในแชท ให้บอกว่า "ลองเขียนโค้ดในช่องขวามือแล้วกด Run Code ดูนะครับ"
    3. หากนักศึกษาสงสัย ให้ไกด์ว่าจะต้องพิมพ์โค้ดคำสั่งอะไรคร่าวๆ เพื่อให้เขาไปเขียนต่อเอง
    
    ตอนนี้นักศึกษากำลังเรียนหัวข้อย่อย: {current_topic}
    จงตอบกลับด้วยความเป็นมิตร สั้นกระชับ และจบประโยคด้วยการชวนให้ลงมือเขียนโค้ด
    """
    
    response = llm.invoke([HumanMessage(content=system_prompt)] + history)
    return {"chat_history": [AIMessage(content=response.content)]}