var character = document.getElementById("character");
var speakBubble = document.getElementById("speakBubble");
var orderButton = document.getElementById("foodOrderButton");

// List for options
const iceCreamOptions = [
  "brithdayCake",
  "chocolate",
  "coffee",
  "cookieDough",
  "mango",
  "matcha",
  "strawberry",
  "vanilla"
];

const milkOptions = [
  "almond",
  "oat",
  "whole"
];

const syrupOptions = [
  "caramel",
  "chocolate",
  "peanutButter",
  "strawberry"
];

const toppingOptions = [
  "biscoff",
  "blueberry",
  "cherry",
  "chocolateChips",
  "grahamCrackers",
  "marshmallow",
  "oreo",
  "pocky",
  "sprinkles",
  "strawberry"
];

const whippedCreamOptions = [
  "chocolate",
  "vanilla"
];


// Function to randomly select an item from an array
function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

// Function to randomly select options for ice cream, milk, whipped cream, topping, and syrup
function randomizeSelections() {
  var iceCream = getRandomItem(iceCreamOptions);
  var milk = getRandomItem(milkOptions);
  var whippedCream = getRandomItem(whippedCreamOptions);
  var topping = getRandomItem(toppingOptions);
  var syrup = getRandomItem(syrupOptions);


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
