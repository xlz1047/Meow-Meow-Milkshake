// Coded by Xin 
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

// Coded by Maggie
function displayBlendedIceCream() {
  if (selectedIceCream) {
    document.querySelectorAll('.icecream-display').forEach(img => img.style.display = 'none');

    document.getElementById('blended_' + selectedIceCream).style.display = 'block';

  } else {
    alert('Please select and ice cream flavor first.');
  }
}
