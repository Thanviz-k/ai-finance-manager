import os
import tempfile
from fastapi import FastAPI, File, Query, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from analyzer import categorize
from llm import get_advice
from parser import extract_transactions

app = FastAPI(title="AI Finance Coach")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    provider: str = Query(default="gemini", enum=["openai", "gemini"]),
):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        contents = await file.read()
        tmp.write(contents)
        tmp_path = tmp.name

    try:
        transactions = extract_transactions(tmp_path)
        if not transactions:
            return {"error": "No transactions found. Make sure the PDF has readable text."}

        result = categorize(transactions)
        advice = await get_advice(result["breakdown"], result["total"], provider)
        return {**result, "advice": advice, "provider": provider}
    except Exception as exc:
        return {
            "error": f"Analysis failed: {str(exc)}",
            "breakdown": {},
            "total": 0,
            "transactions": [],
            "advice": "We could not generate AI advice right now, but your transaction summary is ready.",
            "provider": provider,
        }
    finally:
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)


@app.get("/")
def root():
    return {"status": "AI Finance Coach running"}