/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  console.log("jQuery is ready");

  /* Function that prevents XSS attacks */
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  /* Function that creates a tweet element */
  const createTweetElement = function (tweetData) {
    let article = $("<article>").addClass("tweet");
    const date = timeago.format(tweetData.created_at);

    const tweetBody = `
    <header>
       <span>
       <h2 class="userNameTweetBox"><img src=${
         tweetData.user.avatars
       }>&nbsp; &nbsp;${tweetData.user.name}</h2>
       </span>
       <span>
       <h2 class="userHandle">${tweetData.user.handle}</h2>
       </span>
       </header>
       <main>
       <p class="userTweet">${escape(tweetData.content.text)}</p>
        </main>
       <footer>
       <p class="datePosted">${date}</p>
       <span><i class="fa-solid fa-flag" id="footerIcon"></i>
       <i class="fa-solid fa-retweet" id="footerIcon"></i>
       <i class="fa-solid fa-heart" id="footerIcon"></i></span>
       </footer>
       `;
    article.append(tweetBody);
    return article;
  };

  /* Function that renders tweets */
  const renderTweets = function (tweets) {
    const tweetsContainer = $("#tweets-container");
    tweetsContainer.empty();
    for (const tweet of tweets) {
      tweetsContainer.prepend(createTweetElement(tweet));
    }
  };

  /* Function that handles the form submission */
  $(".create-tweet").on("submit", function (event) {
    $(".errorShort").slideUp();
    $(".errorLong").slideUp();
    event.preventDefault();
    const tweetText = $("#tweet-text").val();

    $(".button").on("submit", function () {
      $(".errorShort").slideUp();
      $(".errorLong").slideUp();
    });
    
    if (tweetText.length > 140) {
      $(".errorLong").slideDown();
    } else if (tweetText === "" || tweetText === null) {
      $(".errorShort").slideDown();
    } else {
      $.ajax({
        url: "/tweets/",
        type: "POST",
        data: $(".create-tweet").serialize(),
      }).done(() => {
        loadTweets();
        $(".errorShort").slideUp();
        $("textarea").val("");
        $(".counter").text(140);
      });
    }
  });

  /* Function that loads tweets */
  const loadTweets = function () {
    $.get("/tweets", renderTweets);
  };
  loadTweets();
});
