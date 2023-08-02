// ===== QUERY SELECTORS =====
var userInputArea = document.querySelector("#userInput");
var gamePlayArea = document.querySelector("#gamePlay");

// ===== DATA MODEL =====
var gameIcons = [
  [
    {
      name: "rock",
      img: "happy-rock.png",
    },
    {
      name: "paper",
      img: "happy-paper.png",
    },
    {
      name: "scissors",
      img: "happy-scissors.png",
    },
  ],
];

var players = [];
var easy = ["rock", "paper", "scissors"];
var currentGame;

// ===== EVENT LISTENERS =====
window.addEventListener("load", function () {
  var player1 = createPlayer("Humanoid", "🤖");
  var player2 = createPlayer("Computer", "💻");

  // var score = checkWin(game);
  // var game = createGame([player1, player2], easy);
  // var score = checkWin(game);
  // var game = createGame([player1, player2], easy);
  // var score = checkWin(game);
});

userInputArea.addEventListener("click", function (event) {
  createGame(players, event);
  buildBoard(currentGame, event);
});

gamePlayArea.addEventListener("click", function (event) {
  takeTurn(currentGame, event);
});

// gamePlayArea.addEventListener()

// ===== FUNCTIONS =====

function createPlayer(name, token) {
  var player = {
    name: name,
    token: token,
    wins: 0,
  };
  players.push(player);
  return player;
}

function createGame(players, event) {
  // for (let i = 0; i < players.length; i++) {
  //   players[i].selection = selections[i];
  // }
  var level;
  var levelSelection = event.target.closest(".select-game").id;
  if (levelSelection === "easy") {
    level = easy;
  } else {
    // PUT HARD HERE LATER
  }
  var selections = [];
  currentGame = {
    players: players,
    selections: selections,
    level: level,
  };
  console.log(currentGame);
  return currentGame;
}

function takeTurn(status, event) {
  if (status === "human") {
    var fighterSelection = event.target.closest(".fighter").id;
    console.log(fighterSelection);
  } else {
    console.log("human response");
  }
  for (let i = 0; i < players.length; i++) {
    // var input = prompt(`Please make your selection ${level}.`);
    // console.log(`${players[i].name} has chosen ${input}`);
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
  var draw = checkDraw(game);
  if (draw) {
    console.log(`It's a draw!`);
  } else {
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
    console.log(`The winner is ${game.players[winner]}!`);
  }
}

function checkDraw(game) {
  var item1 = game.selections[0];
  for (let i = 0; i < game.selections.length; i++) {
    if (item1 !== game.selections[i]) {
      return false;
    }
  }
  return true;
}

function reset() {}

function buildBoard(game) {
  userInputArea.classList.toggle("hidden", true);
  console.log(userInputArea);
  gamePlayArea.innerHTML = "";
  for (let i = 0; i < game.level.length; i++) {
    gamePlayArea.innerHTML += `
  <div id="${game.level[i]}" class="fighter cursor">
    <img class="fighter-avatar" src="assets/happy-${game.level[i]}.png" alt="">
    <div class="hidden mini-emoji">Emoji here</div>
  </div>`;
  }
}
