import asyncio
import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))


async def get_advice(breakdown: dict, total: float, provider: str = "gemini") -> str:
    summary_text = "\n".join([f"- {cat}: Rs.{amt}" for cat, amt in breakdown.items()])
    prompt = f"""You are a personal finance coach. A user's monthly spending breakdown is:

{summary_text}
Total spent: Rs.{total}

Give them:
1. A short analysis of their spending habits (2-3 sentences)
2. 3 specific, actionable budgeting tips based on their biggest spending categories
3. An encouraging closing line

Keep it friendly, concise, and practical."""

    normalized_provider = (provider or "gemini").lower()

    if normalized_provider == "gemini":
        api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
        if not api_key:
            return "Your spending summary is ready. Add your Gemini API key to unlock AI coaching advice."

        try:
            from google import genai

            client = genai.Client(api_key=api_key)
            response = await asyncio.to_thread(
                client.models.generate_content,
                model="gemini-2.0-flash",
                contents=prompt,
            )
            return getattr(response, "text", None) or "Your spending summary is ready."
        except Exception as exc:
            message = str(exc).lower()
            if "quota" in message or "429" in message or "resource exhausted" in message:
                return (
                    "Your spending summary is ready. "
                    "AI coaching is temporarily unavailable because your Gemini account quota has been exhausted. "
                    "Please add credits or wait for the quota to reset."
                )
            return (
                "Your spending summary is ready. "
                "The Gemini request failed. Please try again in a moment."
            )

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return "Your spending summary is ready. Add your OpenAI API key to unlock AI coaching advice."

    try:
        from openai import AsyncOpenAI

        client = AsyncOpenAI(api_key=api_key)
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500,
        )
        return response.choices[0].message.content or "Your spending summary is ready."
    except Exception as exc:
        message = str(exc)
        if "insufficient_quota" in message or "429" in message:
            return (
                "Your spending summary is ready. "
                "AI coaching is temporarily unavailable because your OpenAI account quota has been exhausted. "
                "Please add credits or wait for the quota to reset."
            )
        return (
            "Your spending summary is ready. "
            "The AI request failed. Please try again in a moment."
        )