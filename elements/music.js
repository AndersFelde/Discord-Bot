/* servers = {}; */
const ytdl = require("ytdl-core");
const Discord = require("discord.js");
const URL = require("url").URL;
const checkUrl = (a) => {
    try {
        new URL(a);
        return true;
    } catch (err) {
        console.log("Sang URL error: \n" + err);
        return false;
    }
}

module.exports.play = async function (sLink, msg, server) {

    if (sLink) {
        if (!checkUrl(sLink)) {
            msg.channel.send("Nop, ikke en valid URL");
            return;
        }

        song = {
            link: sLink,
        };
        server.queue.push(song);
        ytdl.getInfo(sLink, function (err, info) {
            if (err) {
                console.log(err);
                msg.channel.send("Klarte ikke finne info om sangen, er nok noe galt med linken");
                return;
            }
            msg.channel.send("Spiller nå:\n" + info.title);
        });

    } else if (server.queue.length == 0) {
        msg.channel.send("Det må være noen sanger i queue da");
        return;
    }


    if (!msg.member.voiceChannel) {
        msg.channel.send("Du må være i en voice-channel");
        return;
    }


    function play(conn, msg, queue) {
        console.log(server.queue);
        if (!server.queue) {
            server.queue = queue;
        }
        server.dispatcher = conn.playStream(ytdl(server.queue[0].link, {
            filter: "audioonly"
        }));
        if (server.queue[0].title) msg.channel.send("Spiller nå:\n" + server.queue[0].title);
        server.queue.shift();
        server.dispatcher.on("end", function (x, q) {
            if (x == "stop") {
                conn.disconnect();
                return;
            } else if (x == "skip") {
                play(conn, msg, q);
                return;
            }
            console.log("ferdig med sang");

            queue = require("../index").musicQueue;
            if (queue[0]) {
                play(conn, msg, queue);

            } else {
                conn.disconnect();
            }
        })

        return server.dispatcher;

    }


    if (!msg.guild.voiceConnection) {
        x = msg.member.voiceChannel.join().then(function (conn) {
            k = play(conn, msg)
            return k;

        })
        return await x;
    }


}

module.exports.stop = function stop(msg, server) {

    if (!server.dispatcher) {
        msg.channel.send("Det spilles ingen sang nå");
        return;
    }
    if (msg.guild.voiceConnection) {
        try {
            server.dispatcher.end("stop");
            msg.channel.send("Stoppet sangen");
            /* msg.guild.voiceConnection.disconnect(); */

        } catch (e) {
            msg.channel.send("Det ser ut som det har skjedd noe feil med stoppingen");
            console.log(e);
            console.log(server.dispatcher);
        }
        console.log("Stopped song");
    }


}

module.exports.queue = function queue(msg, args, queue) {
    switch (args[1]) {
        case "add":
            if (!args[2]) {
                msg.channel.send("Du må ha noe jeg skal adde da");
                break;
            }
            if (!checkUrl(args[2])) {
                msg.channel.send("Nop, ikke en valid URL");
                break;
            }
            try {
                ytdl.getInfo(args[2], function (err, info) {
                    if (err) {
                        console.log(err);
                        msg.channel.send("Klarte ikke finne info om sangen, er nok noe galt med linken");
                        return;
                    }
                    console.log(info.title);
                    song = {
                        title: info.title,
                        link: args[2]
                    }
                    queue.push(song);
                    msg.channel.send("Har lag til \n'" + info.title + "'\n i queue");
                });




            } catch (e) {
                msg.channel.send("Det skjedde en feil med queue, prøv igjen");
                console.log("Queue error (add): \n" + e);
            }
            break;

        case "remove":

            try {
                console.log(args[2]);
                if (isNaN(args[2]) == false && args[2] > 0) {
                    if (args[2] > queue.length) {
                        msg.channel.send("Tallet må være lavere enn lengden på queue");
                    } else {
                        msg.channel.send(queue[args[2] - 1].title + "\n har blitt fjernet fra queue");
                        queue.splice(args[2] - 1, 1);
                    }
                } else if (queue.indexOf(args[2]) > -1) {
                    queue.splice(queue.indexOf(args[2], 1));
                    msg.channel.send(args[2] + "\n har blitt fjernet fra queue");
                } else {
                    msg.channel.send("Denne adressen er ikke listet i queue");
                }
            } catch (e) {
                msg.channel.send("Det skjedde en feil med queue, prøv igjen");
                console.log("Queue error(remove): \n" + e);
            }

            break;
        case "reset":
            queue = [];
        default:
            if (queue.length > 0) {
                embedMessage = new Discord.RichEmbed()
                    .setColor('#0099ff')
                    .setTitle('Queue')
                    .setThumbnail('https://i.imgur.com/h2yoQh5.jpg')
                    .setFooter('AK-47', 'https://i.imgur.com/h2yoQh5.jpg');

                for (let i = 0; i < queue.length; i++) {
                    const e = queue[i].title;
                    embedMessage.addField(i + 1, e);

                }
                msg.channel.send(embedMessage);
                break;
            }
            msg.channel.send("Queue er tom");
            break;
    }
    return queue;
}

module.exports.skip = function skip(server) {
    if (server.dispatcher) {
        server.dispatcher.end("skip", server.queue);
    }

}