module.exports.spam = function spam(msg, args) {
    if (!(args.length < 3)) {
        var ant = args[2];
        var spam = args[1];
    } else {
        msg.reply("skriv hva jeg skal spamme, og hvor mange ganger");
        return;
    }

    const content = msg.content;

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
};