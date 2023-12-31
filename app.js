// ===== QUERY SELECTORS =====
var gameMessage = document.querySelector("#gameMessage");
var userInputArea = document.querySelector("#userInput");
var gamePlayArea = document.querySelector("#gamePlay");
var player1Score = document.querySelector("#score1");
var player2Score = document.querySelector("#score2");
var changeGameButton = document.querySelector("#changeGame");
var wholeGameArea = document.querySelector(".container");
var gameTitle = document.querySelector("#gameTitle");

// ===== DATA MODEL =====
var gameIcons = [
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
  {
    name: "barbie",
    img: "barbie.png",
  },
  {
    name: "indiana",
    img: "indiana.png",
  },
];

var players = [];
var playerTurn = 0;
var round = 0;
var currentGame;
var easy = ["rock", "paper", "scissors"];
var hard = ["rock", "paper", "scissors", "barbie", "indiana"];

// ===== EVENT LISTENERS =====
window.addEventListener("load", function () {
  var player1 = createPlayer("Humanoid", "🤖");
  var player2 = createPlayer("Computer", "💻");
});

userInputArea.addEventListener("click", function (event) {
  createGame(players, round, event);
  buildBoard(currentGame, event);
});

gamePlayArea.addEventListener("click", function (event) {
  handleSelections(event);
});

changeGameButton.addEventListener("click", function () {
  changeGames();
});

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

function createGame(players, round, event) {
  gameMessage.innerText = "Choose your fighter!";
  var level;
  if (round === 0) {
    var level = determineLevel(event);
  } else {
    currentGame.selections = [];
    return currentGame;
  }

  var selections = [];
  currentGame = {
    players: players,
    selections: selections,
    level: level,
  };

  return currentGame;
}

function determineLevel(event) {
  var levelSelection = event.target.closest(".select-game").id;
  if (levelSelection === "easy") {
    level = easy;
  } else if (levelSelection === "hard") {
    level = hard;
  }
  return level;
}

function takeTurn(event) {
  var playerUp = currentGame.players[playerTurn].name;
  if (playerUp === "Humanoid") {
    var fighterSelection = event.target.closest(".fighter").id;
    currentGame.selections.push(fighterSelection);
    var selectedBy = event.target.closest(".fighter");
    selectedBy.innerHTML += `<div class="mini-emoji" style="background:white; border-radius: 5px; margin-top: 5px">${currentGame.players[playerTurn].token}</div>`;
  } else {
    var randomFighter = randomSelection();
    currentGame.selections.push(randomFighter);
    var selectedBy = document.getElementById(`${randomFighter}`);
    selectedBy.innerHTML += `<div class="mini-emoji" style="background:white; border-radius: 5px; margin-top: 5px">${currentGame.players[playerTurn].token}</div>`;
  }
  playerTurn += 1;
  return playerTurn;
}

function randomSelection() {
  var randNum = Math.floor(Math.random() * currentGame.level.length);
  var randomSelection = currentGame.level[randNum];
  return randomSelection;
}

function executeWin(game) {
  var winner;
  var draw = checkDraw(game);
  if (draw === true) {
    gameMessage.innerText = `It's a draw!`;
  } else {
    winner = checkWin(game);
    game.players[winner].wins += 1;
    gameMessage.innerText = `The winner is the ${game.players[winner].name}!`;
  }
  round += 1;
}

function checkWin(game) {
  var winner;
  if (game.level === hard) {
    winner = hardLogic(game);
  } else if (game.level === easy) {
    winner = easyLogic(game);
  }
  return winner;
}

function checkDraw(game) {
  var item1 = game.selections[0];
  if (hardLogic(game) === false) {
    gameMessage.innerText = `It's a draw!`;
    return true;
  }
  for (let i = 0; i < game.selections.length; i++) {
    if (item1 !== game.selections[i]) {
      return false;
    }
  }
  return true;
}

function easyLogic(game) {
  if (
    game.selections.includes("rock") &&
    game.selections.includes("scissors")
  ) {
    winner = game.selections.indexOf("rock");
  } else if (
    game.selections.includes("paper") &&
    game.selections.includes("rock")
  ) {
    winner = game.selections.indexOf("paper");
  } else if (
    game.selections.includes("scissors") &&
    game.selections.includes("paper")
  ) {
    winner = game.selections.indexOf("scissors");
  }
  return winner;
}

function hardLogic(game) {
  var winner;
  if (
    game.selections.includes("rock") &&
    game.selections.includes("scissors")
  ) {
    winner = game.selections.indexOf("rock");
  } else if (
    game.selections.includes("paper") &&
    (game.selections.includes("rock") || game.selections.includes("indiana"))
  ) {
    winner = game.selections.indexOf("paper");
  } else if (
    game.selections.includes("scissors") &&
    (game.selections.includes("paper") || game.selections.includes("barbie"))
  ) {
    winner = game.selections.indexOf("scissors");
  } else if (
    game.selections.includes("rock") &&
    (game.selections.includes("indiana") || game.selections.includes("barbie"))
  ) {
    winner = false;
  } else if (
    game.selections.includes("indiana") &&
    game.selections.includes("scissors")
  ) {
    winner = game.selections.indexOf("indiana");
  } else if (
    game.selections.includes("barbie") &&
    game.selections.includes("paper")
  ) {
    winner = game.selections.indexOf("barbie");
  } else if (
    game.selections.includes("barbie") &&
    game.selections.includes("indiana")
  ) {
    winner = game.selections.indexOf("barbie");
  }
  return winner;
}

function handleSelections(event) {
  takeTurn(event);
  setTimeout(function () {
    takeTurn();
    executeWin(currentGame);
    updateScoreboards();
    setTimeout(() => {
      reset();
    }, 2000);
  }, 1000);
}

function buildBoard(game) {
  showElement(gamePlayArea);
  hideElement(userInputArea);
  showElement(changeGameButton);
  changeGameButton.classList.toggle("hidden", false);
  gamePlayArea.innerHTML = "";
  var gameIconIndex;
  for (let i = 0; i < game.level.length; i++) {
    for (let j = 0; j < gameIcons.length; j++) {
      if (game.level[i] === gameIcons[j].name) {
        gameIconIndex = j;
      }
    }
    gamePlayArea.innerHTML += `
    <div id="${game.level[i]}" class="fighter cursor">
    <img class="fighter-avatar" src="assets/${gameIcons[gameIconIndex].img}" alt="">
    </div>`;
  }
  if (game.level === hard) {
    wholeGameArea.classList.add("parent", "hard");
    gameTitle.innerText = "🔥🔥🔥 rps 🔥🔥🔥";
  }
}

function updateScoreboards() {
  player1Score.innerText = `Wins - ${players[0].wins}`;
  player2Score.innerText = `Wins - ${players[1].wins}`;
}

function changeGames() {
  round = 0;
  playerTurn = 0;
  wholeGameArea.classList.remove("parent", "hard");
  gameTitle.innerText = "rps";
  showElement(userInputArea);
  hideElement(gamePlayArea);
}

function reset() {
  playerTurn = 0;
  buildBoard(currentGame);
  createGame(currentGame, round);
}

function hideElement(selector) {
  selector.classList.toggle("hidden", true);
}

function showElement(selector) {
  selector.classList.toggle("hidden", false);
}
