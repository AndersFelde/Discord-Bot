
module.exports.post = async function scrapeSubreddit(sub) {
const snoowrap = require("snoowrap");
    
const refreshToken = "79253737404-KS3pCbfvr46l6OXFkxa7p1cH2xM";
/* const accessToken = "79253737404-ywOAbGQ58qrMKg6aMfiKrhzDffQ"; */

const api = new snoowrap({
    userAgent: "Knullegutten_Discord-bot",
    clientId: "RvxCpw6bBoD6UQ",
    clientSecret: "ve0nHZydE52R3cQdPAMz45MdY2M",
    refreshToken: refreshToken
});



const subreddit = await api.getSubreddit(sub);

const topPost = await subreddit.getTop({time: 'day', limit: 100}).catch(() => console.log("Finner ikke subreddit"));
if(typeof(topPost) == "undefined" || topPost.length == 0){
    return false;
}

const num = Math.floor((Math.random() * topPost.length) + 1);
console.log(num);

let post = {
    link: topPost[num].url,
    title: topPost[num].title,
    author: topPost[num].author.name
}

console.log(post);
/* console.log(post); */
return post;
};



/* const post2 = scrapeSubreddit();
post2.then((a) => console.log(a));
 *//* console.log(post2); */
/* const post = scrapeSubreddit(); */

