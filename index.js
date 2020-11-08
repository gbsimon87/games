document.addEventListener("DOMContentLoaded", function () {
  var isPlaying = false;
  var numbersInterval;
  var fruitsInterval;
  var shapesInterval;
  var coloursInterval;
  var playPauseButton = document.querySelector(
    ".game-area-controls-play-pause"
  );
  var gamesDropdown = document.querySelector(".game-area-select-game .games");
  var currentGameSelected = gamesDropdown.value;
  var gameAreaDisplayTitle = document.querySelector(".game-area-title");
  var gameAreaContent = document.querySelector(".game-area-content");
  var form = document.querySelector(".game-area-controls-form");
  var speedInput = document.querySelector(".speed-range-input");
  var speedInputLabel = document.querySelector(".speed-range-label");
  var fruits = ["apple", "banana", "kiwi", "orange", "pear", "tomato"];
  var shapes = ["circle", "rectangle", "triangle", "square", "star"];
  var colours = [
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "purple",
    "brown",
    "lightblue",
    "cyan",
    "pink",
  ];

  function insertImage(fruitChosen) {
    gameAreaContent.innerHTML = `<img src="images/${currentGameSelected}/${fruitChosen}.png" alt="${fruitChosen}" />`;
  }

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function calculateSpeedInMs() {
    if (!speedInput) return 1000;
    return document.querySelector(".speed-range-input").value * 1000;
  }

  function clearAllIntervals() {
    clearInterval(numbersInterval);
    clearInterval(coloursInterval);
    clearInterval(fruitsInterval);
    clearInterval(shapesInterval);
  }

  function handleIsPlaying() {
    isPlaying = false;
    gamesDropdown.disabled = false;
    speedInput.disabled = false;
    speedInputLabel.classList.remove("text-muted");
    gameAreaContent.style.backgroundColor = "white";
    gameAreaContent.textContent = "";
    playPauseButton.classList.add("btn-success");
    playPauseButton.classList.remove("btn-danger");
    playPauseButton.textContent = "PLAY";
  }

  function handleNotPlaying() {
    isPlaying = true;
    gamesDropdown.disabled = true;
    speedInput.disabled = true;
    speedInputLabel.classList.add("text-muted");
    playPauseButton.classList.remove("btn-success");
    playPauseButton.classList.add("btn-danger");
    playPauseButton.textContent = "STOP";
  }

  function controlGameplay() {
    switch (currentGameSelected) {
      case "numbers":
        if (isPlaying) {
          handleIsPlaying();
          clearInterval(numbersInterval);
        } else {
          handleNotPlaying();
          numbersInterval = setInterval(function () {
            var randomNumber = randomIntFromInterval(0, 10);
            gameAreaContent.textContent = randomNumber;
          }, calculateSpeedInMs());
        }
        break;
      case "colours":
        if (isPlaying) {
          handleIsPlaying();
          clearInterval(coloursInterval);
        } else {
          handleNotPlaying();
          coloursInterval = setInterval(function () {
            var randomNumber = randomIntFromInterval(0, 9);
            var randomColour = colours[randomNumber];
            gameAreaContent.textContent = "";
            gameAreaContent.style.backgroundColor = randomColour;
          }, calculateSpeedInMs());
        }
        break;
      case "fruits":
        if (isPlaying) {
          handleIsPlaying();
          clearInterval(fruitsInterval);
        } else {
          handleNotPlaying();
          fruitsInterval = setInterval(function () {
            var randomNumber = randomIntFromInterval(0, fruits.length - 1);
            var fruit = fruits[randomNumber];
            insertImage(fruit);
          }, calculateSpeedInMs());
        }
        break;
      case "shapes":
        console.log("currentGameSelected: shapes");
        if (isPlaying) {
          handleIsPlaying();
          clearInterval(shapesInterval);
        } else {
          handleNotPlaying();
          shapesInterval = setInterval(function () {
            var randomNumber = randomIntFromInterval(0, shapes.length - 1);
            var shape = shapes[randomNumber];
            console.log("shape:", shape);
            insertImage(shape);
          }, calculateSpeedInMs());
        }
        break;
      default:
        break;
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  gamesDropdown.addEventListener("input", function (e) {
    console.log("currentGameSelected:", currentGameSelected);
    console.log("new value:", e.target.value);
    var gameSelected = e.target.value;

    if (currentGameSelected === "numbers") {
      clearInterval(numbersInterval);
    } else if (currentGameSelected === "fruits") {
      clearInterval(fruitsInterval);
    } else if (currentGameSelected === "shapes") {
      clearInterval(shapesInterval);
    } else if (currentGameSelected === "colours") {
      clearInterval(coloursInterval);
    }

    currentGameSelected = gameSelected;
    gameAreaDisplayTitle.textContent = `Learn your ${gameSelected}!`;
    playPauseButton.textContent = "PLAY";
    isPlaying = false;
  });

  playPauseButton.addEventListener("click", function () {
    controlGameplay();
  });

  document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      console.log("Space pressed");
      controlGameplay();
    }
  });

  speedInput.addEventListener("change", function (event) {
    console.log(event.target.value);
    clearAllIntervals();

    if (isPlaying) {
      controlGameplay();
    }
  });
});
