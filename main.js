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
// Check order button event listener
document.getElementById("checkOrderButton").addEventListener("click", function() {
  // Hide the cafe scene and show the ordering scene
  document.getElementById("cafeScene").style.display = "none";
  document.getElementById("orderingScene").style.display = "block";
});


//Xin coded this section, randomized order function
document.addEventListener("DOMContentLoaded", function () {
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
    // Event listener for the food order button click
    orderButton.addEventListener("click", function () {
      // Hide the speak bubble image and food order button
      speakBubble.style.display = "none";
      orderButton.style.display = "none";
      // Hide the cafe scene and show the ordering scene
      document.getElementById("cafeScene").style.display = "none";
      document.getElementById("orderingScene").style.display = "block";
      // Randomize selections and display images for ordering
      randomizeSelections();
    });
  }
  window.onload = setCharacterImage;

  // Function to animate the customer
  function animateCustomer() {
    const character = document.getElementById("character");
    const speakBubble = document.getElementById("speakBubble");
    const orderButton = document.getElementById("foodOrderButton");

    // Array of customer images
    const customerImages = [
      "./CatCustomer/armaanWalk.png",
      "./CatCustomer/maggieWalk.png",
      "./CatCustomer/christyWalk.png",
      "./CatCustomer/xinWalk.png",
      "./CatCustomer/randomWalk1.png"
      // Add more image paths as needed
    ];

    // Function to get a random customer image
    function getRandomCustomerImage() {
      return customerImages[Math.floor(Math.random() * customerImages.length)];
    }

    // Set initial customer image
    character.style.backgroundImage = `url('${getRandomCustomerImage()}')`;

    // Animation parameters
    const frameWidth = 141;
    const totalFrames = 4;
    const animationSpeed = 100;
    let frameIndex = 0;

    // Get the width of the cafe scene container
    const cafeSceneWidth = document.getElementById("cafeScene").offsetWidth;

    // Set posX relative to the width of the cafe scene container
    let posX = cafeSceneWidth - 150; // Adjust the value as needed
    let targetX = posX - 650;
    let animationInterval;

    // Function to animate the character
    function animate() {
      frameIndex = (frameIndex + 1) % totalFrames;
      character.style.backgroundPosition = `-${frameIndex * frameWidth}px 0`;
    }

    // Function to move the character
    function moveCharacter() {
      if (posX <= targetX) {
        clearInterval(animationInterval);
        // Display the speak bubble image and food order button when animation ends
        speakBubble.style.display = "block";
        orderButton.style.display = "block";
        // Set the speak bubble position above the final position of the customer
        const characterRect = character.getBoundingClientRect();
        speakBubble.style.left = (characterRect.left - 275) + "px"; // Adjust the horizontal position as needed
        speakBubble.style.top = (characterRect.top - 200) + "px"; // Adjust the vertical position as needed
        // After displaying the speak bubble, call the function to randomize selections and display images
        randomizeSelections();
      } else {
        posX -= 5;
        character.style.left = posX + "px";
      }
    }

    // Start animation and movement
    animationInterval = setInterval(animate, animationSpeed);
    setInterval(moveCharacter, 50); // Adjust the interval for smoother movement
  }

  animateCustomer();
});

const character = document.getElementById("character");
const speakBubble = document.getElementById("speakBubble");
const orderButton = document.getElementById("foodOrderButton");

// Function to randomly select an item from an array
function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const iceCreamOptions = [
  "vanilla",
  "strawberry",
  "chocolate",
//add rest of ice cream
];

const milkOptions = [
  "whole",
  "oat",
  "almond",
];

const whippedCreamOptions = [
  "chocolate",
  "whisked",
];

const toppingOptions = [
  "biscoff",
  "pocky",
  "strawberry",
  "blueberry",
  "cherry",
  "sprinkles",
  "graham",
  "oreo",
  "marshmallow",
];

const syrupOptions = [
  "peanutbutter",
  "chocolate",
  "caramel",
  "strawberry",
];

// Function to randomly select options for ice cream, milk, whipped cream, topping, and syrup
function randomizeSelections() {
  const iceCream = getRandomItem(iceCreamOptions);
  const milk = getRandomItem(milkOptions);
  const whippedCream = getRandomItem(whippedCreamOptions);
  const topping = getRandomItem(toppingOptions);
  const syrup = getRandomItem(syrupOptions);

  // Display selected images in the speak button
  const speakButton = document.getElementById("speakBubble");
  speakButton.style.backgroundImage = `url('./kitchen/IceCream/${iceCream}Container.png'), url('./kitchen/Milk/${milk}milk.png'), url('./kitchen/WhippedCream/${whippedCream}Cream.png'), url('./kitchen/Topping/${topping}Container.png'), url('./kitchen/Syrup/${syrup}Syrup.png')`;
}

// Event listener for the food order button click
orderButton.addEventListener("click", function () {
  // Hide the speak bubble image and food order button
  speakBubble.style.display = "none";
  orderButton.style.display = "none";
  // Randomize selections and display images
  randomizeSelections();
});

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


// Kitchen Button Display
function displayImage(imageId) {
  var images = document.getElementsByClassName("secondImage");
  for (var i = 0; i < images.length; i++) {
    images[i].style.display = "none";
  }
  var image = document.getElementById(imageId);
  image.style.display = "block";
}

// Blender Button Functionality
let selectedIceCream = "";

function selectIceCream(flavor) {
  selectedIceCream = flavor;
}

function displayBlendedIceCream() {
  if (selectedIceCream) {
    document.querySelectorAll('.icecream-display').forEach(img => img.style.display = 'none');

    document.getElementById('blended_' + selectedIceCream).style.display = 'block';

  } else {
    alert('Please select and ice cream flavor first.');
  }
}

