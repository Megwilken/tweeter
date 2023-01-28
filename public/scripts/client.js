/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
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
    <header>
       <span>
       <h2 class="userNameTweetBox"><img src=${tweetData.user.avatars}>${tweetData.user.name}</h2>
       </span>
       <span>
       <h2 class="userHandle">${tweetData.user.handle}</h2>
       </span>
       </header>
       <main>
       <p class="userTweet">${tweetData.content.text}</p>
       <hr>
       </main>
       <footer>
       <span>
       <p class="datePosted">${tweetData.created_at}</p>
       </span>
       <span><i class="fa-solid fa-flag" id="footerIcon"></i>
       <i class="fa-solid fa-retweet" id="footerIcon"></i>
       <i class="fa-solid fa-heart" id="footerIcon"></i></span>
       </footer>
       `;

    $tweet.append(tweetBody);
    return $tweet;
  };

  const renderTweets = function (tweets) {
    for (const tweet of Object.keys(tweets)) {
      let $tweet = createTweetElement(tweet);
      $(`#tweets-container`).append($tweet);
    }
  };
  renderTweets(tweetData);

$("#submit").submit(function(event) {
  event.preventDefault();
  alert("submitted");
  postTweet()
})

const postTweet = () => {
  $.ajax({
    url: "/tweets/", 
    type: "POST",
    data: $('.new-tweet').serialize(),
    success: (data) => {
      console.log(data);
      $("#submit").prop("disabled", false).text("Submit");
    renderTweets()
//     }
//   });
//     }
//   })
  

