$(document).ready(function () {
  console.log("hey")
  $('#tweet-text').keyup(function () {
  const chars = $(this).val().length;
  const charsLeft = 140 - chars;
  if (charsLeft < 0) {
    $('#charCount').text(charsLeft).addClass("charsNeg");
  } else {
    $('#charCount').text(charsLeft);
  }
});


$(".text").on("input", function() {
console.log("type!")
});

$(".button").on("submit", function() {
  console.log("submit!")
  });
});