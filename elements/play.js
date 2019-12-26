module.exports.play = function (sLink, msg) {
    const ytdl = require("ytdl-core");
    var servers = {};

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

    if (!servers[msg.guild.id]) {
        servers[msg.guild.id] = {
            queue: []
        }
    }

    function play(conn, msg) {
        var server = servers[msg.guild.id];
        console.log(server);
        server.dispather = conn.playStream(ytdl(server.queue[0], {
            filter: "audioonly"
        }));

        console.log(server.dispather);
        server.queue.shift();
        server.dispather.on("end", function () {
            console.log("ferdig");
            if (server.queue[0]) {
                play(conn, msg);

            } else {
                conn.disconnect();
            }
        })

    }

    var server = servers[msg.guild.id];

    server.queue.push(sLink);

    if (!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(function (conn) {
        play(conn, msg);

    })

}