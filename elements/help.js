const Discord = require("discord.js");
module.exports.help = function help() {
    embedMessage = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('Help')
        .setDescription('Help for commands')
        .setThumbnail('https://i.imgur.com/h2yoQh5.jpg')
        .addField('!play', '[link](Uten parameter spiller den queue) Da spiller den av sangen i VC du er i')
        .addField('!queue', '[add:remove](Hvis du ikke legger til parameter lister den queue)')
        .addField('!stop', 'Stopper musikken')
        .addField('!skip', 'Skipper til neste sang i queuen')
        .addField('!dick', ';)')
        .addField('!spam', '"[Det du vil spamme], [Hvor mange ganger](ikke mer enn 50)"')
        .addField('Tagging', 'Hvis du tagger sander eller meg på spam så fucker det den som sender')
        .setTimestamp()
        .setFooter('AK-47', 'https://i.imgur.com/h2yoQh5.jpg');

    return embedMessage;
}