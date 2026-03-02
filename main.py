from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from PyPDF2 import PdfReader
from PIL import Image
from dotenv import load_dotenv
import pytesseract
import json
import re
import time
import os
from dotenv import load_dotenv
load_dotenv()

# =========================
# Load Environment Variables
# =========================

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")

client = genai.Client(api_key=GEMINI_API_KEY)

# =========================
# FastAPI App
# =========================

app = FastAPI(title="AutoDeal Autonomous Contract Intelligence API")

# 🔥 CORS FIX (IMPORTANT FOR FRONTEND)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Gemini Wrapper
# =========================

def gemini_call(system_prompt, user_prompt):
    full_prompt = f"""
    SYSTEM:
    {system_prompt}

    USER:
    {user_prompt}
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=full_prompt
    )

    return response.text


# =========================
# Input Processor
# =========================

def process_input(file: UploadFile = None, text_input: str = None):

    if text_input and text_input.strip():
        return text_input.strip()

    if file:
        filename = file.filename

        if filename.endswith(".pdf"):
            reader = PdfReader(file.file)
            text = ""
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
            return text

        if filename.lower().endswith((".png", ".jpg", ".jpeg")):
            image = Image.open(file.file)
            return pytesseract.image_to_string(image)

    return None


# =========================
# Structured Contract Analysis
# =========================

def structured_analysis(goal, contract_text):

    system_prompt = """
You are a financial lease contract intelligence system.

Tasks:
1. Extract structured financial data.
2. Detect currency used in contract.
   - If ₹ present → INR
   - If $ present → USD
   - If € present → EUR
   - If no symbol present → assume INR
3. Preserve original currency format in values.

Return STRICT JSON:

{
    "currency_detected": "",
    "contract_summary": {
        "MSRP": "",
        "Selling Price": "",
        "Monthly Payment": "",
        "Lease Term": "",
        "Mileage Limit": "",
        "APR_or_Money_Factor": "",
        "Residual Value": "",
        "Fees": ""
    },
    "fairness_score": 0,
    "risk_flags": [],
    "negotiation_strategy": "",
    "email_draft": ""
}

Return only valid JSON.
"""

    user_prompt = f"""
    USER GOAL:
    {goal}

    CONTRACT CONTENT:
    {contract_text}
    """

    response = gemini_call(system_prompt, user_prompt)

    try:
        return json.loads(response)
    except:
        match = re.search(r'\{.*\}', response, re.DOTALL)
        if match:
            return json.loads(match.group(0))
        return {"error": "Failed to parse structured analysis"}


# =========================
# Autonomous Planner
# =========================

def planner(goal, contract_text):

    system_prompt = """
    Generate structured multi-step execution plan to:
    - Analyze contract
    - Score fairness
    - Identify leverage
    - Generate negotiation output

    Return ONLY valid JSON list.
    """

    user_prompt = f"""
    GOAL: {goal}

    CONTRACT:
    {contract_text[:3000]}
    """

    response = gemini_call(system_prompt, user_prompt)

    match = re.search(r'\[.*\]', response, re.DOTALL)

    if match:
        return json.loads(match.group(0))

    return None


# =========================
# Execution Simulation
# =========================

def execute_plan(plan):
    for step in plan:
        step["status"] = "Completed"
    return plan
# =========================
# API Routes
# =========================

@app.get("/")
def home():
    return {"message": "AutoDeal Autonomous AI Backend Running"}


@app.post("/run-agent")
async def run_agent(
    goal: str = Form(...),
    text_input: str = Form(None),
    file: UploadFile = File(None)
):

    contract_text = process_input(file, text_input)

    if not contract_text:
        return {"error": "No valid contract input provided"}

    analysis_result = structured_analysis(goal, contract_text)

    plan = planner(goal, contract_text)

    if not plan:
        return {"error": "Planning failed"}

    execution_result = execute_plan(plan)

    return {
        "status": "Execution Completed",
        "analysis": analysis_result,
        "execution_plan": execution_result
    }