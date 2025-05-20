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

// Sound after items applied
const snapSynth = new Tone.MembraneSynth({
  pitchDecay: 0.05,
  octaves: 3,
  envelope: {
    attack: 0.001,
    decay: 0.2,
    sustain: 0,
    release: 0.1,
  },
  volume: -10,
}).toDestination();

document.querySelectorAll(".skin-option").forEach((skinOption) => {
  skinOption.addEventListener("click", () => {
    const skinSrc = skinOption.getAttribute("data-src");
    changeSkin(skinSrc);
    playSnapSound();
  });
});

document.querySelectorAll(".eye-option").forEach((eyeOption) => {
  eyeOption.addEventListener("click", () => {
    playSnapSound();
  });
});

document.querySelectorAll(".lip-option").forEach((lipOption) => {
  lipOption.addEventListener("click", () => {
    playSnapSound();
  });
});

document.querySelectorAll(".cheeks-option").forEach((cheeksOption) => {
  cheeksOption.addEventListener("click", () => {
    playSnapSound();
  });
});

document.querySelectorAll(".hair-option").forEach((hairOption) => {
  hairOption.addEventListener("click", () => {
    playSnapSound();
  });
});

document.querySelectorAll(".top-option").forEach((topOption) => {
  topOption.addEventListener("click", () => {
    playSnapSound();
  });
});

document.querySelectorAll(".bottom-option").forEach((bottomOption) => {
  bottomOption.addEventListener("click", () => {
    playSnapSound();
  });
});

document.querySelectorAll(".skirt-option").forEach((skirtOption) => {
  skirtOption.addEventListener("click", () => {
    playSnapSound();
  });
});

document.querySelectorAll(".jacket-option").forEach((jacketOption) => {
  jacketOption.addEventListener("click", () => {
    playSnapSound();
  });
});

document.querySelectorAll(".socks-option").forEach((socksOption) => {
  socksOption.addEventListener("click", () => {
    playSnapSound();
  });
});

document.querySelectorAll(".shoes-option").forEach((shoesOption) => {
  shoesOption.addEventListener("click", () => {
    playSnapSound();
  });
});

function playSnapSound() {
  if (!audioStarted) {
    Tone.start().then(() => {
      audioStarted = true;
      snapSynth.triggerAttackRelease("C5", "16n");
    });
  } else {
    snapSynth.triggerAttackRelease("C5", "16n");
  }
}

// background sound
const ambientPlayer = new Tone.Player(
  "You Know Me - Jeremy Black.mp3"
).toDestination();
ambientPlayer.loop = true;

document.getElementById("start-button").addEventListener("click", async () => {
  const startScreen = document.getElementById("start-screen");
  startScreen.style.display = "none";
  await Tone.start();
  ambientPlayer.start();
});

// Toggle left bar
const allAppearanceButton = [
  "skinBtn",
  "eyeBtn",
  "lipBtn",
  "cheekBtn",
  "hairBtn",
];
const allAppearanceBox = [
  "skin-box",
  "eyes-box",
  "lips-box",
  "cheeks-box",
  "hair-box",
];

function hideAllAppearrancesBox() {
  for (let i = 0; i < allAppearanceBox.length; i++) {
    const box = document.getElementById(allAppearanceBox[i]);
    box.classList.add("hidden");
  }
}

for (let i = 0; i < allAppearanceBox.length; i++) {
  const button = document.getElementById(allAppearanceButton[i]);
  const box = document.getElementById(allAppearanceBox[i]);
  button.addEventListener("click", () => {
    if (box.classList.contains("hidden")) {
      hideAllAppearrancesBox();
    }
    box.classList.toggle("hidden");
  });
}

// Toggle right bar
const allClothesButton = [
  "topBtn",
  "bottomBtn",
  "skirtBtn",
  "jacketBtn",
  "socksBtn",
  "shoesBtn",
];
const allClothesBox = [
  "top-box",
  "bottom-box",
  "skirt-box",
  "jacket-box",
  "socks-box",
  "shoes-box",
];

function hideAllClothesBox() {
  for (let i = 0; i < allClothesBox.length; i++) {
    const box = document.getElementById(allClothesBox[i]);
    box.classList.add("hidden");
  }
}

for (let i = 0; i < allClothesBox.length; i++) {
  const button = document.getElementById(allClothesButton[i]);
  const box = document.getElementById(allClothesBox[i]);
  button.addEventListener("click", () => {
    if (box.classList.contains("hidden")) {
      hideAllClothesBox();
    }
    box.classList.toggle("hidden");
  });
}

// Main
const stage = new Konva.Stage({
  container: "model-box",
  width: 900,
  height: 500,
});

const layer = new Konva.Layer();
stage.add(layer);

// Load base model
let baseSkinImage = new Image();
baseSkinImage.src = "model/skin1.PNG";

let frameImage = new Image();
frameImage.src = "model/frame.PNG";

baseSkinImage.onload = addBaseToLayer;

function addBaseToLayer() {
  const background = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
    fill: "#f0f0f0",
    name: "background",
    listening: false,
  });
  layer.add(background);
  background.moveToBottom();
  const modelWidth = baseSkinImage.width;
  const modelHeight = baseSkinImage.height;

  let x = (stage.width() - modelWidth) / 2;
  let y = (stage.height() - modelHeight) / 2;
  allParts[0] = new Konva.Image({
    image: baseSkinImage,
    x: x,
    y: y,
    name: "model",
  });
  layer.add(allParts[0]);

  frame = new Konva.Image({
    image: frameImage,
    x: x,
    y: y,
    name: "frame",
    listening: false,
  });
  layer.add(frame);

  layer.draw();
  console.log(x, y);
}

document.getElementById("resetBtn").addEventListener("click", () => {
  layer.destroyChildren();
  addBaseToLayer();
});

document.querySelectorAll(".eye-option").forEach((option) => {
  option.addEventListener("click", () => {
    saveHistory();
    const imgSrc = option.getAttribute("data-src");
    document.getElementById("skinLayer").src = imgSrc;
    currentState.skin = imgSrc;
  });
});

document.querySelectorAll(".lip-option").forEach((option) => {
  option.addEventListener("click", () => {
    saveHistory();
    const imgSrc = option.getAttribute("data-src");
    document.getElementById("skinLayer").src = imgSrc;
    currentState.skin = imgSrc;
  });
});

document.querySelectorAll(".cheek-option").forEach((option) => {
  option.addEventListener("click", () => {
    saveHistory();
    const imgSrc = option.getAttribute("data-src");
    document.getElementById("skinLayer").src = imgSrc;
    currentState.skin = imgSrc;
  });
});

document.querySelectorAll(".hair-option").forEach((option) => {
  option.addEventListener("click", () => {
    saveHistory();
    const imgSrc = option.getAttribute("data-src");
    document.getElementById("skinLayer").src = imgSrc;
    currentState.skin = imgSrc;
  });
});

const allParts = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];
const allQuerySelectors = [
  "#skin-box",
  "#eyes-box",
  "#lips-box",
  "#cheeks-box",
  "#hair-box",
  "#socks-box",
  "#shoes-box",
  "#bottom-box",
  "#skirt-box",
  "#top-box",
  "#jacket-box",
];
const allNames = [
  "skin",
  "eyes",
  "lips",
  "cheeks",
  "hair",
  "socks",
  "shoes",
  "bottom",
  "skirt",
  "top_",
  "jacket",
];

for (let i = 0; i < allParts.length; i++) {
  const querySelector = allQuerySelectors[i];
  const name = allNames[i];
  document.querySelectorAll(querySelector + " .options").forEach((option) => {
    option.addEventListener("click", () => {
      const imageSrc = option.getAttribute("data-src");
      const image = new Image();
      image.src = imageSrc;

      image.onload = () => {
        if (allParts[i]) allParts[i].destroy();
        if (name === "bottom" || name === "skirt") {
          if (allParts[7]) allParts[7].destroy();
          if (allParts[8]) allParts[8].destroy();
        }

        const modelWidth = baseSkinImage.width;
        const modelHeight = baseSkinImage.height;

        let x = (stage.width() - modelWidth) / 2;
        let y = (stage.height() - modelHeight) / 2;
        allParts[i] = new Konva.Image({
          image: image,
          x: x,
          y: y,
          name: name,
        });
        layer.add(allParts[i]);
        reorder();
        layer.draw();
      };
    });
  });
}

function reorder() {
  for (let i = 0; i < allParts.length; i++) {
    if (allParts[i]) {
      allParts[i].moveToTop();
      if (i === 0) {
        frame.moveToTop();
      }
    }
  }
}

document.getElementById("download").addEventListener("click", () => {
  const dataURL = stage.toDataURL({
    mimeType: "image/png",
    quality: 1,
    pixelRatio: 2,
  });

  const link = document.createElement("a");
  link.download = "konva_drawing.png";
  link.href = dataURL;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
