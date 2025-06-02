const stage = new Konva.Stage({
  container: "game-container",
  width: 900,
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
  offsetX: 60,
  offsetY: 65,
});
land.scale({ x: 10, y: 10 });
layer.add(land);
