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

  soundButton.textContent = isMuted ? "🔇" : "🔈";
});

// background sound
const ambientPlayer = new Tone.Player(
  "You Know Me - Jeremy Black.mp3"
).toDestination();
ambientPlayer.loop = true;

const startBtn = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const mainGame = document.querySelector(".container");

startBtn.addEventListener("click", async () => {
  await Tone.start();
  ambientPlayer.start();
  startScreen.style.display = "none";
});

// Toggle
const skinBtn = document.getElementById("skinBtn");
const skinBox = document.getElementById("skin-box");

function hideAllAppearanceBox() {
  skinBox.classList.add("hidden");
  eyeBox.classList.add("hidden");
  lipBox.classList.add("hidden");
  cheekBox.classList.add("hidden");
}

skinBtn.addEventListener("click", () => {
  if (skinBox.classList.contains("hidden")) {
    hideAllAppearanceBox();
  }
  skinBox.classList.toggle("hidden");
});

const eyeBtn = document.getElementById("eyeBtn");
const eyeBox = document.getElementById("eyes-box");

eyeBtn.addEventListener("click", () => {
  if (eyeBox.classList.contains("hidden")) {
    hideAllAppearanceBox();
  }
  eyeBox.classList.toggle("hidden");
});

const lipBtn = document.getElementById("lipBtn");
const lipBox = document.getElementById("lips-box");

lipBtn.addEventListener("click", () => {
  if (lipBox.classList.contains("hidden")) {
    hideAllAppearanceBox();
  }
  lipBox.classList.toggle("hidden");
});

const cheekBtn = document.getElementById("cheekBtn");
const cheekBox = document.getElementById("cheeks-box");

cheekBtn.addEventListener("click", () => {
  if (cheekBox.classList.contains("hidden")) {
    hideAllAppearanceBox();
  }
  cheekBox.classList.toggle("hidden");
});

// Main
const stage = new Konva.Stage({
  container: "model-box",
  width: 900,
  height: 500,
});

const layer = new Konva.Layer();
stage.add(layer);

let baseModelImage, frameImage;
let skinImage = null;
let model = null;

// Load base model
baseModelImage = new Image();
baseModelImage.src = "model/base.PNG";

frameImage = new Image();
frameImage.src = "model/frame.PNG";

baseModelImage.onload = function () {
  model = new Konva.Image({
    image: baseModelImage,
    x: 100,
    y: 25,
    name: "model",
  });
  layer.add(model);
  layer.draw();
};

// Handle skin changes
document.querySelectorAll(".skin-option").forEach((skinOption) => {
  skinOption.addEventListener("click", () => {
    const skinSrc = skinOption.getAttribute("data-src");

    const newSkinImage = new Image();
    newSkinImage.src = skinSrc;

    newSkinImage.onload = function () {
      // Remove old skin if it exists
      if (skinImage) {
        skinImage.destroy();
      }

      // Add new skin (always on top of base model)
      skinImage = new Konva.Image({
        image: newSkinImage,
        x: 100,
        y: 25,
        name: "skin",
      });
      layer.add(skinImage);

      // Remove and re-add frame to keep it always on top
      const oldFrame = layer.findOne(".frame");
      if (oldFrame) {
        oldFrame.destroy();
      }

      const frame = new Konva.Image({
        image: frameImage,
        x: 100,
        y: 25,
        name: "frame",
        listening: false,
      });
      layer.add(frame);

      layer.draw();
    };
  });
});

let eyeImage = null;
document.querySelectorAll(".eye-option").forEach((eyeOption) => {
  eyeOption.addEventListener("click", () => {
    const eyeSrc = eyeOption.getAttribute("data-src");

    const newEyeImage = new Image();
    newEyeImage.src = eyeSrc;

    newEyeImage.onload = function () {
      // Remove the previous eye image
      if (eyeImage) {
        eyeImage.destroy();
      }

      // Add new eye image
      eyeImage = new Konva.Image({
        image: newEyeImage,
        x: 100, // Adjust as needed
        y: 25,
        name: "eye",
      });

      layer.add(eyeImage);
      bringFrameToFront(); // If you use frame layering
      layer.draw();
    };
  });
});

let lipImage = null;
document.querySelectorAll("#lips-box .options").forEach((lipOption) => {
  lipOption.addEventListener("click", () => {
    const lipSrc = lipOption.getAttribute("data-src");
    const newLipImage = new Image();
    newLipImage.src = lipSrc;

    newLipImage.onload = function () {
      if (lipImage) {
        lipImage.destroy();
      }

      lipImage = new Konva.Image({
        image: newLipImage,
        x: 100,
        y: 25,
        name: "lips",
      });

      layer.add(lipImage);
      bringFrameToFront();
      layer.draw();
    };
  });
});

let cheekImage = null;
document.querySelectorAll("#cheeks-box .options").forEach((cheekOption) => {
  cheekOption.addEventListener("click", () => {
    const cheekSrc = cheekOption.getAttribute("data-src");
    const newCheekImage = new Image();
    newCheekImage.src = cheekSrc;

    newCheekImage.onload = function () {
      if (cheekImage) {
        cheekImage.destroy();
      }

      cheekImage = new Konva.Image({
        image: newCheekImage,
        x: 100,
        y: 25,
        name: "cheeks",
      });

      layer.add(cheekImage);
      bringFrameToFront();
      layer.draw();
    };
  });
});

function bringFrameToFront() {
  const oldFrame = layer.findOne(".frame");
  if (oldFrame) oldFrame.destroy();

  const frame = new Konva.Image({
    image: frameImage,
    x: 100,
    y: 25,
    name: "frame",
    listening: false,
  });
  layer.add(frame);
  frame.moveToTop();
  layer.draw();
}
