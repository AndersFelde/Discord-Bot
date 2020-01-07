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

try {
    Bot.login(token);
} catch (error) {
    console.log("Feil token er oppgitt, boten startet derfor ikke");
}

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
//for music





Bot.on("message", msg => {

    if (msg.author.id !== Bot.user.id) {
        //så den ikke svarer seg selv
        var content = msg.content;
        if (content.toLowerCase().includes("gay")) {
            msg.channel.send("<@" + msg.author.id + "> er gay")
        }

        if (content.charAt(0) == prefix) {
            const args = content.substring(prefix.length).toLowerCase().split(" ");

            switch (args[0]) {
                case "spam":
                    if (!(args.length < 3)) {
                        const ant = args[2];
                        const spam = args[1];

                        const spamFunc = require("./elements/spam").spam;
                        spamFunc(ant, spam, msg);

                    } else {
                        msg.reply("skriv hva jeg skal spamme, og hvor mange ganger")
                    }
                    break;

                case "h":
                    embedMessage = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle('Help')
                        .setDescription('Help for commands')
                        .setThumbnail('https://i.imgur.com/h2yoQh5.jpg')
                        .addField('!play', 'Da svarer den bare play')
                        .addField('!spam', '"[Det du vil spamme], [Hvor mange ganger](ikke mer enn 50)"')
                        .addField('Tagging', 'Hvis du tagger sander eller meg på spam så fucker det den som sender')
                        .setImage('https://i.imgur.com/h2yoQh5.jpg')
                        .setTimestamp()
                        .setFooter('AK-47', 'https://i.imgur.com/h2yoQh5.jpg');

                    msg.channel.send(embedMessage);
                    break;

                case "dick":

                    embedMessage = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle("DICK")
                        .setImage('https://www.totstoteens.co.nz/wp-content/uploads/2018/08/drawings.jpg')
                        .setFooter('AK-47', 'https://i.imgur.com/h2yoQh5.jpg');
                    msg.channel.send(embedMessage);
                    break;

                case "reddit":
                    api = require("./elements/redditApi");
                    if (args[1]) {
                        sub = args[1];
                    } else {
                        sub = "dankmemes";
                    }
                    api.post(sub).then((post) => {
                        if (post) {
                            //sjekker om subreddit finnes
                            const title = post.title;
                            const author = post.author;

                            var embedMessage = new Discord.RichEmbed()
                                .setColor('#0099ff')
                                .setTitle("Top reddit post fra r/" + sub)
                                .addField("Title", title)

                            if (post.link) {
                                const link = post.link;
                                embedMessage.addField("Link", link);
                            } else if (post.img) {
                                const img = post.img;
                                embedMessage.setImage(img)
                            }


                            embedMessage
                                .addField("Author", author)
                                .setFooter('AK-47', 'https://i.imgur.com/h2yoQh5.jpg');

                            msg.channel.send(embedMessage);
                        } else {
                            msg.channel.send("Finner ikke den subredditen")
                        }
                    })
                    break;
                case "play":
                    const argsPlay = content.substring(prefix.length).split(" ");
                    //pga det vil fucke med linker når det alltid blir til lowercase
                    if (!argsPlay[1]) {
                        argsPlay[1] = false;
                    }

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

                    //for music
                    //

            }
            exports.musicQueue = servers[msg.guild.id].queue
        }

    }
})