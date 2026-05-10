import json
from langchain_core.messages import HumanMessage, AIMessage
from app.core.llm import llm
from app.graph.state import TutorState

def planner_node(state: TutorState):
    goal = state.get("user_goal", "")
    prompt = f"""
    คุณคือผู้ช่วยสอนภาษา Python หน้าที่ของคุณคือการแตกหัวข้อที่นักศึกษาสงสัยออกเป็น 3 หัวข้อย่อย (Micro-Plan)
    และสร้างตัวอย่างโค้ดเริ่มต้นที่เกี่ยวข้องกับหัวข้อนั้น
    หัวข้อที่นักศึกษาสงสัย: "{goal}"
    ตอบกลับมาเป็น JSON object เท่านั้น ที่มี keys ดังนี้:
    - "plan": เป็น JSON array ของ String 3 ข้อ เช่น ["1. คอนเซปต์พื้นฐาน", "2. ไวยากรณ์", "3. การนำไปใช้จริง"]
    - "starting_code": เป็น string ของโค้ด Python ที่ตรงกับหัวข้อนี้ เพื่อให้นักศึกษาลองเขียนต่อ
    ห้ามพิมพ์ข้อความอื่นนอกจาก JSON
    """
    response = llm.invoke([HumanMessage(content=prompt)])
    
    try:
        cleaned_response = response.content.strip().replace("```json", "").replace("```", "")
        parsed = json.loads(cleaned_response)
        plan = parsed.get("plan", ["1. ทำความเข้าใจคอนเซปต์", "2. ดูตัวอย่างไวยากรณ์", "3. ลองเขียนโค้ด"])
        starting_code = parsed.get("starting_code", "# Write your code here")
    except:
        plan = ["1. ทำความเข้าใจคอนเซปต์", "2. ดูตัวอย่างไวยากรณ์", "3. ลองเขียนโค้ด"]
        starting_code = "# Write your code here\n"

    welcome_msg = f"เข้าใจแล้วครับ! เรามาเรียนเรื่อง '{goal}' กันนะครับ ทางซ้ายมือนี้ผมแบ่งขั้นตอนการเรียนไว้ให้แล้ว\n\nส่วนทางขวามือคือ **Code Editor** ผมเตรียมโค้ดเริ่มต้นไว้ให้ ลองสังเกตโค้ดในช่องขวามือแล้วกดปุ่ม **Run Code** เพื่อดูผลลัพธ์ หรือจะลองแก้โค้ดเลยก็ได้นะครับ!"
    
    return {"dynamic_plan": plan, "starting_code": starting_code, "current_step": 0, "chat_history": [AIMessage(content=welcome_msg)]}