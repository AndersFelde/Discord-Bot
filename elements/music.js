/* servers = {}; */

module.exports.play = function (sLink, msg, server) {
    const ytdl = require("ytdl-core");

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


    if (!checkUrl(sLink)) {
        msg.channel.send("Nop, ikke en valid URL");
        return;
    }

    if (!msg.member.voiceChannel) {
        msg.channel.send("Du må være i en voice-channel");
        return;
    }

    /*    if (!servers) {
           servers = {
               queue: []
           }
       }
    */

    function play(conn, msg) {
        console.log(server.queue);
        server.dispather = conn.playStream(ytdl(server.queue[0], {
            filter: "audioonly"
        }));
        const dispatcher = server.dispatcher;
        server.queue.shift();
        console.log(server.queue);
        server.dispather.on("end", function () {
            console.log("ferdig med sang");

            if (server.queue[0]) {
                play(conn, msg);
            } else {
                conn.disconnect();
            }
        })
        return dispatcher;
    }

    server.queue.push(sLink);

    if (!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(function (conn) {
        x = play(conn, msg);
        return x;
    })
}

module.exports.stop = function stop(msg, server) {

    console.log(server);
    if (msg.guild.voiceConnection) {
        for (let i = server.queue.length; i >= 0; i--) {
            server.queue.splice(i, 1);
        }
        server.dispatcher.end();
        console.log("Stopped queue");
        msg.channel.send("Stoppet queue, ingenting er nå i queue");
    }

    if (msg.guild.connnection) msg.guild.voiceConnection.disconnect();

}

module.exports.queue = function queue() {

}

module.exports.skip = function skip(msg) {
    const server = servers[msg.guild.id];
    if (server.dispatcher) server.dispatcher.end();
}