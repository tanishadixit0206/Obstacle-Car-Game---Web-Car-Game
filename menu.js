let backgroundSrc = "";
let carSrc = "";

document.addEventListener("DOMContentLoaded", function () {
  const backgrounds = 
    document.getElementsByClassName("backgroundImage")
  ;
  const backgroundsArray=Array.from(backgrounds);
  const chooseBackground = document.getElementById("chooseBackground");
  const chooseCar = document.getElementById("chooseCar");
  const cars = document.getElementsByClassName("carImage");
  const carsArray=Array.from(cars);
  chooseBackground.classList.add("hide");
  chooseCar.classList.add("hide");
  backgroundsArray.forEach((image) => {
    image.addEventListener("click", function () {
      if (chooseBackground.classList.contains("hide")) {
        chooseBackground.classList.remove("hide");
      }
      if (!chooseBackground.classList.contains("show")) {
        chooseBackground.classList.add("show");
      }

      chooseBackground.addEventListener("click", function () {
        chooseBackground.classList.remove("show");
        chooseBackground.classList.add("hide");
        backgroundSrc = image.src;
        localStorage.setItem("backgroundGameImage",backgroundSrc);
      });

      
    });
  });
  carsArray.forEach((image) => {
    image.addEventListener("click", function () {
      if (chooseCar.classList.contains("hide")) {
        chooseCar.classList.remove("hide");
      }
      if (!chooseCar.classList.contains("show")) {
        chooseCar.classList.add("show");
      }

      chooseCar.addEventListener("click", function () {
        chooseCar.classList.remove("show");
        chooseCar.classList.add("hide");
        carSrc = image.src;
        localStorage.setItem("playerCarImage",carSrc);
      });

      
    });
  });
  requestAnimationFrame(checkChoose);

  function checkChoose() {
    if (carSrc != "" && backgroundSrc != "") {
      window.location.href = "game2d.html";
      return;
    }
    requestAnimationFrame(checkChoose);
  }
});
