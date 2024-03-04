const pause = document.getElementById("pause");
const car = document.getElementById("mainCar");
const obstacles = document.getElementsByClassName("obstacle");
const road = document.getElementById("road");
const roadRect = road.getBoundingClientRect();
const scoreElement = document.getElementById("score");
const highScoreElement=document.getElementById("highScore");

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
    "moveObstacleLeft" ||
    "moveObstacleRight"
  ) {
    event.target.classList.remove("show");
    event.target.classList.add("hide");
  }
});

pause.addEventListener("click", function () {
  car.classList.add("stop");
});

const highScore = localStorage.getItem("highScore");
if (highScore) {
  highScoreElement.textContent = "High Score: " + highScore;
}

//pause button, restart? , home menu -select car, background, start button, tutorials,lives,levels
requestAnimationFrame(checkCollision);
setInterval(createObstacle, 5000);

function checkCollision() {
  let collision = false;
  const carRect = car.getBoundingClientRect();
  for (let i = 0; i < obstacles.length; i++) {
    const obstacleRect = obstacles[i].getBoundingClientRect();
    if (
      carRect.top < obstacleRect.bottom &&
      carRect.right > obstacleRect.left &&
      carRect.left < obstacleRect.right &&
      carRect.bottom > obstacleRect.top
    ) {
      collision = true;
      updateHighScore();
      if (!road.classList.contains("stop")) {
        road.classList.add("stop");
      }

      for (let j = 0; j < obstacles.length; j++) {
        if (!obstacles[j].classList.contains("stop")) {
          obstacles[j].classList.add("stop");
        }
      }

      return true;
    }
  }

  if (!collision) {
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
  idIndex = Math.floor(Math.random() * 8);
  return obstacleId[idIndex];
}

function createObstacle() {
  const lane = getLane();
  const obstacleId = getObstacle();
  const obstacle = document.getElementById(obstacleId);
  const obstacleRect = obstacle.getBoundingClientRect();
  const isShown = obstacle.classList.contains("show");
  if (!isShown && !checkCollision()) {
    obstacle.classList.remove("hide");
    obstacle.classList.add("show");
    if (lane == 1) {
      obstacle.classList.add("obstacleAnimationLeft");
    } else if (lane == 2) {
      obstacle.classList.add("obstacleAnimationCenter");
    } else if (lane == 3) {
      obstacle.classList.add("obstacleAnimationRight");
    }
  }
}
