const Discord = require("discord.js");
const fs = require("fs");

const Bot = new Discord.Client();
const token = fs.readFileSync("node_modules/token.txt", "utf-8");

Bot.on("ready", () => {
    console.log("Bot er online")
});

Bot.on("message", msg => {
    if (msg.content === "HELLO") {
        msg.reply("HELLO FRIEND");
    }
})

Bot.login(token);