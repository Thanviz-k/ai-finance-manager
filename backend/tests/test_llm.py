import os
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from llm import get_advice


class AdviceProviderTests(unittest.IsolatedAsyncioTestCase):
    async def test_returns_gemini_fallback_when_key_missing(self):
        original_key = os.getenv("GEMINI_API_KEY")
        os.environ.pop("GEMINI_API_KEY", None)
        os.environ.pop("GOOGLE_API_KEY", None)
        try:
            advice = await get_advice({"Food": 100}, 100, provider="gemini")
        finally:
            if original_key is not None:
                os.environ["GEMINI_API_KEY"] = original_key
        self.assertIn("Gemini", advice)


if __name__ == "__main__":
    unittest.main()
