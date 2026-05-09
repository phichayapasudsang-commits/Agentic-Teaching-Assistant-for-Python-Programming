import os
from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import GOOGLE_API_KEY

os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY

# ตั้งค่า LLM หลักของระบบ
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.2)