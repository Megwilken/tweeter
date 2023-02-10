$(document).ready(function () {
  
  /* Function that counts the number of characters in the tweet */
  $("#tweet-text").keyup(function () {
    const chars = $(this).val().length;
    const charsLeft = 140 - chars;
    if (charsLeft < 0) {
      $("#charCount").text(charsLeft).addClass("charsNeg");
    } else {    
      $("#charCount").text(charsLeft).removeClass("charsNeg");
      }
  });
});
