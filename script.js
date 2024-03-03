function checkCollision() {
  const car = document.getElementById("mainCar");
  const obstacles = document.getElementsByClassName("obstacle");
  const carRect = car.getBoundingClientRect();
  let collision = false;
const road=document.getElementsByClassName("road")
const roadRect =road[0].getBoundingClientRect();
  // console.log("inside function");

  for (let i = 0; i < obstacles.length; i++) {
    const obstacleRect = obstacles[i].getBoundingClientRect();
    //   console.log("inside loop for i =", i);
    //   console.log(carRect.top, obstacleRect.bottom);
    // console.log(roadRect.left,roadRect.right,carRect.left ,carRect.right, obstacleRect.left,obstacleRect.right );
    if (
      carRect.top < obstacleRect.bottom &&
      carRect.right > obstacleRect.left &&
      carRect.left < obstacleRect.right 
    ) {
        // console.log("collision happened",roadRect.left,roadRect.right,carRect.left ,carRect.right, obstacleRect.left,obstacleRect.right );
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
    //   console.log("collision is not false");
  }
}

function updateScore() {
  const scoreElement = document.getElementById("score");
  // console.log(scoreElement);
  const currentScore = Number(scoreElement.textContent.split(" ")[1]);
  // console.log(currentScore);
  const newScore = currentScore + 1;
  scoreElement.textContent = "Score: " + newScore;
}

document.addEventListener("keydown", function (event) {
  const key = event.key.toLowerCase();
  if (key == "arrowleft" || key == "a") {
    moveLeft();
  } else if (key == "arrowright" || key == "d") {
    moveRight();
  }
});

function moveLeft() {
  const car = document.getElementById("mainCar");
  const currentLeft=parseFloat(getComputedStyle(car).left)
  const distance=0.06*window.innerWidth;
  const newLeft = currentLeft-distance;
  const minLeft=0.43*window.innerWidth;
    console.log(minLeft);
    if(currentLeft>minLeft)
  {
    car.style.left=`${newLeft}px`;
  }
}

function moveRight() {
    const car = document.getElementById("mainCar");
    const currentLeft=parseFloat(getComputedStyle(car).left)
    const distance=0.06*window.innerWidth;
    const newLeft = currentLeft+distance;
    const maxLeft=0.53*window.innerWidth;
  console.log(maxLeft);
  if(currentLeft<maxLeft){
        car.style.left=`${newLeft}px`;
    }
}

function updateHighScore(){
  const scoreElement = document.getElementById("score");
  const currentScore = Number(scoreElement.textContent.split(" ")[1]);
  const highScore=localStorage.getItem("highScore");
  if(currentScore>highScore){
    localStorage.setItem('highScore',currentScore);
  }
}
//   console.log("script running");
  const highScore=localStorage.getItem("highScore");
  if(highScore){
    document.getElementById("highScore").textContent = "High Score: " + highScore;
  }

//pause button, restart? , 
requestAnimationFrame(checkCollision);
