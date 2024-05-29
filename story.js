// Music Toggler
function toggleMusic() {
  var music = document.getElementById("backgroundMusic");
  var musicStatus = document.getElementById("musicStatus");
  if (music.paused) {
    music.play();
    musicToggle.src = "./Assets/Buttons/musicOn.png";
  } else {
    music.pause();
    musicToggle.src = "./Assets/Buttons/musicOff.png";
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
  var scenes = ["cafeScene", "kitchenScene", "orderingScene", "cardScene"];
  // Loop through scene elements and display the selected scene
  for (var i = 0; i < scenes.length; i++) {
    var scene = document.getElementById(scenes[i]);
    if (scenes[i] === sceneId) {
      scene.style.display = "block";
      if (sceneId === "cardScene") {
        displayMemoryCardImage();
      }
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

const customers = [
  'armaan', 
  'maggie', 
  'christy', 
  'grace',
  'xin',
  'kira',
  'georgie'
];

const customerOrders = [
  ['coffee', "whole", "vanillaCream", "caramel", "biscoff"],
  ['birthdayCake', 'whole', 'vanillaCream', 'chocolateSyrup', 'biscoff'],
  ['matcha', 'almond', 'vanillaCream', 'caramel', 'marshmallow'],
  ['vanilla', 'oat', 'vanillaCream', 'chocolateSyrup', 'oreo'],
  ['mango', 'almond', 'vanillaCream', 'chocolateSyrup', 'cherry'],
  ['strawberry', 'oat', 'vanillaCream', 'strawberrySyrup', 'sprinkles'],
  ['chocolate', 'almond', 'chocolateCream', 'peanutButter', 'blueberry']
];

let currentCustomerIndex = 0;

function animateCustomer() {
  var character = document.getElementById("character");
  var speakBubble = document.getElementById("speakBubble");
  var orderButton = document.getElementById("orderButton");

  // Hide the order button initially
  orderButton.style.display = "none";
  speakBubble.style.display = "none"; 

  // Get the next customer in order
  var customerImage = customers[currentCustomerIndex % customers.length];
  character.style.backgroundImage = `url('./CatCustomer/${customerImage}Walk.png')`;

  // Set counter background image for order scene
  const characterCounter = document.querySelector('.characterCounter');
  characterCounter.style.backgroundImage = `url('./CatCustomer/${customerImage}Stand.png')`;
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
      clearInterval(movementInterval);

      // Display speak bubble and order button when character reaches target position
      speakBubble.style.display = "block";
      orderButton.style.display = "block"; // Display order button when character reaches target position
    } else {
      posX -= 5;
      character.style.left = posX + "px";
    }
  }

  // Start character animation and movement intervals
  const animationInterval = setInterval(animate, animationSpeed);
  const movementInterval = setInterval(moveCharacter, 20);
}

// Automatically animate the customer character when the page loads
animateCustomer();

////////////////////Order Functionality Section + kitchen Functionality////////////////////////

// Button Sound Effects
function playButtonClickSound() {
  var buttonClickSound = document.getElementById("buttonClick");
  buttonClickSound.play();
}
document.getElementById("orderButton").addEventListener("click", playButtonClickSound);

function getOrder() {
  return customerOrders[currentCustomerIndex % customerOrders.length];
}

// Function to generate URLs for the order to be displayed
function generateDisplayUrls(customerOrders) {
  var displayUrls = [
    `./Kitchen/IceCream/${customerOrders[0]}.png`,
    `./Kitchen/Milk/${customerOrders[1]}.png`,
    `./Kitchen/WhippedCream/${customerOrders[2]}.png`,
    `./Kitchen/Syrup/${customerOrders[3]}.png`,
    `./Kitchen/Topping/${customerOrders[4]}.png`
  ];
  return displayUrls;
}

function displayImagesOneByOne(displayUrls, displaySpeed) {
  var index = 0;

  function displayNextImage() {
    if (index < displayUrls.length) {
      var currentImageUrl = displayUrls[index];
      console.log(currentImageUrl);

      var imgElement = document.createElement("img");
      imgElement.src = currentImageUrl;
      // Determine the ID based on the current image URL
      var imgId = currentImageUrl.split('/')[3].split('.')[0];
      imgElement.id = imgId; // Use the type as the ID

      imgElement.style.position = 'absolute';
      imgElement.style.top = 'unset';
      imgElement.style.left = 'unset';
      imgElement.style.zIndex = '7';
      document.getElementById("bubble").appendChild(imgElement);
      document.getElementById("orderSpeakBubble").style.display = "block";

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
        toggleScreen("kitchenScene");

        // Hide the orderingScene when transitioning to the kitchenScene
        document.getElementById("orderingScene").style.display = "none";
      }, 500); //  seconds delay before transitioning to the kitchen scene
    }
  }

  displayNextImage();
}

// Update the orderButton click event to call the displayImagesOneByOne function
document.getElementById("orderButton").addEventListener("click", function() {
  var currentOrder = customerOrders[currentCustomerIndex % customerOrders.length];
  var displayUrls = generateDisplayUrls(currentOrder);
  var displaySpeed = 500; // milliseconds (adjust as needed)

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
// Function to handle the check order button click event in the kitchen scene
document.getElementById("checkOrderButton").addEventListener("click", function() {
  // Toggle to the orderingScene
  toggleScreen("orderingScene");

  // Show the orderSpeakBubble in orderingScene
  document.getElementById("orderSpeakBubble").style.display = "block";

  // Check the orders and calculate the score
  checkOrders();
});

function checkOrders() {
  // Toggle back to the ordering scene to display the result
  toggleScreen("orderingScene");
  // Block the orderSpeakBubble in orderingScene
  document.getElementById("orderSpeakBubble").style.display = "none";
  console.log("Selected Order:", selectedOrder);
  console.log("Get Order:", getOrder);
  let score = 0;
  currentOrder = customerOrders[currentCustomerIndex % customerOrders.length];

  // Iterate through the selectedOrder list and compare with the getOrder list
  for (let i = 0; i < selectedOrder.length; i++) {
    if (selectedOrder[i] === currentOrder[i]) {
      score++;
    }
  }

  console.log("Score:", score);

  // Display the result based on the score
  displayResult(score);

  // Display memory card after 2 seconds
  setTimeout(function() {
    distributeMemoryCard(currentCustomerIndex);
  }, 2000);

  // After displaying the result, toggle back to the cafe scene and wait before generating a new customer
  setTimeout(function() {
    toggleScreen("cafeScene");

    // Clear the selected order array for the new round
    selectedOrder = [];

    // Trash the selected options
    trashOrder();

    // Clear the result score image and text
    clearResult();
    currentCustomerIndex++;
    // Generate a new customer for the next round
    animateCustomer();
    // Generate a new random order for the next round
    getOrder = getOrder();
    // Block the orderSpeakBubble in orderingScene
    document.getElementById("orderSpeakBubble").style.display = "block";
  }, 4000); // Adjust the delay as needed
}
// function to update the memory card
let memoryCardCounter = 0;

const memoryCardImages = [
  "./Story/MemoryCards/armaanMemory.png",
  "./Story/MemoryCards/maggieMemory.png",
  "./Story/MemoryCards/christyMemory.png",
  "./Story/MemoryCards/graceMemory.png",
  "./Story/MemoryCards/xinMemory.png",
  "./Story/MemoryCards/kiraMemory.png",
  "./Story/MemoryCards/georgieMemory.png"
];


function updateMemoryCardCounter() {
  var counterElement = document.getElementById("memoryCardCounter");
  counterElement.textContent = memoryCardCounter; // Display only the count
  displayMemoryCardImage();
}

function displayMemoryCardImage() {
  const memoryCardImage = document.getElementById("memoryCardImage");

  if (memoryCardCounter > 0 && memoryCardCounter <= memoryCardImages.length) {
    memoryCardImage.src = memoryCardImages[memoryCardCounter - 1];
    memoryCardImage.style.display = "block";
  } else {
    memoryCardImage.style.display = "none";
  }
}


// Function to distribute memory card to the player
function distributeMemoryCard(currentCustomerIndex) {

  // Get the memory card element
  var memoryCard = document.getElementById("memoryCard");

  // Set the memory card image based on the currentCustomerIndex
  memoryCard.src = memoryCards[currentCustomerIndex % memoryCards.length];

  // Ensure the memory card is displayed
  memoryCard.style.display = "block";

  // Animate the memory card to zoom in
  memoryCard.classList.add("zoomIn");

  // After animation, remove the zoomIn class
  memoryCard.addEventListener("animationend", function() {
    memoryCard.classList.remove("zoomIn");
  });

  // Hide the memory card after a delay
  setTimeout(function() {
    memoryCard.style.display = "none";
  }, 3000); // Adjust the delay as needed

    //updates memory card counter
    memoryCardCounter++;
    console.log("Memory Cards:" + memoryCardCounter);
    updateMemoryCardCounter();

}

//function to go to new page for memory card display
function MemoryCardButtonClick() {
  window.location.href = "cards.html";
}

// Add event listener to close shop button
document.getElementById("shopExit").addEventListener("click", toggleShopPopout);

// Function to clear the result score image and text
function clearResult() {
  var resultImage = document.getElementById("resultImage");
  var resultText = document.getElementById("resultText");

  resultImage.src = "";
  resultText.textContent = "";

  // Hide the result container
  document.getElementById("score").style.display = "none";
}

// Function to display result images and text based on the score
function displayResult(score) {
  var resultImage = document.getElementById("resultImage");
  var resultText = document.getElementById("resultText");

  if (score === 5) {
      resultImage.src = "./Assets/Reactions/heart.png";
      resultText.textContent = "You got 5 out of 5 right!";
  } else if (score === 4) {
      resultImage.src = "./Assets/Reactions/happyface.png";
      resultText.textContent = "You got 4 out of 5 right!";
  } else if (score === 3) {
      resultImage.src = "./Assets/Reactions/negativeReaction.png";
      resultText.textContent = "You got 3 out of 5 right!";
  } else if (score === 2) {
      resultImage.src = "./Assets/Reactions/negativeReaction.png";
      resultText.textContent = "You got 2 out of 5 right!";
  } else if (score === 1) {
      resultImage.src = "./Assets/Reactions/angryFace.png";
      resultText.textContent = "You got 1 out of 5 right!";
  } else {
      resultImage.src = "./Assets/Reactions/angryFace.png";
      resultText.textContent = "You didn't score well this time.";
  }

    var scoreContainer = document.getElementById("score");
    scoreContainer.style.display = "block";
}



function updateMemoryCardCounter() {
  var counterElement = document.getElementById("memoryCardCounter");
  counterElement.textContent = memoryCardCounter; // Display only the count
  displayMemoryCards();
}

function displayMemoryCards() {
  const cardScene = document.getElementById("cardScene");
  cardScene.innerHTML = ''; // Clear previous content

  for (let i = 0; i < memoryCardCounter; i++) {
    let cardButton = document.createElement("button");
    cardButton.classList.add("memoryCardButton");
    cardButton.style.backgroundImage = `url('${memoryCardImages[i]}')`;
    cardButton.addEventListener("click", function() {
      showPopup(memoryCardImages[i]);
    });
    cardScene.appendChild(cardButton);
  }
  
  let exitButton = document.createElement("img");
  exitButton.id = "memoryCardX";
  exitButton.src = "Shop/exit.png";
  exitButton.alt = "X button";
  exitButton.onclick = function() {
    toggleScreen('cafeScene');
  };
  cardScene.appendChild(exitButton);
}

function showPopup(imageSrc) {
  const popup = document.getElementById("popup");
  const popupImage = document.getElementById("popupImage");
  popupImage.src = imageSrc;
  popup.style.display = "block";
}

function hidePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

function distributeMemoryCard(currentCustomerIndex) {
  const memoryCards = [
    "./Story/MemoryCards/armaanMemory.png",
    "./Story/MemoryCards/maggieMemory.png",
    "./Story/MemoryCards/christyMemory.png",
    "./Story/MemoryCards/graceMemory.png",
    "./Story/MemoryCards/xinMemory.png",
    "./Story/MemoryCards/kiraMemory.png",
    "./Story/MemoryCards/georgieMemory.png"
  ];

  // Update memory card counter
  memoryCardCounter++;
  console.log("Memory Cards:", memoryCardCounter);
  updateMemoryCardCounter();
}
