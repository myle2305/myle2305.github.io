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
        }, 3000);
      }, 3000);
    }, 3000);
    cropType = "rice";
  }
});

function changeCropLayer(name) {
  if (layerCrop != null) {
    layerCrop.destroy();
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

document.getElementById("knife-button").addEventListener("dragend", (event) => {
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
  }
});
