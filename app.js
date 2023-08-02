// ===== QUERY SELECTORS =====

// ===== DATA MODEL =====
var players = [];
var easy = ["rock", "paper", "scissors"];
var currentGame;

// ===== EVENT LISTENERS =====
window.addEventListener("load", function () {});

// ===== FUNCTIONS =====

function createPlayer(name, token) {
  var player = {
    name: name,
    token: token,
    wins: 0,
  };
  return player;
}

function createGame(players, level) {
  // for (let i = 0; i < players.length; i++) {
  //   players[i].selection = selections[i];
  // }
  var selections = [];
  var currentGame = {
    players: players,
    selections: selections,
    level: level,
  };
  for (let i = 0; i < players.length; i++) {
    var input = prompt(`Please make your selection ${level}.`);
    console.log(`${players[i].name} has chosen ${input}`);
    selections.push(input);
  }
  console.log(currentGame);
  return currentGame;
}

function checkWin(game) {
  // GOAL - return position of the winner
  // what does the logic need to be?
  // case whens?
  // only one circumstance where each wins -- if statements fine
  // pull out the selections compare them
  var winner;
  console.log(game);
  if (
    game.selections.includes("rock") &&
    game.selections.includes("scissors")
  ) {
    winner = game.selections.indexOf("rock");
  } else if (
    game.selections.includes("paper") &&
    game.selections.includes("rock")
  ) {
    console.log(game.selections);
    winner = game.selections.indexOf("paper");
  } else if (
    game.selections.includes("scissors") &&
    game.selections.includes("paper")
  ) {
    winner = game.selections.indexOf("scissors");
  }
  console.log(winner);
  game.players[winner].wins += 1;
  console.log(game.players);
}

function checkDraw() {}

function reset() {}

var player1 = createPlayer("Humanoid", "🤖");
var player2 = createPlayer("Computer", "💻");
var game = createGame([player1, player2], easy);
var score = checkWin(game);
var game = createGame([player1, player2], easy);
var score = checkWin(game);
var game = createGame([player1, player2], easy);
var score = checkWin(game);
var game = createGame([player1, player2], easy);
var score = checkWin(game);
var game = createGame([player1, player2], easy);
var score = checkWin(game);
