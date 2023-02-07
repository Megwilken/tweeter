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
       <h2 class="userNameTweetBox"><img src=${tweetData.user.avatars}>&nbsp; &nbsp;${tweetData.user.name}</h2>
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
      for (const tweet of tweets) {
      $("#tweets-container").prepend(createTweetElement(tweet));
    }
  };

/* Function that handles the form submission */
  $(".create-tweet").on("submit", function (event) {
    event.preventDefault();
    const tweetText = $("#tweet-text").val();
    if (tweetText.length > 140) {
      $("#submit").click(function() {
        $(".errorLong").slideDown(function() {
          setTimeout(function() {
            $(".errorLong").slideUp();
          }, 2000);
        }); 
      });
    } else if (tweetText === "" || tweetText === null) {
       $("#submit").click(function() {
        $(".errorShort").slideDown(function() {
          setTimeout(function() {
            $(".errorShort").slideUp();
          }, 2000);
        }); 
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
  
/* Function that loads tweets */
  const loadTweets = function () {
    $.get("/tweets", renderTweets);
  };
  loadTweets();
});
