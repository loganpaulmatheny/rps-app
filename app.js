// ===== QUERY SELECTORS =====
var gameMessage = document.querySelector("#gameMessage");
var userInputArea = document.querySelector("#userInput");
var gamePlayArea = document.querySelector("#gamePlay");
var player1Score = document.querySelector("#score1");
var player2Score = document.querySelector("#score2");
var changeGameButton = document.querySelector("#changeGame");

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
var easy = ["rock", "paper", "scissors"];
var hard = ["rock", "paper", "scissors", "barbie", "indiana"];
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
  createGame(players, round, event);
  buildBoard(currentGame, event);
});

gamePlayArea.addEventListener("click", function (event) {
  // takeTurn(event);
  // takeTurn();
  // checkWin(currentGame);
  handleSelections(event);
});

changeGameButton.addEventListener("click", changeGames);

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

function createGame(players, round, event) {
  // for (let i = 0; i < players.length; i++) {
  //   players[i].selection = selections[i];
  // }
  gameMessage.innerText = "Choose your fighter!";
  var level;
  if (round === 0) {
    var levelSelection = event.target.closest(".select-game").id;
    if (levelSelection === "easy") {
      level = easy;
    } else if (levelSelection === "hard") {
      level = hard;
    }
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

function takeTurn(event) {
  // console.log(playerTurn);
  var playerUp = currentGame.players[playerTurn].name;
  // console.log(playerUp);
  if (playerUp === "Humanoid") {
    var fighterSelection = event.target.closest(".fighter").id;
    // console.log(fighterSelection);
    currentGame.selections.push(fighterSelection);
    // console.log(currentGame);
    var selectedBy = event.target.closest(".fighter");
    selectedBy.innerHTML += `<div class="mini-emoji">${currentGame.players[playerTurn].token}</div>`;
  } else {
    var randomFighter = randomSelection();
    // console.log(randomFighter);
    currentGame.selections.push(randomFighter);
    var selectedBy = document.getElementById(`${randomFighter}`);
    // console.log(selectedBy);
    selectedBy.innerHTML += `<div class="mini-emoji">${currentGame.players[playerTurn].token}</div>`;
  }
  playerTurn += 1;
  // console.log(currentGame);
  return playerTurn;
  // DISPLAY WHO SELECTED ITEM HERE
  // PAUSE for 3 seconds
}

function randomSelection() {
  var randNum = Math.floor(Math.random() * currentGame.level.length);
  var randomSelection = currentGame.level[randNum];
  return randomSelection;
}

function checkWin(game) {
  // GOAL - return position of the winner
  // what does the logic need to be?
  // case whens?
  // only one circumstance where each wins -- if statements fine
  // pull out the selections compare them

  // ======= WHAT LEVEL DO WE NEED TO CHECK ======
  var winner;
  // console.log(game);
  var draw = checkDraw(game);
  if (draw) {
    gameMessage.innerText = `It's a draw!`;
  } else {
    // if (
    //   game.selections.includes("rock") &&
    //   game.selections.includes("scissors")
    // ) {
    //   winner = game.selections.indexOf("rock");
    // } else if (
    //   game.selections.includes("paper") &&
    //   game.selections.includes("rock")
    // ) {
    //   winner = game.selections.indexOf("paper");
    // } else if (
    //   game.selections.includes("scissors") &&
    //   game.selections.includes("paper")
    // ) {
    //   winner = game.selections.indexOf("scissors");
    // }
    // console.log(winner);
    if (game.level === easy) {
      var winner = easyLogic(game);
    } else if (game.level === hard) {
      // PUT HARD LOGIC FUNCTION HERE
    }
    game.players[winner].wins += 1;
    gameMessage.innerText = `The winner is the ${game.players[winner].name}!`;
  }
  round += 1;
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

function checkDraw(game) {
  var item1 = game.selections[0];
  for (let i = 0; i < game.selections.length; i++) {
    if (item1 !== game.selections[i]) {
      return false;
    }
  }
  return true;
}

function handleSelections(event) {
  var readyToCheck = new Promise((resolve, reject) => {
    let firstTurn = takeTurn(event);
    if (firstTurn) {
      resolve(
        setTimeout(() => {
          takeTurn();
        }, 2000)
      );
    } else {
      reject("Error");
    }
  });
  readyToCheck
    .then((prepResults) => {
      prepResults;
    })
    .then(function () {
      setTimeout(() => checkWin(currentGame), 3000);
    })
    .then(function () {
      setTimeout(() => updateScoreboards(), 3000);
    })
    .then(function () {
      setTimeout(() => reset(), 5000);
    })
    .catch((prepResults) => {
      prepResults;
    });
}

function buildBoard(game) {
  showElement(gamePlayArea);
  hideElement(userInputArea);
  showElement(changeGameButton);
  changeGameButton.classList.toggle("hidden", false);
  // console.log(userInputArea);
  gamePlayArea.innerHTML = "";
  var gameIconIndex;
  for (let i = 0; i < game.level.length; i++) {
    for (let j = 0; j < gameIcons.length; j++) {
      if (game.level[i] === gameIcons[j].name) {
        gameIconIndex = j;
      }
    }
    // gamePlayArea.innerHTML += `
    // <div id="${game.level[i]}" class="fighter cursor">
    // <img class="fighter-avatar" src="assets/happy-${game.level[i]}.png" alt="">
    // </div>`;
    gamePlayArea.innerHTML += `
    <div id="${game.level[i]}" class="fighter cursor">
    <img class="fighter-avatar" src="assets/${gameIcons[gameIconIndex].img}" alt="">
    </div>`;
  }
}

function updateScoreboards() {
  player1Score.innerText = `Wins - ${players[0].wins}`;
  player2Score.innerText = `Wins - ${players[1].wins}`;
}

function changeGames() {
  console.log("clicked");
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
