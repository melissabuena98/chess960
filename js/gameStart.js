// document.addEventListener("DOMContentLoaded", function() {
//   Chess.newGame();
// });

var regularBtn = document.getElementById('regularBtn');
var randomBtn = document.getElementById('960Btn');

regularBtn.addEventListener("click", function() {
  regularBtn.disabled = true;
  randomBtn.disabled = true;
  Chess.newGame(0);
});

randomBtn.addEventListener("click", function() {
  regularBtn.disabled = true;
  randomBtn.disabled = true;
  Chess.newGame(1);
});