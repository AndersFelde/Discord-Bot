
async function scrapeSubreddit() {
const snoowrap = require("snoowrap");
    
const refreshToken = "79253737404-KS3pCbfvr46l6OXFkxa7p1cH2xM";
/* const accessToken = "79253737404-ywOAbGQ58qrMKg6aMfiKrhzDffQ"; */

const api = new snoowrap({
    userAgent: "Knullegutten_Discord-bot",
    clientId: "RvxCpw6bBoD6UQ",
    clientSecret: "ve0nHZydE52R3cQdPAMz45MdY2M",
    refreshToken: refreshToken
});


console.log("Fant en post");    

const subreddit = await api.getSubreddit('dankmemes');
const topPost = await subreddit.getTop({time: 'day', limit: 1});

let post = {
    link: topPost[0].url,
    title: topPost[0].title,
    author: topPost[0].author.name
}

/* console.log(post); */
return post;
}



/* const post2 = scrapeSubreddit();
post2.then((a) => console.log(a));
 *//* console.log(post2); */
const post = scrapeSubreddit();
exports.post = post;

