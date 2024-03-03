function checkCollision() {
  const car = document.getElementById("mainCar");
  const obstacles = document.getElementsByClassName("obstacle");
  const carRect = car.getBoundingClientRect();
  let collision = false;
  const road = document.getElementsByClassName("road");
  const roadRect = road[0].getBoundingClientRect();

  for (let i = 0; i < obstacles.length; i++) {
    const obstacleRect = obstacles[i].getBoundingClientRect();
    if (
      carRect.top < obstacleRect.bottom &&
      carRect.right > obstacleRect.left &&
      carRect.left < obstacleRect.right
    ) {
      console.log("game over");
      collision = true;
      updateHighScore();
      const road = document.querySelector(".road");
      road.classList.add("stop");

      for (let j = 0; j < obstacles.length; j++) {
        obstacles[j].classList.add("stop");
      }

      break;
    }
  }

  if (!collision) {
    updateScore();
    requestAnimationFrame(checkCollision);
  }
}

function updateScore() {
  const scoreElement = document.getElementById("score");
  const currentScore = Number(scoreElement.textContent.split(" ")[1]);
  const newScore = currentScore + 1;
  scoreElement.textContent = "Score: " + newScore;
}

function moveLeft() {
  const car = document.getElementById("mainCar");
  const currentLeft = parseFloat(getComputedStyle(car).left);
  const distance = 0.06 * window.innerWidth;
  const newLeft = currentLeft - distance;
  const minLeft = 0.43 * window.innerWidth;
  console.log(minLeft);
  if (currentLeft > minLeft) {
    car.style.left = `${newLeft}px`;
  }
}

function moveRight() {
  const car = document.getElementById("mainCar");
  const currentLeft = parseFloat(getComputedStyle(car).left);
  const distance = 0.06 * window.innerWidth;
  const newLeft = currentLeft + distance;
  const maxLeft = 0.53 * window.innerWidth;
  console.log(maxLeft);
  if (currentLeft < maxLeft) {
    car.style.left = `${newLeft}px`;
  }
}

function updateHighScore() {
  const scoreElement = document.getElementById("score");
  const currentScore = Number(scoreElement.textContent.split(" ")[1]);
  const highScore = localStorage.getItem("highScore");
  if (currentScore > highScore) {
    localStorage.setItem("highScore", currentScore);
  }
}

function getLane(){
  return Math.floor(Math.random()*3)+1;
}

function getObstacle(){
  const obstacleId=['policecar1','puddle1','puddle2','rock1','rock2','traffic-barrier','trafficcone1','trafficcone3','tree1','tree2','tree3','tree4','person1','person2','person3','person4','person5','person6','person7','person8'];
  idIndex=Math.floor(Math.random()*8);
  return obstacleId[idIndex];
}

function createObstacle(){
  const lane=getLane();
  console.log(lane);
  const obstacleId=getObstacle();
  console.log(obstacleId);
  const obstacle=document.getElementById(obstacleId);
  console.log(obstacle);
  const display = window.getComputedStyle(obstacle).getPropertyValue('display');
  if(display==`none`){
    obstacle.style.display=`block`;
    console.log("creating obstacle");
    const currentLeft = parseFloat(getComputedStyle(obstacle).left);
    const distance = 0.06 * window.innerWidth;
    if(lane==1){
    const newLeft = currentLeft - distance;
    obstacle.style.left = `${newLeft}px`;
    }
    else if(lane==3){
    const newLeft = currentLeft + distance;
    obstacle.style.left = `${newLeft}px`;
  }
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

const highScore = localStorage.getItem("highScore");
if (highScore) {
  document.getElementById("highScore").textContent = "High Score: " + highScore;
}


//pause button, restart? , home menu -select car, background, start button, tutorials,lives,levels
requestAnimationFrame(checkCollision);
setInterval(createObstacle,5000);