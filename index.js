const Discord = require("discord.js");
const fs = require("fs");

const Bot = new Discord.Client();
const token = fs.readFileSync("node_modules/token.txt", "utf-8");
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


Bot.on("message", msg => {
    if (msg.author.id !== Bot.user.id) {
        //så den ikke svarer seg selv
        var content = msg.content;
        if (content.toLowerCase().includes("gay")) {
            msg.channel.send("<@" + msg.author.id + "> er gay")
        }

        if (content.charAt(0) == prefix) {
            let args = content.substring(prefix.length).split(" ");

            switch (args[0]) {
                case "play":
                    msg.reply("play");
                    break;

                case "spam":
                    if (!(args.length < 3)) {
                        let ant = args[2];
                        let spam = args[1];


                        if (spam.includes("214453967952805889") /* Anders */ ||
                            spam.includes("183226380031492096") /* Sander */
                        ) {
                            msg.reply("fuck deg");
                            spam = "<@!" + msg.author.id + ">";
                        }

                        function cutString(string, needle) {
                            startPos = string.indexOf(needle) + 1;
                            x = string.substring(startPos);
                            endPos = x.indexOf(needle) + startPos;
                            spam = string.substring(startPos, endPos);

                            let outArr = Array();

                            ant = content.substring(endPos + 1).split(" ")[1];
                            outArr.push(spam);
                            outArr.push(ant);
                            return outArr;
                        }

                        if (spam.charAt(0) == '"') {
                            let x = cutString(content, '"');
                            spam = x[0];
                            ant = x[1];
                        }

                        if (spam.charAt(0) == "'") {
                            let x = cutString(content, "'");
                            spam = x[0];
                            ant = x[1];
                        }

                        ant = parseInt(ant, 10);
                        if (Number.isInteger(ant)) {

                            if (ant < 51) {
                                console.log("Spamming: '" + spam + "' " + ant + " times");
                                for (let i = 0; i < ant; i++) {
                                    msg.channel.send(spam);
                                }
                            } else {
                                msg.reply("det der er litt mange ganger da");
                            }
                        } else {
                            msg.reply("når jeg sier hvor mange ganger så må jeg ha et tall da vettu");
                        }

                    } else {
                        msg.reply("skriv hva jeg skal spamme, og hvor mange ganger")
                    }
                    break;

            }

        }

    }
})