const konvaSize = 800;
const landSize = 400;

const stage = new Konva.Stage({
  container: "game-container",
  width: konvaSize,
  height: konvaSize,
});

const layer = new Konva.Layer();
stage.add(layer);

const landImg = new Image();
landImg.src = "assets/land.png";

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
const riceIcon = document.getElementById("rice-icon");

riceIcon.addEventListener("dragstart", function (event) {
  const ghost = document.getElementById("rice-ghost");
  ghost.style.display = "";

  event.dataTransfer.setDragImage(ghost, 50, 50);
  setTimeout(() => {
    ghost.style.display = "none";
  }, 0);
});

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

riceIcon.addEventListener("dragend", function (event) {
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
  changeCropLayer("assets/rice1.png");
  if (
    event.x >= startX &&
    event.x <= endX &&
    event.y >= startY &&
    event.y <= endY
  ) {
    setTimeout(() => {
      changeCropLayer("assets/rice2.png");
      setTimeout(() => {
        changeCropLayer("assets/rice3.png");
        setTimeout(() => {
          changeCropLayer("assets/rice4.png");
          isReadyToHarvest = true;
          changeHint();
        }, 2000);
      }, 2000);
    }, 2000);
    cropType = "rice";
  }
});

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
      }, 2000);
    }, 2000);
    cropType = "potato";
  }
});

function changeCropLayer(name) {
  if (layerCrop != null) {
    layerCrop.destroy();
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
  layer.add(layerCrop);
}

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
      changeCropLayer("");
      isReadyToSow = true;
      changeHint();
    }, 2000);
  }
});

let isReadyToSow = true;
let isReadyToHarvest = false;
let sowIntervalId = 0;
let harvestIntervalId = 0;

function changeHint() {
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const riceIcon = document.getElementById("rice-icon");
  const cornIcon = document.getElementById("corn-icon");
  const potatoIcon = document.getElementById("potato-icon");
  const knifeIcon = document.getElementById("knife-icon");
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
    }, 500);
  } else {
    clearInterval(sowIntervalId);
    riceIcon.style.scale = 1;
    cornIcon.style.scale = 1;
    potatoIcon.style.scale = 1;
    step1.style.display = "none";
  }
  if (isReadyToHarvest == true) {
    step2.style.display = "";
    harvestIntervalId = setInterval(() => {
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
