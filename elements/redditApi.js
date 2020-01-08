module.exports.post = async function scrapeSubreddit(sub, msg) {
    const Discord = require("discord.js");
    const snoowrap = require("snoowrap");
    const isImageUrl = require("is-image-url");

    const refreshToken = "79253737404-KS3pCbfvr46l6OXFkxa7p1cH2xM";
    /* const accessToken = "79253737404-ywOAbGQ58qrMKg6aMfiKrhzDffQ"; */

    const api = new snoowrap({
        userAgent: "Knullegutten_Discord-bot",
        clientId: "RvxCpw6bBoD6UQ",
        clientSecret: "ve0nHZydE52R3cQdPAMz45MdY2M",
        refreshToken: refreshToken
    });

    const subreddit = await api.getSubreddit(sub);

    const topPost = await subreddit.getTop({
        time: 'day',
        limit: 100
    }).catch(() => console.log("Finner ikke subreddit"));
    if (typeof (topPost) == "undefined" || topPost.length == 0) {
        msg.channel.send("Finner ikke subreddit");
        return false;
    }

    const num = Math.floor((Math.random() * topPost.length) + 1);
    let post = {
        title: topPost[num].title,
        author: topPost[num].author.name
    }


    if (topPost[num].url) {
        const url = topPost[num].url;
        if (isImageUrl(url)) {
            post.img = url;
        } else {
            post.link = url;
        }
    }

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

};



/* const post2 = scrapeSubreddit();
post2.then((a) => console.log(a));
 */
/* console.log(post2); */
/* const post = scrapeSubreddit(); */