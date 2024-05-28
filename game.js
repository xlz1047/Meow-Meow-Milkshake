function playButtonClickSound() {
  var buttonClickSound = document.getElementById("buttonClick");
  buttonClickSound.play();
}

var buttons = [
  "orderButton",
  "shopButton",
  "shopExit",
  "speedIcon",
  "trashIcon",
  "nightIcon",
  "yesButton",
  "noButton",
  "checkOrderButton",
  "trashButton",
  "musicToggle"
];

buttons.forEach(function(buttonId) {
  var button = document.getElementById(buttonId);
  if (button) {
    button.addEventListener("click", playButtonClickSound);
  }
});

// coin variable
var coins = 0;

var volume = document.getElementById("backgroundMusic");
volume.volume = 0.5;

// Music Toggler
function toggleMusic() {
  var music = document.getElementById("backgroundMusic");
  music.volume = 0.5;
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
  audio.volume = 0.5;
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
    "grace",
    "mable",
    "nana",
    "kira",
    "colin",
    "georgie",

    //Add more as needed
  ];
  return customerImages[Math.floor(Math.random() * customerImages.length)];
}

function animateCustomer() {
  var character = document.getElementById("character");
  var speakBubble = document.getElementById("speakBubble");
  var orderButton = document.getElementById("orderButton");

  // Hide the order button initially
  orderButton.style.display = "none";
  speakBubble.style.display = "none"; 

  // Array containing names of customer images
  const customerImages = [
   "armaan", 
    "maggie", 
    "christy", 
    "xin",
    "grace",
    "mable",
    "nana",
    "kira",
    "colin",
    "georgie",
    
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
  "chocolateCream",
  "vanillaCream"
];

const syrupOptions = [
  "caramel",
  "chocolateSyrup",
  "peanutButter",
  "strawberrySyrup"
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
  "strawberryTopping"
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
      // Determine the ID based on the current image URL
      var imgId = currentImageUrl.split('/')[3].split('.')[0];
      imgElement.id = imgId; // Use the type as the ID

      imgElement.style.position = 'absolute';
      imgElement.style.top = 'unset';
      imgElement.style.left = 'unset';
      imgElement.style.zIndex = '7';
      document.getElementById("bubble").appendChild(imgElement);

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
  // Test the randomizeSelections function
  var randomOrder = randomizeSelections();

  // Test the generateDisplayUrls function
  var displayUrls = generateDisplayUrls(randomOrder);

  // Test the displayImagesOneByOne function
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
    var scoopClickSound = document.getElementById("scoop");
    scoopClickSound.play();
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
      var milkClickSound = document.getElementById("carton");
      milkClickSound.play();
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
      var whipClickSound = document.getElementById("whip");
      whipClickSound.play();
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

// Helper Functions to Disable and Enable Image Buttons
function disableImageButtons() {
  var imageButtons = document.querySelectorAll('img[onclick]');
  imageButtons.forEach(function(img) {
    if (img.id !== 'blenderButton') {
      img.originalOnClick = img.onclick;
      img.onclick = function() { showAlert(); };
    }
  });
}

function enableImageButtons() {
  var imageButtons = document.querySelectorAll('img[onclick]');
  imageButtons.forEach(function(img) {
    if (img.originalOnClick) {
      img.onclick = img.originalOnClick;
      delete img.originalOnClick;
    }
  });
}

function showAlert() {
  alert('The blender is working. Please wait.');
}

// Blender Button Animation
function animateBlender() {
  var blender = document.getElementById("blenderAnimation");
  var frameIndex = 0;
  var totalFrames = 4;
  var frameRate = 100;

  animationInterval = setInterval(function() {
    blender.style.backgroundPosition = `-${frameIndex * 109}px 0`;
    frameIndex = (frameIndex + 1) % totalFrames;
  }, frameRate);
}

var blenderSpeed = 5000;
var mixerClickSound = document.getElementById("mixer");

// Blender Button Functionality
function displayBlendedIceCream() {
  if (selectedIceCream && selectedMilk) {
    mixerClickSound.play();
    // Disable all image buttons except the blender button
    disableImageButtons();

    // Start blender animation
    animateBlender();

    // Start a 5-second timer
    setTimeout(function() {
      // Stop blender animation
      clearInterval(animationInterval);

      // Re-enable all image buttons
      enableImageButtons();

      // Resetting display for all milks and ice creams.
      for (var i = 15; i <= 25; i++) {
        var image = document.getElementById("secondImage" + i);
        image.style.display = 'none';
      }

      // Display the full version of the selected ice cream
      blendedIceCream = document.getElementById(selectedIceCream + 'Blended');
      blendedIceCream.style.display = 'block';
    }, blenderSpeed); // 5 seconds delay
  } else {
    alert('Please select the ice cream and milk first.');
  }
}

var trashPenalty = 4;

// Trash Can Functionality
function trashOrder() {
  // Coin Penalty
  coins -= trashPenalty;
  updateCoin();

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

function checkOrders() {
  // Toggle back to the ordering scene to display the result
  toggleScreen("orderingScene");
  // Block the orderSpeakBubble in orderingScene
  document.getElementById("orderSpeakBubble").style.display = "none";
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

  // Update coins based on the score
  coins += score;
  updateCoin();

  // After displaying the result, toggle back to the cafe scene and wait before generating a new customer
  setTimeout(function() {
    toggleScreen("cafeScene");

    // Clear the selected order array for the new round
    selectedOrder = [];
    randomOrder = [];

    // Trash the selected options
    trashOrder();

    // Clear the result score image and text
    clearResult();

    // Generate a new customer for the next round
    animateCustomer();
    // Generate a new random order for the next round
    randomOrder = randomizeSelections();
    // Block the orderSpeakBubble in orderingScene
    document.getElementById("orderSpeakBubble").style.display = "block";
  }, 2000); // Adjust the delay as needed
}

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

//function to update the coins
function updateCoin() {
  var coinCount = document.getElementById("coinCount");
  coinCount.textContent = coins;
}

// Function to toggle the shop popout
function toggleShopPopout() {
  var shopPopout = document.getElementById("shopPopout");
  var cafeScene = document.getElementById("cafeScene");

  if (shopPopout.style.display === "none" || shopPopout.style.display === "") {
    shopPopout.style.display = "block";
    cafeScene.classList.add("dimmed");
    document.getElementById("coinDisplay").classList.remove("dimmed"); // Ensure coinDisplay is not dimmed
  } else {
    shopPopout.style.display = "none";
    cafeScene.classList.remove("dimmed");
  }
}

// Add event listener to shop button
document.getElementById("shopButton").addEventListener("click", toggleShopPopout);
// Add event listener to close shop button
document.getElementById("shopExit").addEventListener("click", toggleShopPopout);

// Function to show the popup with the description
function showPopup(descriptionLines, callback) {
  const popupContainer = document.getElementById("popupContainer");
  const popupTextContainer = document.getElementById("popupTextContainer");

  // Clear any existing content
  popupTextContainer.innerHTML = '';

  // Add each line of the description
  descriptionLines.forEach(line => {
    const p = document.createElement("p");
    p.textContent = line;
    popupTextContainer.appendChild(p);
  });

  // Display the popup
  popupContainer.style.display = "block";

  // Event listener for Yes button
  document.getElementById("yesButton").onclick = function() {
    popupContainer.style.display = "none";
    callback(true);
  };

  // Event listener for No button
  document.getElementById("noButton").onclick = function() {
    popupContainer.style.display = "none";
    callback(false);
  };
}

document.getElementById("speedIcon").addEventListener("click", function() {
  const descriptionLines = [
    "Do you want to buy this upgrade?",
    "This upgrade will make the blender speed faster.",
    "Cost: 20     "
  ];

  showPopup(descriptionLines, function(confirmed) {
      if (confirmed) {
        if (coins >= 20) {
          coins -= 20;
          updateCoin(); // Update the displayed coin count
          blenderSpeed = 2000;
          mixerClickSound = document.getElementById("mixerUpgrade");

          var speedCheck = document.getElementById("speedCheck");
          speedCheck.style.display = "block";
          
          // Disable the icon and apply the darkened style
          const speedIcon = document.getElementById("speedIcon");
          speedIcon.classList.add("disabled-icon");
          speedIcon.style.pointerEvents = 'none';
        } else {
          alert("You don't have enough coins to buy this item.");
        }
      }
    });
  });

document.getElementById("trashIcon").addEventListener("click", function() {
  const descriptionLines = [
    "Do you want to buy this upgrade?",
    "This upgrade will decrease the trash can penalty.",
    "Cost: 20     "
  ];

  showPopup(descriptionLines, function(confirmed) {
      if (confirmed) {
        if (coins >= 20) {
          coins -= 20;
          updateCoin(); // Update the displayed coin count
          trashPenalty = 2;

          var trashCheck = document.getElementById("trashCheck");
          trashCheck.style.display = "block";

          // Disable the icon and apply the darkened style
          const trashIcon = document.getElementById("trashIcon");
          trashIcon.classList.add("disabled-icon");
          trashIcon.style.pointerEvents = 'none';
        } else {
          alert("You don't have enough coins to buy this item.");
        }
      }
    });
  });

document.getElementById("nightIcon").addEventListener("click", function() {
  const descriptionLines = [
    "Do you want to buy this upgrade?",
    "This upgrade will unlock the nighttime theme.",
    "Cost: 10     "
  ];

  showPopup(descriptionLines, function(confirmed) {
      if (confirmed) {
        if (coins >= 10) {
          coins -= 10;
          updateCoin(); // Update the displayed coin count

          var nightCheck = document.getElementById("nightCheck");
          nightCheck.style.display = "block";

          // Disable the icon and apply the darkened style
          const nightIcon = document.getElementById("nightIcon");
          nightIcon.classList.add("disabled-icon");
          nightIcon.style.pointerEvents = 'none';
        } else {
          alert("You don't have enough coins to buy this item.");
        }
      }
    });
  });

// CSS class to darken the icon
const style = document.createElement('style');
style.innerHTML = `
  .disabled-icon {
    opacity: 0.5;
  }
`;
document.head.appendChild(style);