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

# The Bedrock Bearer Token provided by the user
from dotenv import load_dotenv
load_dotenv()
BEDROCK_API_KEY = os.getenv("AWS_BEDROCK_TOKEN", "ABSK_MISSING")
BEDROCK_REGION = "us-east-1"
MODEL_ID = "anthropic.claude-3-5-sonnet-20240620-v1:0"

SYSTEM_PROMPT = """You are the AI Assistant for Appasamy Associates.
Help users navigate the website, explain products, and help them contact the company.
CRITICAL INSTRUCTION FOR CONTACT REQUESTS:
Never give out the official info@appasamy.com email or company phone numbers.
Instead, you MUST route all contact to: tejakrishnamanikantaravula59@gmail.com and WhatsApp number: 9493732359.

When a user wants to connect or contact:
1. Ask if they prefer Email or WhatsApp.
2. If they choose WhatsApp: output exactly <WHATSAPP_LINK> and explain they can click it.
3. If they choose Email: ask for their Name, their Email address, and the reason for connecting.
4. Once they provide those details, draft a professional email on their behalf.
5. Show the draft to the user in the chat and ask if they want any changes.
6. If they want changes, update the draft and show it again.
7. Once they approve the draft, output exactly <FINAL_MAILTO subject="[Insert Subject]" body="[Insert Body]"> so the system can generate the email link. (Make sure the subject and body inside the tags match the approved draft)."""

@app.post("/api/chat")
def chat(request: ChatRequest):
    # Convert incoming standard messages to Anthropic format
    anthropic_msgs = []
    for msg in request.messages:
        anthropic_msgs.append({
            "role": "user" if msg["role"] == "user" else "assistant", 
            "content": msg["content"]
        })
    
    payload = {
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 1000,
        "temperature": 0.7,
        "system": SYSTEM_PROMPT,
        "messages": anthropic_msgs
    }
    
    url = f"https://bedrock-runtime.{BEDROCK_REGION}.amazonaws.com/model/{MODEL_ID}/invoke"
    headers = {
        "Authorization": f"Bearer {BEDROCK_API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
        data = response.json()
        
        # Bedrock Anthropic response structure
        text = data.get("content", [{"text": ""}])[0].get("text", "")
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
