/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  console.log("jQuery is ready");

  const tweetData = {
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

  
  const createTweetElement = function(tweet) {
    let $tweet = $("<article>").addClass("tweet");
    const tweetBody = `
       <img src=${tweetData.user.avatars}>
       <h2>${tweetData.user.name}</h2>
       <h2>${tweetData.user.handle}</h2>
       <p>${tweetData.content.text}</p>
       <p>${tweetData.created_at}</p>
       <i class="fa-solid fa-flag" id="footerIcon"></i>
       <i class="fa-solid fa-retweet" id="footerIcon"></i>
       <i class="fa-solid fa-heart" id="footerIcon"></i>
       `;

    $tweet.append(tweetBody)
    return $tweet;
  };

  const renderTweets = function(tweets) {
    for (const tweet of Object.keys(tweets)) {
     let $tweet = createTweetElement(tweet);
      $(`#tweets-container`).append($tweet);
    }
  };
  renderTweets(tweetData);

});
    