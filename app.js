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
var playerTurn = 0;
var round = 0;
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
  createGame(players, round, event);
  buildBoard(currentGame, event);
});

gamePlayArea.addEventListener("click", function (event) {
  // takeTurn(event);
  // takeTurn();
  // checkWin(currentGame);
  handleSelections(event);
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

function createGame(players, round, event) {
  // for (let i = 0; i < players.length; i++) {
  //   players[i].selection = selections[i];
  // }
  if (round === 0) {
    var level;
    var levelSelection = event.target.closest(".select-game").id;
    if (levelSelection === "easy") {
      level = easy;
    } else if (levelSelection === "hard") {
      // PUT HARD HERE LATER
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
    console.log(fighterSelection);
    currentGame.selections.push(fighterSelection);
    // console.log(currentGame);
    var selectedBy = event.target.closest(".fighter");
    selectedBy.innerHTML += `<div class="mini-emoji">${currentGame.players[playerTurn].token}</div>`;
  } else {
    var randomFighter = randomSelection();
    console.log(randomFighter);
    currentGame.selections.push(randomFighter);
    var selectedBy = document.getElementById(`${randomFighter}`);
    console.log(selectedBy);
    selectedBy.innerHTML += `<div class="mini-emoji">${currentGame.players[playerTurn].token}</div>`;
  }
  playerTurn += 1;
  console.log(currentGame);
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
    console.log(`The winner is the ${game.players[winner].name}!`);
    console.log(players);
    round += 1;
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

function handleSelections(event) {
  var readyToCheck = new Promise((resolve, reject) => {
    let firstTurn = takeTurn(event);
    if (firstTurn) {
      resolve(
        setTimeout(() => {
          takeTurn();
        }, 3000)
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
      setTimeout(() => checkWin(currentGame), 4000);
    })
    .then(function () {
      setTimeout(() => reset(), 4500);
    })
    .catch((prepResults) => {
      prepResults;
    });
}

function reset() {
  playerTurn = 0;
  buildBoard(currentGame);
  createGame(currentGame, round);
}

function buildBoard(game) {
  userInputArea.classList.toggle("hidden", true);
  console.log(userInputArea);
  gamePlayArea.innerHTML = "";
  for (let i = 0; i < game.level.length; i++) {
    gamePlayArea.innerHTML += `
  <div id="${game.level[i]}" class="fighter cursor">
    <img class="fighter-avatar" src="assets/happy-${game.level[i]}.png" alt="">
  </div>`;
  }
}
