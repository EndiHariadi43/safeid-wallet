import os
from dotenv import load_dotenv
from aiogram import Bot, Dispatcher
from aiogram.types import Message

load_dotenv()
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
bot = Bot(token=TOKEN)
dp = Dispatcher()

@dp.message()
async def handle(msg: Message):
    if msg.text and msg.text.startswith("/score "):
        addr = msg.text.split(maxsplit=1)[1]
        score = (sum(ord(c) for c in addr.lower()) % 60) + 40  # mock 40..99
        await msg.answer(f"Reputation score for {addr}: {score}/100 (mock)")
    else:
        await msg.answer("Gunakan `/score 0xAlamat` untuk cek skor mock.")

if __name__ == "__main__":
    import asyncio
    asyncio.run(dp.start_polling(bot))
