/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  console.log("jQuery is ready");

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const createTweetElement = function (tweetData) {
    let article = $("<article>").addClass("tweet");
    const date = timeago.format(tweetData.created_at);

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
       <p class="userTweet">${escape(tweetData.content.text)}</p>
       <hr>
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

  const renderTweets = function (tweets) {
      for (const tweet of tweets) {
      $("#tweets-container").prepend(createTweetElement(tweet));
    }
  };

  $(".create-tweet").on("submit", function (event) {
    event.preventDefault();
    const tweetText = $("#tweet-text").val();
    if (tweetText.length > 140) {
      $("#submit").click(function() {
        $(".errorLong").slideDown(); 
      });
    } else if (tweetText === "" || tweetText === null) {
       $("#submit").click(function() {
        $(".errorShort").slideDown(); 
      });
    } else {
      $.ajax({
        url: "/tweets/",
        type: "POST",
        data: $(".create-tweet").serialize(),
      }).done(() => {
        loadTweets()
        $("textarea").val("");
      });
    }
  });

  const loadTweets = function () {
    $.get("/tweets", renderTweets);
  };
  loadTweets();
});
