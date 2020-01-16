const Discord = require("discord.js");
module.exports.wiki = function wiki(msg, arg) {
    console.log("Kjører");
    const wiki = require("wtf_wikipedia");
    wiki.fetch(arg).then((doc) => {
        var sents = doc.json().sections[0].paragraphs[0].sentences;

        function checkLength(x) {
            var length = 0;
            for (let i = 0; i < x; i++) {
                length = length + sents[i].text.length;
                console.log(length);
            }
            return length;
        }
        var lengthVar = 4;
        if (sents.length < 4) lengthVar = sents.length;
        while (checkLength(lengthVar) > 300) {
            lengthVar = lengthVar - 1;
            if (lengthVar < 1) {
                msg.channel.send("Her var det visst ikke noe innhold gitt");
                return;
            }
        }
        if (checkLength(lengthVar) < 200) lengthVar++;

        console.log(lengthVar);
        var info = "";
        for (let i = 0; i < lengthVar; i++) {
            info += sents[i].text;
            console.log(sents[i].text);
        }


        var embedMessage = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle("Wikipedia om: " + arg)
            .addField("Info", info)
            .addField("Link", "https://en.wikipedia.org/wiki/" + arg)
            .setFooter('AK-47', 'https://i.imgur.com/h2yoQh5.jpg');

        msg.channel.send(embedMessage);
    })
}

module.exports.ikkeWiki = function ikkeWiki(msg, page) {
    const MWBot = require('mwbot');
    let bot = new MWBot();
    bot.setApiUrl('https://ikkepedia.org/api.php');
    console.log("jo");

    bot.read('Kongen', {
        timeout: 80
    }).then((response) => {
        // Success
        // The MediaWiki API Result is somewhat unwieldy:
        console.log(response.query.pages['1']['revisions'][0]['*']);
    }).catch((err) => {
        console.log(err);
    });



}