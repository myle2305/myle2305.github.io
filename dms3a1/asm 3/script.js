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
  "skin4.PNG",
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

// tab visibility
function toggleVisibility() {
  var leftTab = document.getElementById("appearance-box");
  if (leftTab.style.visibility === "hidden") {
    leftTab.style.visibility = "visible";
  } else {
    leftTab.style.visibility = "hidden";
  }
}

// Tone js
const bubbleSynth = new Tone.MembraneSynth().toDestination();

let audioStarted = false;

function playBubbleSound() {
  if (!audioStarted) {
    Tone.start().then(() => {
      audioStarted = true;
      bubbleSynth.triggerAttackRelease("C6", "8n");
    });
  } else {
    bubbleSynth.triggerAttackRelease("C6", "8n");
  }
}

// Play bubble sound on any button click
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", playBubbleSound);
});

let isMuted = false;

const soundButton = document.getElementById("sound-on");

soundButton.addEventListener("click", () => {
  isMuted = !isMuted;
  Tone.Destination.mute = isMuted;

  soundButton.textContent = isMuted ? "" : "🎵";
});

// background sound
const ambientPlayer = new Tone.Player(
  "You Know Me - Jeremy Black.mp3"
).toDestination();
ambientPlayer.loop = true;

let musicMuted = false;
const musicButton = document.getElementById("music-on");

musicButton.addEventListener("click", async () => {
  await Tone.start();

  if (!ambientPlayer.state || ambientPlayer.state === "stopped") {
    ambientPlayer.start();
  }

  musicMuted = !musicMuted;
  ambientPlayer.mute = musicMuted;

  musicButton.textContent = musicMuted ? "🔇" : "🔈";
});
