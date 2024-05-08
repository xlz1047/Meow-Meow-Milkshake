// Music Toggler
function toggleMusic() {
  var music = document.getElementById("backgroundMusic");
  var musicStatus = document.getElementById("musicStatus");
  if (music.paused) {
    music.play();
    musicToggle.src = "./Assets/musicOn.png";
  } else {
    music.pause();
    musicToggle.src = "./Assets/musicOff.png";
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
  var scenes = ["cafeScene", "kitchenScene", "orderingScene"];
  for (var i = 0; i < scenes.length; i++) {
    var scene = document.getElementById(scenes[i]);
    scene.style.display = scenes[i] === sceneId ? "block" : "none";
  }
}

// Chosen Player Character Display
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
        imagePath += "calicoSideCatSelection.png";
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

function animateCustomer() {
  var character = document.getElementById("character");
  var speakBubble = document.getElementById("speakBubble");
  var orderButton = document.getElementById("orderButton");

  const customerImages = [
    "armaan", 
    "maggie", 
    "christy", 
    "xin",
    //Add more as needed
  ];

  function getRandomCustomerImage() {
    return customerImages[Math.floor(Math.random() * customerImages.length)];
  }

  var randomImage = getRandomCustomerImage();
  character.style.backgroundImage = `url('./CatCustomer/${randomImage}Walk.png')`;
  const characterCounter = document.querySelector('.characterCounter');
  // Order scene
  characterCounter.style.backgroundImage = `url('./CatCustomer/${randomImage}Stand.png')`;
  characterCounter.style.backgroundSize = "400px 600px";

  const frameWidth = 141;
  const totalFrames = 4;
  const animationSpeed = 100;
  let frameIndex = 0;

  const cafeSceneWidth = document.getElementById("cafeScene").offsetWidth;

  let posX = cafeSceneWidth - 150;
  let targetX = posX - 650;

  function animate() {
    frameIndex = (frameIndex + 1) % totalFrames;
    character.style.backgroundPosition = `-${frameIndex * frameWidth}px 0`;
  }

  function moveCharacter() {
    if (posX <= targetX) {
      clearInterval(animationInterval);
      speakBubble.style.display = "block";
      orderButton.style.display = "block";
    } else {
      posX -= 5;
      character.style.left = posX + "px";
    }
  }

  const animationInterval = setInterval(animate, animationSpeed);
  setInterval(moveCharacter, 20);
}

animateCustomer();


////////////////////Order Functionality Section + kitchen Functionality////////////////////////

// Button Sound Effects
function playButtonClickSound() {
  var buttonClickSound = document.getElementById("buttonClick");
  buttonClickSound.play();
}
document.getElementById("toKitchenButton").addEventListener("click", playButtonClickSound);
document.getElementById("toCafeButton").addEventListener("click", playButtonClickSound);
document.getElementById("orderButton").addEventListener("click", playButtonClickSound);

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

const whippedCreamOptions = [
  "chocolate",
  "vanilla"
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

  var order = [iceCream, milk, whippedCream, topping, syrup];
  return order;
}
// Test the randomizeSelections function
var order = randomizeSelections();
console.log(order);

// Kitchen Button Display
function displayImage(imageId) {
  var images = document.getElementsByClassName("secondImage");
  for (var i = 0; i < images.length; i++) {
    images[i].style.display = "none";
  }
  var image = document.getElementById(imageId);
  image.style.display = "block";
  document.getElementById("cup").style.display = "none";
}
  
// Saving Chosen Variables
var selectedIceCream = null;
var selectedMilk = null;
var blendedIceCream = null;
var selectedWhippedCream = null;
var selectedSyrup = null;
var selectedTopping = null;
var selectedOrder = []

//Function append selected flavor to selectedOrder array
function addToSelectedOrder(flavor) {
  selectedOrder.push(flavor);
  console.log(selectedOrder);
}
// Player Kitchen Restrictions
function selectIceCream(flavor) {
  if (selectedIceCream === null) {
    selectedIceCream = flavor;
    addToSelectedOrder(flavor);
    return true;
  } else {
    alert('Only choose one ice cream.');
    return false;
  }
}
function selectMilk(flavor) {
  if (selectedMilk === null) {
    if (selectedIceCream) {
      selectedMilk = flavor
      addToSelectedOrder(flavor);
      return true;
    } else {
      alert('Please select the ice cream first.');
      return false;
    }
  } else {
    alert('Only choose one milk.')
    return false;
  }
}
function selectWhippedCream(flavor) {
  if (selectedWhippedCream === null) {
    if (selectedIceCream && selectedMilk && blendedIceCream) {
      selectedWhippedCream = flavor
      addToSelectedOrder(flavor);
      return true;
    } else {
      alert('Please select the ice cream, milk, and blender first.');
      return false;
    }
  } else {
    alert('Only choose one whipped cream.')
    return false;
  }
}
function selectSyrup(flavor) {
  if (selectedSyrup === null) {
    if (selectedIceCream && selectedMilk && blendedIceCream && selectedWhippedCream) {
      selectedSyrup = flavor
      addToSelectedOrder(flavor);
      return true;
    } else {
      alert('Please select the ice cream, milk, blender, and whipped cream first.');
      return false;
    }
  } else {
    alert('Only choose one syrup.')
    return false;
  }
}
function selectTopping(flavor) {
  if (selectedTopping === null) {
    if (selectedIceCream && selectedMilk && blendedIceCream && selectedWhippedCream && selectedSyrup) {
      selectedTopping = flavor
      var toppingClickSound = document.getElementById("toppings");
      toppingClickSound.play();
      addToSelectedOrder(flavor);
      return true;
    } else {
      alert('Please select the ice cream, milk, blender, whipped cream, and syrup first.');
      return false;
    }
  } else {
    alert('Only choose one topping.')
    return false;
  }
}

// Blender Button Functionality
function displayBlendedIceCream() {
  if (selectedIceCream && selectedMilk) {
    // Resetting display for all milks and ice creams.
    for (var i = 15; i <= 25; i++) {
      var image = document.getElementById("secondImage" + i);
      image.style.display = 'none';
    }
    // Display the full version of the selected ice cream
    blendedIceCream = document.getElementById(selectedIceCream + 'Blended');
    blendedIceCream.style.display = 'block';
  } else {
    alert('Please select the ice cream and milk first.');
  }
}

// Trash Can Functionality
function trashOrder() {
  selectedIceCream = null;
  selectedMilk = null;
  blendedIceCream = null;
  selectedWhippedCream = null;
  selectedSyrup = null;
  selectedTopping = null;
  selectedOrder = [];
  // Resetting display for all elements with ids starting with "secondImage"
  var secondImages = document.querySelectorAll("[id^='secondImage']");
  secondImages.forEach(function(image) {
    image.style.display = 'none';
  });
  // IDs of blended ice cream images to reset
  var blendedIceCreamImagesToReset = [
    "vanillaBlended", "strawberryBlended", "matchaBlended", "birthdayCakeBlended",
    "chocolateBlended", "coffeeBlended", "mangoBlended", "cookieDoughBlended"
  ];
  // Reset display for each blended ice cream image
  blendedIceCreamImagesToReset.forEach(function(imageId) {
    var image = document.getElementById(imageId);
    if (image) {
      image.style.display = 'none';
    }
  });
  document.getElementById("cup").style.display = "block";
}

console.log(selectedOrder);




// Check Order Button Functionality
function checkOrder() {
  if (selectedIceCream !== "" && selectedIceCream !==iceCream) {
    return false;
  }
  if (selectedMilk !== "" && selectedMilk !== milk) {
    return false;
  }
  if (selectedWhippedCream !== "" && selectedWhippedCream !== whippedCream) {
    return false;
  }
  if (selectedSyrup !== "" && selectedSyrup !== syrup) {
    return false;
  }
  if (selectedTopping !== "" && selectedTopping !== topping) {
    return false;
  }
  return true;
}

checkOrderButton.addEventListener("click", function () {
  speakBubble.style.display = "none";
  orderButton.style.display = "none";
  randomizeSelections();

  const orderMatches = checkOrder();
  displayResultImage(orderMatches);
});

//Function to Display Result Images
function displayResultImage(orderMatches) {
  const correctImage = document.getElementById("correctImage");
  const incorrectimage = document.getElementById("incorrectImage");

  if(orderMatches) {
    correctImage.style.display = "block"; 
    incorrectimage.style.display = "none"; 
  } else {
    correctImage.style.display = "none";
    incorrectimage.style.display = "block"; 
  }
}