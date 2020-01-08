const Discord = require("discord.js");
const fs = require("fs");


const Bot = new Discord.Client();
try {
    token = fs.readFileSync("token.txt", "utf-8");
} catch (error) {
    console.log("Du trenger en token fil, som skal ligge i root og hete token.txt \n" +
        error);
}
token = token.replace(/\s/g, '');
//ta bort mellomrom, fucka meg hardt en gang

const prefix = "!";

Bot.login(token);


Bot.on("ready", () => {
    console.log("Bot er online");
});

Bot.on("reconnecting", () => {
    console.log("reconnecting");
});

Bot.on("disconnect", () => {
    console.log("disconnected");
});

var servers = {};

Bot.on("message", msg => {

    if (msg.author.id !== Bot.user.id) {
        //så den ikke svarer seg selv
        const content = msg.content;
        if (content.toLowerCase().includes("gay")) {
            msg.channel.send("<@" + msg.author.id + "> er gay")
        }

        if (content.charAt(0) != prefix) return;

        const args = content.substring(prefix.length).toLowerCase().split(" ");

        switch (args[0]) {
            case "spam":
                require("./elements/spam").spam(msg, args);
                break;
            case "h":
            case "?":
            case "help":
                msg.channel.send(require("./elements/help").help());
                break;
            case "dick":
                require("./elements/random").dick(msg);
                break;
            case "reddit":
                let sub;
                if (args[1]) {
                    sub = args[1]
                } else {
                    sub = "dankmemes";
                }
                require("./elements/redditApi").post(sub, msg);
                break;
            case "play":
                const argsPlay = content.substring(prefix.length).split(" ");
                //pga det vil fucke med linker når det alltid blir til lowercase
                if (!argsPlay[1]) argsPlay[1] = false;

                if (!servers[msg.guild.id]) {
                    servers[msg.guild.id] = {
                        queue: []
                    }
                }

                require("./elements/music").play(argsPlay[1], msg, servers[msg.guild.id]);
                servers[msg.guild.id].dispatcher = require("./elements/music").dispatcher;
                break;

            case "stop":
                if (!servers[msg.guild.id].dispatcher) {
                    msg.channel.send("Det spilles ingen sanger nå");
                    return;
                }
                require("./elements/music").stop(msg, servers[msg.guild.id]);
                break;

            case "queue":

                if (!servers[msg.guild.id]) {
                    servers[msg.guild.id] = {
                        queue: []
                    }
                }

                var queue = servers[msg.guild.id].queue;
                const queueArgs = content.substring(prefix.length).split(" ");
                servers[msg.guild.id].queue = require("./elements/music").queue(msg, queueArgs, queue);
                break;

            case "skip":
                if (!msg.guild.voiceConnection) break;
                if (servers[msg.guild.id].queue.length == 0) break;
                require("./elements/music").skip(servers[msg.guild.id]);
                break;

            default:
                msg.channel.send("Jeg skjønte ikke hva du mente, prøv '!h'");
                break;

        }
        if (servers[msg.guild.id] && servers[msg.guild.id].queue) {
            exports.musicQueue = servers[msg.guild.id].queue
        }

    }
})