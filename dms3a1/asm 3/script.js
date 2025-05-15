const stage = new Konva.Stage({
  container: "model-box",
  width: 900,
  height: 500,
});

const layer = new Konva.Layer();
stage.add(layer);

const baseModel = new Image();
baseModel.src = "model/base.PNG";
baseModel.onload = function () {
  const model = new Konva.Image({
    image: baseModel,
    x: 100,
    y: 25,
    draggable: true,
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
      x: 100,
      y: 25,
      draggable: true,
    });
    layer.add(appearance);
    layer.draw();
  };
});

// Tone js
const bubbleSynth = new Tone.MembraneSynth().toDestination();

let audioStarted = false;

function playBubbleSound() {
  if (!audioStarted) {
    Tone.start().then(() => {
      audioStarted = true;
      bubbleSynth.triggerAttackRelease("C5", "6n");
    });
  } else {
    bubbleSynth.triggerAttackRelease("C5", "6n");
  }
}

// Play bubble sound on any button click
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", playBubbleSound);
});
