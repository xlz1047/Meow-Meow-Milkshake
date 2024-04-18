// Music Toggler
function toggleMusic() {
  var music = document.getElementById("backgroundMusic");
  var musicStatus = document.getElementById("musicStatus");
  if (music.paused) {
    music.play();
    musicStatus.innerText = "On";
  } else {
    music.pause();
    musicStatus.innerText = "Off";
  }
}
document.addEventListener("click", function() {
  var audio = document.getElementById("backgroundMusic")
  audio.muted = false;
  audio.play();
  document.removeEventListener("click", arguments.callee);
});

// Screen Toggler
function toggleScreen(sceneId) {
  var scenes = ["cafeScene", "kitchenScene"];
  for (var i = 0; i < scenes.length; i++) {
    var scene = document.getElementById(scenes[i]);
    scene.style.display = scenes[i] === sceneId ? "block" : "none";
  }
}

// Button Sound Effects
function playButtonClickSound() {
  var buttonClickSound = document.getElementById("buttonClick");
  buttonClickSound.play();
}
document.getElementById("toKitchenButton").addEventListener("click", playButtonClickSound);
document.getElementById("toCafeButton").addEventListener("click", playButtonClickSound);

// Kitchen Sound Effects
function playToppingClickSound() {
  var toppingClickSound = document.getElementById("toppings");
  toppingClickSound.play();
}
document.getElementById("biscoffButton").addEventListener("click", playToppingClickSound);
document.getElementById("sprinklesButton").addEventListener("click", playToppingClickSound);
document.getElementById("pockyButton").addEventListener("click", playToppingClickSound);
document.getElementById("marshmellowButton").addEventListener("click", playToppingClickSound);
document.getElementById("grahamButton").addEventListener("click", playToppingClickSound);

// Chosen Player Character
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function setCharacterImage() {
  var characterParam = getParameterByName("character");
  if (characterParam) {
    var characterImage = document.getElementById("characterImage");
    var imagePath = "./CatSelection/";

    switch (characterParam) {
      case "Character1":
        imagePath += "calicoCatSelection.png";
        break;
      case "Character2":
        imagePath += "blackCatSelection.png";
        break;
      case "Character3":
        imagePath += "orangeCatSelection.png";
        break;
      case "Character4":
        imagePath += "siameseCatSelection.png";
        break;
      default:
        break;
    }
    characterImage.src = imagePath;
  }
}
window.onload = setCharacterImage;

document.addEventListener("DOMContentLoaded", function() {
  const character = document.getElementById("character");
  const images = [
    "./CatCustomer/armaanWalk.png",
    "./CatCustomer/maggieWalk.png",
    "./CatCustomer/christyWalk.png",
    "./CatCustomer/xinWalk.png",
    "./CatCustomer/randomWalk1.png"
    // Add more image paths as needed
  ];

  function getRandomImage() {
    return images[Math.floor(Math.random() * images.length)];
  }

  function setRandomCharacterImage() {
    const randomImage = getRandomImage();
    character.style.backgroundImage = `url('${randomImage}')`;
  }

  setRandomCharacterImage();

  const frameWidth = 141;
  const totalFrames = 4;
  const animationSpeed = 100;
  let frameIndex = 0;
  let posX = window.innerWidth - 400;
  let targetX = posX - 600;
  let animationInterval;

  function animate() {
    frameIndex = (frameIndex + 1) % totalFrames;
    character.style.backgroundPosition = `-${frameIndex * frameWidth}px 0`;
  }

  function moveCharacter() {
    if (posX <= targetX) {
      clearInterval(animationInterval);
    } else {
      posX -= 5;
      character.style.left = posX + "px";
    }
  }

  // Start animation and movement
  animationInterval = setInterval(animate, animationSpeed);
  setInterval(moveCharacter, 50); // Adjust the interval for smoother movement
});

// Kitchen Button Display
function displayImage(imageId) {
  var images = document.getElementsByClassName("secondImage");
  for (var i = 0; i < images.length; i++) {
    images[i].style.display = "none";
  }
  var image = document.getElementById(imageId);
  image.style.display = "block";
}

