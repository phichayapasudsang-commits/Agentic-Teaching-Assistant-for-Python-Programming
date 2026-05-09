from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router

app = FastAPI(title="Agentic Python Tutor API")

# อนุญาตให้ React เรียกข้อมูลได้
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # อนุญาตให้ทุกเว็บ (รวมถึง Vercel) เข้าถึง API ได้
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# นำเอา API Routes มาเชื่อมกับแอปหลัก
app.include_router(api_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)