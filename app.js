// ===== QUERY SELECTORS =====

// ===== DATA MODEL =====
var players = [];
var gameType;
var currentGame;

// ===== EVENT LISTENERS =====
window.addEventListener("load", function () {
  createPlayer("Humanoid", "🤖");
  createPlayer("Computer", "💻");
});

// ===== FUNCTIONS =====

function createPlayer(name, token) {
  var player = {
    name: name,
    token: token,
    wins: 0,
  };
  return player;
}
