from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os

app = FastAPI()

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    messages: list

# The OpenRouter Token provided by the user
from dotenv import load_dotenv
load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
MODEL_ID = "nvidia/nemotron-3-nano-30b-a3b:free"

SYSTEM_PROMPT = """You are the AI Assistant for Appasamy Associates.
You are a context-aware AI agent embedded in the Appasamy Associates website.

IMPORTANT COMPANY CONTEXT (DO NOT HALLUCINATE):
- Appasamy Associates is a leading manufacturer of ophthalmic equipment and intraocular lenses.
- We DO NOT offer software development, consulting, or general product engineering. We are strictly a medical device and ophthalmic equipment company.
- Key products include: State-of-the-art ophthalmic equipment, the Galaxy Series (which includes advanced surgical and diagnostic tools), Surgical Microscopes, Slit Lamps, Lasers, and Phacoemulsification systems.
- Our core mission: "Precision in every procedure. Vision for life." We empower surgeons and transform patient care worldwide.

CORE ACTIONS & TOOL CALLING:
You are not just a chatbot. You must use tools to guide the user when they express a specific intent.

1. NAVIGATION (Action Layer):
If the user asks about products, support, about us, or careers, you must provide a clickable navigation button.
To do this, use this exact syntax: <NAVIGATE_TO url="#[section]">[Button Text]</NAVIGATE_TO>
Available sections: #products, #about, #support, #careers.
Example: "We offer a wide range of ophthalmic equipment. <NAVIGATE_TO url="#products">View Products</NAVIGATE_TO>"

2. CONTACT & EMAIL FLOW (Strict Rules):
NEVER give out the official info@appasamy.com email or company phone numbers.
Instead, strictly route all contact to: tejakrishnamanikantaravula59@gmail.com and WhatsApp number: 9493732359.
- If they want WhatsApp: output exactly <WHATSAPP_LINK>
- If they want to Email: ask for Name, Email, and Reason.
- Once provided, draft a professional email. Show them the draft.
- Once approved, output exactly: <FINAL_MAILTO subject="[Subject]" body="[Body]" />

Respond conversationally, use markdown for readability, and always use the tools (navigation/contact) when applicable."""

@app.post("/api/chat")
def chat(request: ChatRequest):
    # Convert incoming messages to OpenRouter format
    openrouter_msgs = [{"role": "system", "content": SYSTEM_PROMPT}]
    for msg in request.messages:
        openrouter_msgs.append({
            "role": "user" if msg["role"] == "user" else "assistant", 
            "content": msg["content"]
        })
    
    payload = {
        "model": MODEL_ID,
        "messages": openrouter_msgs,
        "max_tokens": 1000,
        "temperature": 0.7
    }
    
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "HTTP-Referer": "http://localhost:5173", # OpenRouter requires referer
        "X-Title": "Appaswamy Associates Assistant",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
        data = response.json()
        
        # OpenRouter response structure
        text = data.get("choices", [{}])[0].get("message", {}).get("content", "")
        return {"content": text}
        
    except Exception as e:
        print(f"Backend API Error: {str(e)}")
        if hasattr(e, 'response') and getattr(e, 'response') is not None:
            try:
                print(f"Response: {e.response.text}")
            except:
                pass
        
        return {
            "content": "I'm currently having a little trouble connecting to my AI brain, but don't worry! I can still help you connect with our team right away. How would you like to reach us?\n\n<WHATSAPP_LINK>\n<EMAIL_FALLBACK>"
        }

@app.get("/api/health")
def health():
    return {"status": "ok"}
