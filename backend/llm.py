import os

from dotenv import load_dotenv
from groq import AsyncGroq


load_dotenv()


async def get_advice(
    breakdown: dict,
    total: float,
    provider: str = "groq"
) -> str:

    summary_text = "\n".join(
        [f"- {cat}: Rs.{amt}" for cat, amt in breakdown.items()]
    )

    prompt = f"""
You are a personal finance coach.

A user's monthly spending breakdown is:

{summary_text}

Total spent: Rs.{total}

Give them:
1. A short analysis of their spending habits in 2-3 sentences.
2. Three specific and actionable budgeting tips based on their biggest spending categories.
3. An encouraging closing line.

Keep the response friendly, concise, and practical.
"""

    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        return (
            "Your spending summary is ready. "
            "Add your Groq API key to unlock AI coaching advice."
        )

    try:
        client = AsyncGroq(api_key=api_key)

        response = await client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=500,
        )

        return (
            response.choices[0].message.content
            or "Your spending summary is ready."
        )

    except Exception as exc:
        message = str(exc).lower()

        print(f"Groq API error: {exc}")

        if "429" in message or "rate limit" in message:
            return (
                "Your spending summary is ready. "
                "AI coaching is temporarily unavailable because "
                "the Groq API rate limit has been reached. "
                "Please try again later."
            )

        return (
            "Your spending summary is ready. "
            "The Groq AI request failed. Please try again."
        )