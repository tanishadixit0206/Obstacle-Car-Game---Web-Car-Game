document.addEventListener("DOMContentLoaded", function () {
  const pause = document.getElementById("pause");
  const restart = document.getElementById("restart");
  const continueGame = document.getElementById("continue");
  const car = document.getElementById("mainCar");
  const obstacles = document.getElementsByClassName("obstacle");
  const road = document.getElementById("road");
  const roadRect = road.getBoundingClientRect();
  const scoreElement = document.getElementById("score");
  const highScoreElement = document.getElementById("highScore");
  const body = document.body;
  let obstacleMovementSpeed = 5;
  let obstacleCreationSpeed = 5000;
  let gameOn = true;
  restart.classList.add("hide");
  continueGame.classList.add("hide");
  body.style.backgroundImage = `url("${localStorage.getItem('backgroundGameImage')}")`;
  car.querySelector('#mainCarImage').src=localStorage.getItem('playerCarImage');
  for (let j = 0; j < obstacles.length; j++) {
    if (!obstacles[j].classList.contains("hide")) {
      obstacles[j].classList.add("hide");
    }
  }

  document.addEventListener("keydown", function (event) {
    const key = event.key.toLowerCase();
    if (key == "arrowleft" || key == "a") {
      moveLeft();
    } else if (key == "arrowright" || key == "d") {
      moveRight();
    }
  });

  document.addEventListener("animationend", function (event) {
    if (
      event.animationName == "moveObstacleCenter" ||
      event.animationName == "moveObstacleLeft" ||
      event.animationName == "moveObstacleRight"
    ) {
      event.target.classList.remove("show");
      event.target.classList.add("hide");
      if (event.target.classList.contains("obstacleAnimationCenter")) {
        event.target.classList.remove("obstacleAnimationCenter");
      } else if (event.target.classList.contains("obstacleAnimationLeft")) {
        event.target.classList.remove("obstacleAnimationLeft");
      } else if (event.target.classList.contains("obstacleAnimationRight")) {
        event.target.classList.remove("obstacleAnimationRight");
      }
    }
  });

  pause.addEventListener("click", function () {
    gameOn = false;
    if (!road.classList.contains("stop")) {
      road.classList.add("stop");
    }
    if (!body.classList.contains("stop")) {
      body.classList.add("stop");
    }


    for (let j = 0; j < obstacles.length; j++) {
      if (!obstacles[j].classList.contains("stop")) {
        obstacles[j].classList.add("stop");
      }
    }
    if (restart.classList.contains("hide")) {
      restart.classList.remove("hide");
    }
    if (continueGame.classList.contains("hide")) {
      continueGame.classList.remove("hide");
    }
    restart.classList.add("show");
    continueGame.classList.add("show");
  });

  restart.addEventListener("click", function () {
    gameOn=true;
    obstacleMovementSpeed = 5;
    obstacleCreationSpeed = 5000;
    scoreElement.textContent = "Score: 0";

    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].classList.remove("show");
      obstacles[i].classList.add("hide");
    }

    road.classList.remove("stop");
    body.classList.remove("stop");
    for (let j = 0; j < obstacles.length; j++) {
      obstacles[j].classList.remove("stop");
    }

    requestAnimationFrame(checkCollision);
    requestAnimationFrame(checkScore);
    obstacleCreationSpeed = 5000;
    setInterval(createObstacle, obstacleCreationSpeed);
    setInterval(function () {
      obstacleMovementSpeed *= 1.01;
    }, 1000);
    continueGame.classList.remove("show");
    restart.classList.remove("show");
    restart.classList.add("hide");
    continueGame.classList.add("hide");
  });

  continueGame.addEventListener("click", function () {
    gameOn = true;
    if (road.classList.contains("stop")) {
      road.classList.remove("stop");
    }
    if (body.classList.contains("stop")) {
      body.classList.remove("stop");
    }

    for (let j = 0; j < obstacles.length; j++) {
      if (obstacles[j].classList.contains("stop")) {
        obstacles[j].classList.remove("stop");
      }
    }
    continueGame.classList.remove("show");
    restart.classList.remove("show");
    continueGame.classList.add("hide");
    restart.classList.add("hide");
    requestAnimationFrame(checkCollision);
  });

  const highScore = localStorage.getItem("highScore");
  if (highScore) {
    highScoreElement.textContent = "High Score: " + highScore;
  }

  // home menu -select car, background, start button, tutorials,lives,levels

  requestAnimationFrame(checkCollision);
  requestAnimationFrame(checkScore);
  setInterval(createObstacle, obstacleCreationSpeed);
  setInterval(function () {
    obstacleMovementSpeed *= 1.01;
  }, 1000);

  function checkScore() {
    const currentScore = Number(scoreElement.textContent.split(" ")[1]);
    const scoreThresholds = [5000, 10000, 20000, 50000, 100000];
    const speed = [4000, 3000, 2000, 1000, 500];
    for (let i = scoreThresholds.length - 1; i >= 0; i--) {
      if (currentScore > scoreThresholds[i]) {
        obstacleCreationSpeed = speed[i];
        break;
      }
    }
    requestAnimationFrame(checkScore);
  }

  function checkCollision() {
    const carRect = car.getBoundingClientRect();
    for (let i = 0; i < obstacles.length; i++) {
      const obstacleRect = obstacles[i].getBoundingClientRect();
      if (
        carRect.top < obstacleRect.bottom &&
        carRect.right > obstacleRect.left &&
        carRect.left < obstacleRect.right &&
        carRect.bottom > obstacleRect.top
      ) {
        gameOn = false;
        updateHighScore();
        if (!road.classList.contains("stop")) {
          road.classList.add("stop");
        }
        if (!body.classList.contains("stop")) {
          body.classList.add("stop");
        }

        for (let j = 0; j < obstacles.length; j++) {
          if (!obstacles[j].classList.contains("stop")) {
            obstacles[j].classList.add("stop");
          }
        }
        pause.classList.remove("show");
        pause.classList.add("hide");
        restart.classList.remove("hide");
        restart.classList.add("show");
        return;
      }
    }

    if (gameOn == true) {
      updateScore();
      requestAnimationFrame(checkCollision);
    }
  }

  function updateScore() {
    const currentScore = Number(scoreElement.textContent.split(" ")[1]);
    const newScore = currentScore + 1;
    scoreElement.textContent = "Score: " + newScore;
  }

  function moveLeft() {
    const currentLeft = parseFloat(getComputedStyle(car).left);
    const distance = 0.06 * window.innerWidth;
    const newLeft = currentLeft - distance;
    const minLeft = 0.43 * window.innerWidth;
    if (currentLeft > minLeft) {
      car.style.left = `${newLeft}px`;
    }
  }

  function moveRight() {
    const currentLeft = parseFloat(getComputedStyle(car).left);
    const distance = 0.06 * window.innerWidth;
    const newLeft = currentLeft + distance;
    const maxLeft = 0.53 * window.innerWidth;
    if (currentLeft < maxLeft) {
      car.style.left = `${newLeft}px`;
    }
  }

  function updateHighScore() {
    const currentScore = Number(scoreElement.textContent.split(" ")[1]);
    const highScore = localStorage.getItem("highScore");
    if (currentScore > highScore) {
      localStorage.setItem("highScore", currentScore);
    }
  }

  function getLane() {
    return Math.floor(Math.random() * 3) + 1;
  }

  function getObstacle() {
    const obstacleId = [
      "policecar1",
      "puddle1",
      "puddle2",
      "rock1",
      "rock2",
      "traffic-barrier",
      "trafficcone1",
      "trafficcone3",
      "tree1",
      "tree2",
      "tree3",
      "tree4",
      "person1",
      "person2",
      "person3",
      "person4",
      "person5",
      "person6",
      "person7",
      "person8",
    ];
    const idIndex = Math.floor(Math.random() * 8);
    return obstacleId[idIndex];
  }

  function createObstacle() {
    const lane = getLane();
    const obstacleId = getObstacle();
    const obstacle = document.getElementById(obstacleId);
    const obstacleRect = obstacle.getBoundingClientRect();
    const isShown = obstacle.classList.contains("show");

    if (!isShown && gameOn) {
      obstacle.classList.remove("hide");
      obstacle.classList.add("show");
      obstacle.style.animationDuration = `${obstacleMovementSpeed}s`;
      if (lane == 1) {
        obstacle.classList.add("obstacleAnimationLeft");
      } else if (lane == 2) {
        obstacle.classList.add("obstacleAnimationCenter");
      } else if (lane == 3) {
        obstacle.classList.add("obstacleAnimationRight");
      }
    }
  }
});
