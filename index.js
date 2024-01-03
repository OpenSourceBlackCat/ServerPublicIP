const {Client, GatewayIntentBits} = require("discord.js");
// require("dotenv").config({path: ".env"});
var request = require("request");
_CODE = "```";
const AmeyaBot = new Client({intents:[GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping]});

const sendIP = async() =>{
    var Manager = await AmeyaBot.users.fetch(process.env.MANAGER);
    request("http://ifconfig.me", async function(error, response, body) {
    if (!error && response.statusCode == 200) {
        await Manager.send(`Prajyot's Server Public IP: ${_CODE}${String(body)}${_CODE}`);
        }
    });
}
AmeyaBot.on("ready", async()=>{
    await sendIP();
});
AmeyaBot.on("messageCreate", async(ctx)=>{
    if(!ctx.author.bot && ctx.author.id==process.env.MANAGER){
        await sendIP();
    }
})
AmeyaBot.login(process.env.TOKEN);

