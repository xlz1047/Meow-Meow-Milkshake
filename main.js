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

// Automatically play music on first click anywhere on the page
document.addEventListener("click", function() {
  var audio = document.getElementById("backgroundMusic")
  audio.muted = false;
  audio.play();
  // Remove the click event listener after the first click
  document.removeEventListener("click", arguments.callee);
});

// Screen Toggler
function toggleScreen(sceneId) {
  var scenes = ["cafeScene", "kitchenScene", "orderingScene"];
  // Loop through scene elements and display the selected scene
  for (var i = 0; i < scenes.length; i++) {
    var scene = document.getElementById(scenes[i]);
    if (scenes[i] === sceneId) {
      scene.style.display = "block";
    } else {
      scene.style.display = "none";
    }
  }
}

// Chosen Player Character Display
function getParameterByName(name, url) {
  // Retrieve query parameters from the URL
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function setCharacterImage() {
  // Set the player character image based on the query parameter
  var characterParam = getParameterByName("character");
  if (characterParam) {
    var characterImage = document.getElementById("characterImage");
    var imagePath = "./CatSelection/";

    switch (characterParam) {
      case "Character1":
        imagePath += "calicoSideCatSelection.png";
        break;
      case "Character2":
        imagePath += "blackSideProfile.png";
        break;
      case "Character3":
        imagePath += "orangeSideProfile.png";
        break;
      case "Character4":
        imagePath += "siameseSideProfile.png";
        break;
      default:
        break;
    }
    characterImage.src = imagePath;
  }
}
window.onload = setCharacterImage;

function getRandomCustomerImage() {
  const customerImages = [
    "armaan", 
    "maggie", 
    "christy", 
    "xin",
    //Add more as needed
  ];
  return customerImages[Math.floor(Math.random() * customerImages.length)];
}

// Function to animate the customer character
function animateCustomer() {
  var character = document.getElementById("character");
  var speakBubble = document.getElementById("speakBubble");
  var orderButton = document.getElementById("orderButton");

  // Array containing names of customer images
  const customerImages = [
    "armaan", 
    "maggie", 
    "christy", 
    "xin",
    //Add more as needed
  ];

  // Set initial customer image
  var randomImage = getRandomCustomerImage();
  character.style.backgroundImage = `url('./CatCustomer/${randomImage}Walk.png')`;

  // Set counter background image for order scene
  const characterCounter = document.querySelector('.characterCounter');
  characterCounter.style.backgroundImage = `url('./CatCustomer/${randomImage}Stand.png')`;
  characterCounter.style.backgroundSize = "400px 600px";

  // Animation variables
  const frameWidth = 141;
  const totalFrames = 4;
  const animationSpeed = 100;
  let frameIndex = 0;

  // Initial position and target position for character movement
  const cafeSceneWidth = document.getElementById("cafeScene").offsetWidth;
  let posX = cafeSceneWidth - 150;
  let targetX = posX - 650;

  // Function to animate character frames
  function animate() {
    frameIndex = (frameIndex + 1) % totalFrames;
    character.style.backgroundPosition = `-${frameIndex * frameWidth}px 0`;
  }

  // Function to move the character towards the target position
  function moveCharacter() {
    if (posX <= targetX) {
      clearInterval(animationInterval);
      // Display speak bubble and order button when character reaches target position
      speakBubble.style.display = "block";
      orderButton.style.display = "block";
    } else {
      posX -= 5;
      character.style.left = posX + "px";
    }
  }

  // Start character animation and movement intervals
  const animationInterval = setInterval(animate, animationSpeed);
  setInterval(moveCharacter, 20);
}

// Automatically animate the customer character when the page loads
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
  "birthdayCake",
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

var randomOrder = [];

// Function to randomly select an item from an array
function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

// Function to randomly select options for ice cream, milk, whipped cream, topping, and syrup
function randomizeSelections() {
  // If a random order exists, return it
  if (randomOrder.length !== 0) {
    console.log("random:", randomOrder);
    return randomOrder;
  }
  // Otherwise, generate a random order
  var iceCream = getRandomItem(iceCreamOptions);
  var milk = getRandomItem(milkOptions);
  var whippedCream = getRandomItem(whippedCreamOptions);
  var syrup = getRandomItem(syrupOptions);
  var topping = getRandomItem(toppingOptions);

  randomOrder = [
    iceCream,
    milk,
    whippedCream,
    syrup,
    topping
  ];

  console.log("random:", randomOrder);
  return randomOrder;
}
// Function to generate URLs for the order to be displayed
function generateDisplayUrls(order) {
  var displayUrls = [
    `./Kitchen/IceCream/${order[0]}.png`,
    `./Kitchen/Milk/${order[1]}.png`,
    `./Kitchen/WhippedCream/${order[2]}.png`,
    `./Kitchen/Syrup/${order[3]}.png`,
    `./Kitchen/Topping/${order[4]}.png`
  ];
  return displayUrls;
}
function displayImagesOneByOne(urls, displaySpeed) {
  var index = 0;

  function displayNextImage() {
    if (index < urls.length) {
      var currentImageUrl = urls[index];
      console.log(currentImageUrl);

      var imgElement = document.createElement("img");
      imgElement.src = currentImageUrl;
      imgElement.style.width = '120px';
      imgElement.style.height = '120px';
      imgElement.style.position = 'absolute';
      imgElement.style.top = '25%';
      imgElement.style.right = '22%';
      imgElement.style.zIndex = '7';
      document.body.appendChild(imgElement);

    setTimeout(function() {
      imgElement.style.display = 'none'; // Hide the current image after a delay
      index++;
      displayNextImage(); // Call recursively to display the next image
    }, displaySpeed);
  } else {
    console.log("All images displayed.");

    // Transition to the kitchen scene after a delay
    setTimeout(function() {
      console.log("Transitioning to the kitchen scene...");
      toggleScreen("cafeScene");

      // Hide the orderingScene when transitioning to the kitchenScene
      document.getElementById("orderingScene").style.display = "none";
    }, 1000); // 2 seconds delay before transitioning to the kitchen scene
  }
}

  displayNextImage();
}
// Update the orderButton click event to call the displayImagesOneByOne function
document.getElementById("orderButton").addEventListener("click", function() {
  // Test the randomizeSelections function
  var randomOrder = randomizeSelections();
  
  // Test the generateDisplayUrls function
  var displayUrls = generateDisplayUrls(randomOrder);

  // Test the displayImagesOneByOne function
  var displaySpeed = 1000; // milliseconds (adjust as needed)

  displayImagesOneByOne(displayUrls, displaySpeed);
});


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
var selectedOrder = [];

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

console.log("selected:", selectedOrder);



// Function to handle the check order button click event in the kitchen scene
document.getElementById("checkOrderButton").addEventListener("click", function() {
  // Toggle to the orderingScene
  toggleScreen("orderingScene");
  
  // Show the orderSpeakBubble in orderingScene
  document.getElementById("orderSpeakBubble").style.display = "block";
  
  // Check the orders and calculate the score
  checkOrders();
  
  // Display the result image and text
  document.getElementById("score").style.display = "block";
});

// Function to check the orders and calculate the score
function checkOrders() {
  console.log("Selected Order:", selectedOrder);
  console.log("Random Order:", randomOrder);
  let score = 0;
  
  // Iterate through the selectedOrder list and compare with the randomOrder list
  for (let i = 0; i < selectedOrder.length; i++) {
    if (selectedOrder[i] === randomOrder[i]) {
      score++;
    }
  }

  console.log("Score:", score);

  // Display the result based on the score
  displayResult(score);
  console.log("score:", score);
}

// Function to display result images and text based on the score
function displayResult(score) {
  var resultImage = document.getElementById("resultImage");
  var resultText = document.getElementById("resultText");

  if (score === 5) {
      resultImage.src = "./Assets/reactions/heart.png";
      resultText.textContent = "You got 5 out of 5 right!";
  } else if (score === 4) {
      resultImage.src = "./Assets/reactions/happyface.png";
      resultText.textContent = "You got 4 out of 5 right!";
  } else if (score === 3) {
      resultImage.src = "./Assets/reactions/negativeReaction.png";
      resultText.textContent = "You got 3 out of 5 right!";
  } else if (score === 2) {
      resultImage.src = "./Assets/reactions/negativeReaction.png";
      resultText.textContent = "You got 2 out of 5 right!";
  } else if (score === 1) {
      resultImage.src = "./Assets/reactions/angryFace.png";
      resultText.textContent = "You got 1 out of 5 right!";
  } else {
      resultImage.src = "./Assets/reactions/angryFace.png";
      resultText.textContent = "You didn't score well this time.";
  }

var scoreContainer = document.getElementById("score");
scoreContainer.style.display = "block";

 // Adjusting position and size
 resultImage.style.position = 'absolute'; 
 resultImage.style.top = '10%'; 
 resultImage.style.right = '10%'; 
 resultImage.style.width = '300px';
 resultImage.style.height = '300px';
 resultImage.style.zIndex = '9';

 resultText.style.position = 'absolute'; 
 resultText.style.top = '10%'; 
 resultText.style.right = '10%';
 resultText.style.zIndex = '9';
 console.log("result", resultImage.src, resultText.textContent);
 
}
