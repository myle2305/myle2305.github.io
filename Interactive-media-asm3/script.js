const stage = new Konva.Stage({
  container: "game-container",
  width: 800,
  height: 800,
  x: 100,
  y: 100,
});

const layer = new Konva.Layer();
stage.add(layer);

const landImg = new Image();
landImg.src = "assets/land.png";

const land = new Konva.Image({
  image: landImg,
  x: stage.width() / 2,
  y: stage.height() / 2,
  width: 100,
  height: 100,
  offsetX: 50,
  offsetY: 70,
});
land.scale({ x: 10, y: 10 });
layer.add(land);

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

cornIcon.addEventListener("dragend", function (event) {
  console.log(event);
});
