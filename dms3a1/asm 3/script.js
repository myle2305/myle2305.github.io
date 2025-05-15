const stage = new Konva.Stage({
  container: "model-box",
  width: 500,
  height: 400,
});

const layer = new Konva.Layer();
stage.add(layer);

const baseModel = new Image();
baseModel.src = "model/base.PNG";
baseModel.onload = function () {
  const model = new Konva.Image({
    image: baseModel,
    x: 0,
    y: 0,
  });
  layer.add(model);
  layer.draw();
};

const appearanceList = [
  "cheeks1.PNG",
  "cheeks2.PNG",
  "cheeks3.PNG",
  "eye1.PNG",
  "eyes2.PNG",
  "eyes3.PNG",
  "eyes4.PNG",
  "hair1.PNG",
  "hair2.PNG",
  "hair3.PNG",
  "hair4.PNG",
  "hair5.PNG",
  "lips1.PNG",
  "lips2.PNG",
  "lips3.PNG",
  "lips4.PNG",
  "lips5.PNG",
  "skin1.PNG",
  "skin2.PNG",
  "skin3.PNG",
  "Skin4.PNG",
];

appearanceList.forEach((file) => {
  const img = new Image();
  img.src = "model/" + file;
  img.onload = function () {
    const appearance = new Konva.Image({
      image: img,
      draggable: true,
    });
    layer.add(appearance);
    layer.draw();
  };
});
