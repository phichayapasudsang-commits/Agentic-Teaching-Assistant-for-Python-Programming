import subprocess
from app.graph.state import TutorState

def sandbox_node(state: TutorState):
    code = state.get("user_code", "")
    try:
        result = subprocess.run(["python", "-c", code], capture_output=True, text=True, timeout=5)
        output = result.stdout if result.returncode == 0 else result.stderr
    except subprocess.TimeoutExpired:
        output = "Error: Timeout (ใช้เวลาทำงานนานเกิน 5 วินาที อาจเกิด Infinite Loop)"
    except Exception as e:
        output = f"Error: {str(e)}"
    
    return {"execution_results": output}