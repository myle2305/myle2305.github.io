// Define size for the game canvas and land image
const konvaSize = 800;
const landSize = 400; // The plot of land is centered

// Create the Konva stage, the main canvas for drawing
const stage = new Konva.Stage({
  container: "game-container", // the HTML element that will contain the canvas
  width: konvaSize,
  height: konvaSize,
});

// Create a new layer for rendering objects
// Layers will organize elements and allow individual manipulation
const layer = new Konva.Layer();
stage.add(layer);

// Load image of the land
const landImg = new Image();
landImg.src = "assets/land.png";

// Display the land image at the center
const land = new Konva.Image({
  image: landImg,
  x: stage.width() / 2 - landSize / 2,
  y: stage.height() / 2 - landSize / 2,
  width: landSize,
  height: landSize,
});
layer.add(land);

let layerCrop = null;
let cropType = null;

// Handle drag-and-drop logic for planting rice
const riceIcon = document.getElementById("rice-icon");

riceIcon.addEventListener("dragstart", function (event) {
  const ghost = document.getElementById("rice-ghost");
  ghost.style.display = ""; // show ghost image during drag
  // I want when the users drag the button, the seed icon inside is pulled out instead of dragging the entire button.

  event.dataTransfer.setDragImage(ghost, 50, 50); // offset for better alignment
  setTimeout(() => {
    ghost.style.display = "none"; // hide the ghost immediately after dragging
  }, 0);
});

// The same dragstart logic applies to other crops
const potatoIcon = document.getElementById("potato-icon");

potatoIcon.addEventListener("dragstart", function (event) {
  const ghost = document.getElementById("potato-ghost");
  ghost.style.display = "";

  event.dataTransfer.setDragImage(ghost, 50, 50);
  setTimeout(() => {
    ghost.style.display = "none";
  }, 0);
});

const cornIcon = document.getElementById("corn-icon");

cornIcon.addEventListener("dragstart", function (event) {
  const ghost = document.getElementById("corn-ghost");
  ghost.style.display = "";

  event.dataTransfer.setDragImage(ghost, 50, 50);
  setTimeout(() => {
    ghost.style.display = "none";
  }, 0);
});

// The knife is used to harvest crops, using the same logic as previous crops
const knifeIcon = document.getElementById("knife-icon");

knifeIcon.addEventListener("dragstart", function (event) {
  const ghost = document.getElementById("knife-ghost");
  ghost.style.display = "";

  event.dataTransfer.setDragImage(ghost, 50, 50);
  setTimeout(() => {
    ghost.style.display = "none";
  }, 0);
});

// Function for when a crop is dropped on the land
riceIcon.addEventListener("dragend", function (event) {
  isReadyToSow = false;
  changeHint(); // once the user has dropped the seed onto the soil, the instruction disappears
  const konvaContent = document.getElementsByClassName("konvajs-content")[0];

  // Calculate the land area position on screen
  let startX =
    konvaContent.getBoundingClientRect().left +
    stage.width() / 2 -
    landSize / 2;
  let startY =
    konvaContent.getBoundingClientRect().top +
    stage.height() / 2 -
    landSize / 2;
  let endX = startX + landSize;
  let endY = startY + landSize;

  // Growing crops logic
  changeCropLayer("assets/rice1.png");
  if (
    event.x >= startX &&
    event.x <= endX &&
    event.y >= startY &&
    event.y <= endY
  ) {
    // Crops growth animation: images change to simulate growing crop
    setTimeout(() => {
      changeCropLayer("assets/rice2.png");
      setTimeout(() => {
        changeCropLayer("assets/rice3.png");
        setTimeout(() => {
          changeCropLayer("assets/rice4.png");
          isReadyToHarvest = true;
          changeHint(); // change the instruction to inform users that the crop is ready to harvest
        }, 2000);
      }, 3000);
    }, 3000);
    cropType = "rice"; // store current crop
  }
});

// Same logic applies for corn and potato
cornIcon.addEventListener("dragend", function (event) {
  isReadyToSow = false;
  changeHint();
  const konvaContent = document.getElementsByClassName("konvajs-content")[0];

  let startX =
    konvaContent.getBoundingClientRect().left +
    stage.width() / 2 -
    landSize / 2;
  let startY =
    konvaContent.getBoundingClientRect().top +
    stage.height() / 2 -
    landSize / 2;
  let endX = startX + landSize;
  let endY = startY + landSize;
  changeCropLayer("assets/corn1.png");
  if (
    event.x >= startX &&
    event.x <= endX &&
    event.y >= startY &&
    event.y <= endY
  ) {
    setTimeout(() => {
      changeCropLayer("assets/corn2.png");
      setTimeout(() => {
        changeCropLayer("assets/corn3.png");
        setTimeout(() => {
          changeCropLayer("assets/corn4.png");
          isReadyToHarvest = true;
          changeHint();
        }, 2000);
      }, 3000);
    }, 3000);
    cropType = "corn";
  }
});

potatoIcon.addEventListener("dragend", function (event) {
  isReadyToSow = false;
  changeHint();
  const konvaContent = document.getElementsByClassName("konvajs-content")[0];
  let startX =
    konvaContent.getBoundingClientRect().left +
    stage.width() / 2 -
    landSize / 2;
  let startY =
    konvaContent.getBoundingClientRect().top +
    stage.height() / 2 -
    landSize / 2;
  let endX = startX + landSize;
  let endY = startY + landSize;
  changeCropLayer("assets/potato1.png");
  if (
    event.x >= startX &&
    event.x <= endX &&
    event.y >= startY &&
    event.y <= endY
  ) {
    setTimeout(() => {
      changeCropLayer("assets/potato2.png");
      setTimeout(() => {
        changeCropLayer("assets/potato3.png");
        setTimeout(() => {
          changeCropLayer("assets/potato4.png");
          isReadyToHarvest = true;
          changeHint();
        }, 2000);
      }, 3000);
    }, 3000);
    cropType = "potato";
  }
});

// Function to remove or display crop layer images
// Cleans up old crops before drawing new ones
function changeCropLayer(name) {
  if (layerCrop != null) {
    layerCrop.destroy(); // remove previous crop from canvas
    layerCrop = null;
  }
  if (name === "") {
    return;
  }
  const cropImg = new Image();
  cropImg.src = name;
  layerCrop = new Konva.Image({
    image: cropImg,
    x: stage.width() / 2 - landSize / 2,
    y: stage.height() / 2 - landSize / 2,
    width: landSize,
    height: landSize,
  });
  layer.add(layerCrop); // add new crop image to layer
}

// Harvesting logic: use knife to cut the crop
document.getElementById("knife-icon").addEventListener("dragend", (event) => {
  isReadyToHarvest = false;
  changeHint();
  const konvaContent = document.getElementsByClassName("konvajs-content")[0];
  let startX =
    konvaContent.getBoundingClientRect().left +
    stage.width() / 2 -
    landSize / 2;
  let startY =
    konvaContent.getBoundingClientRect().top +
    stage.height() / 2 -
    landSize / 2;
  let endX = startX + landSize;
  let endY = startY + landSize;
  if (
    event.x >= startX &&
    event.x <= endX &&
    event.y >= startY &&
    event.y <= endY
  ) {
    // Show harvested image after dragging and dropping the knife
    if (cropType == "rice") {
      changeCropLayer("assets/rice5.png");
    }
    if (cropType == "corn") {
      changeCropLayer("assets/corn5.png");
    }
    if (cropType == "potato") {
      changeCropLayer("assets/potato5.png");
    }
    setTimeout(() => {
      changeCropLayer(""); // the harvested image will disappear after 2s to get ready for a new crop
      isReadyToSow = true; // when the land is empty, the instructions will appear as beginning.
      changeHint();
    }, 2000);
  }
});

// Flags for current interaction state
let isReadyToSow = true;
let isReadyToHarvest = false;
// Control hint UI animations
let sowIntervalId = 0;
let harvestIntervalId = 0;

// Change the instructions (animated scale effect) based on current state
function changeHint() {
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const riceIcon = document.getElementById("rice-icon");
  const cornIcon = document.getElementById("corn-icon");
  const potatoIcon = document.getElementById("potato-icon");
  const knifeIcon = document.getElementById("knife-icon");
  // Blinking animation logic
  if (isReadyToSow == true) {
    step1.style.display = "";
    sowIntervalId = setInterval(() => {
      if (riceIcon.style.scale == 1) {
        riceIcon.style.scale = 1.05;
        cornIcon.style.scale = 1.05;
        potatoIcon.style.scale = 1.05;
      } else {
        riceIcon.style.scale = 1;
        cornIcon.style.scale = 1;
        potatoIcon.style.scale = 1;
      }
    }, 500); // the change every 0.5s and scale from 1 to 1.05 is enough to draw attention to the button without annoying the user.
  } else {
    clearInterval(sowIntervalId);
    riceIcon.style.scale = 1;
    cornIcon.style.scale = 1;
    potatoIcon.style.scale = 1;
    step1.style.display = "none"; // stop blinking after dragging
  }
  if (isReadyToHarvest == true) {
    step2.style.display = "";
    harvestIntervalId = setInterval(() => {
      // the knife button after the crop is ready to harvest attracts the user's attention as well as guides the user to the next action
      if (knifeIcon.style.scale == 1) {
        knifeIcon.style.scale = 1.05;
      } else {
        knifeIcon.style.scale = 1;
      }
    }, 500);
  } else {
    clearInterval(harvestIntervalId);
    knifeIcon.style.scale = 1;
    step2.style.display = "none";
  }
}
changeHint();
