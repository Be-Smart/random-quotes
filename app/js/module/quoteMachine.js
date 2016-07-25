"use strict"

var quoteEl = document.getElementsByClassName('quote')[0];
var quoteAuthor = document.getElementsByClassName('quote__author')[0];
var btn = document.getElementsByClassName('quote__btn')[0];
var body = document.getElementsByTagName('body')[0];
var tweetIcon = document.getElementsByClassName('quote__img')[0]

document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

function getQuote() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      randomContent(data);
    }
  }
  xhr.open("GET", "app/js/quotes.json", true);
  xhr.send();
}

function randomContent(arr) {
  var quoteLength = arr.quotes.length;
  var quoteNum = randomNum(quoteLength);
  var randomQuote = arr.quotes[quoteNum];
  var imgLength = arr.images.length;
  var imgNum = randomNum(imgLength);
  var randomImg = arr.images[imgNum];

  quoteEl.innerHTML = randomQuote.quote;
  quoteAuthor.innerHTML = randomQuote.author;
  body.style.background = "#999 url(" + randomImg.path + ") no-repeat center center fixed";
  body.style.backgroundSize = "cover";

  makeTweet(randomQuote.quote, randomQuote.author)
}

function makeTweet(text, author) {
  var text = encodeURIComponent(text);
  var author = encodeURIComponent(author);
  var link = "https://twitter.com/intent/tweet?hashtags=quotes&text=" + '"' +  text + '"' + ' ' + author
  tweetIcon.href =  link;
}

function randomNum(max) {
  return Math.floor(Math.random() * (max - 0)) + 0;
}
