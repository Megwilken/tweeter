/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


  const data = {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  };

  // const renderTweets = function(tweets) {
  //   for (let index of tweets) {
  //    $tweet = createTweetElement(tweets[index]);
  //    $(`#tweets-container`).append($tweet);
  //   }
  // };


  function createTweetElement(tweetData) {
  $tweet = (`
     <article class="tweet">
    <img src=${data.user.avatars}>
    <h2>
    ${data.user.name}
    </h2>
    <h2>
    ${data.user.handle}
    </h2>
    <p>
    ${data.content.text}
    </p>
    <p>
    ${data.created_at}
    </p>
    <i class="fa-solid fa-flag" id="footerIcon"></i>
    <i class="fa-solid fa-retweet" id="footerIcon"></i>
    <i class="fa-solid fa-heart" id="footerIcon"></i></span>
    </article>
    `);
    return $tweet;
  }

    



$(document).ready(() => {
  console.log("jQuery is ready");
  renderTweets(data);
});





