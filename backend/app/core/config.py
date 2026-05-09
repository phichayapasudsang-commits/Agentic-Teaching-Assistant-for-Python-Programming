import os
from dotenv import load_dotenv

load_dotenv()

# ดึงค่ามาจากไฟล์ .env (ห้ามใส่คีย์จริงลงในโค้ดเด็ดขาด!)
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("ไม่พบ GOOGLE_API_KEY ในไฟล์ .env โปรดตรวจสอบให้แน่ใจว่าคุณได้ตั้งค่าไว้แล้ว")