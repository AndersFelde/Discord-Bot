const Discord = require("discord.js");

module.exports.dick = function (msg) {
    embedMessage = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle("DICK")
        .setImage('https://www.totstoteens.co.nz/wp-content/uploads/2018/08/drawings.jpg')
        .setFooter('AK-47', 'https://i.imgur.com/h2yoQh5.jpg');
    msg.channel.send(embedMessage);
}