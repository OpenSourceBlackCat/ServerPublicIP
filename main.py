from discord.ext.commands import Bot
from discord import Intents
from dotenv import load_dotenv
from os import getenv
from requests import get
load_dotenv()
AmeyBot = Bot(intents=Intents.all())

async def sendIP():
    Manager = await AmeyBot.fetch_user(getenv("MANAGER"))
    body = get("http://ifconfig.me")
    await Manager.send(f"Prajyot's Server IP: ```{str(body.content.decode('ascii'))}```")
@AmeyBot.event
async def on_ready():
    print("Running...")
    await sendIP()
@AmeyBot.event
async def on_message(ctx):
    if(not ctx.author.bot):
        if(str(ctx.author.id)==getenv("MANAGER")):
            await sendIP()
AmeyBot.run(getenv("TOKEN"))