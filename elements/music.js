/* servers = {}; */
const ytdl = require("ytdl-core");
const discord = require("discord.js");
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
        server.queue.push(sLink);

    } else if (server.queue.length == 0) {
        msg.channel.send("Det må være noen sanger i queue da");
        return;
    }


    if (!msg.member.voiceChannel) {
        msg.channel.send("Du må være i en voice-channel");
        return;
    }


    function play(conn, msg) {
        server.dispatcher = conn.playStream(ytdl(server.queue[0], {
            filter: "audioonly"
        }));
        server.queue.shift();
        server.dispatcher.on("end", function () {
            console.log("ferdig med sang");

            if (server.queue[0]) {
                play(conn, msg);
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

    if (msg.guild.voiceConnection) {
        try {
            server.dispatcher.end();
            msg.channel.send("Stoppet sangen, spiller neste sang i queue");
            console.log(msg.guild.connection);
            if (msg.guild.connnection) {
                msg.guild.voiceConnection.disconnect();
            }

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
                queue.push(args[2]);
                msg.channel.send("Har lag til \n'" + args[2] + "'\n i queue");
            } catch (e) {
                msg.channel.send("Det skjedde en feil med queue, prøv igjen");
                console.log("Queue error (add): \n" + e);
            }
            break;

        case "remove":
            if (queue.indexOf(args[2]) > -1) {
                try {
                    queue.splice(queue.indexOf(args[2], 1));
                    msg.channel.send(args[2] + "\n har blitt fjernet fra queue");
                } catch (e) {
                    msg.channel.send("Det skjedde en feil med queue, prøv igjen");
                    console.log("Queue error(remove): \n" + e);
                }
            } else {
                msg.channel.send("Denne adressen er ikke listet i queue");
            }
            break;
        default:
            const util = require("util");
            if (queue.length > 0) {
                msg.channel.send(util.inspect(queue));
                break;
            }
            msg.channel.send("Queue er tom");
            break;
    }
    return queue;
}

module.exports.skip = function skip(msg) {
    const server = servers[msg.guild.id];
    if (server.dispatcher) server.dispatcher.end();
}