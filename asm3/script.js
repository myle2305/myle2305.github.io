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

// Toggle left bar

const skinBtn = document.getElementById("skinBtn");
const skinBox = document.getElementById("skin-box");

function hideAllAppearanceBox() {
  skinBox.classList.add("hidden");
  eyeBox.classList.add("hidden");
  lipBox.classList.add("hidden");
  cheekBox.classList.add("hidden");
  hairBox.classList.add("hidden");
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

const hairBtn = document.getElementById("hairBtn");
const hairBox = document.getElementById("hair-box");

hairBtn.addEventListener("click", () => {
  if (hairBox.classList.contains("hidden")) {
    hideAllAppearanceBox();
  }
  hairBox.classList.toggle("hidden");
});

// Toggle right bar
const topBtn = document.getElementById("topBtn");
const topBox = document.getElementById("top-box");

function hideAllClothesBox() {
  topBox.classList.add("hidden");
  bottomBox.classList.add("hidden");
  skirtBox.classList.add("hidden");
  jacketBox.classList.add("hidden");
  socksBox.classList.add("hidden");
  shoesBox.classList.add("hidden");
}

topBtn.addEventListener("click", () => {
  if (topBox.classList.contains("hidden")) {
    hideAllClothesBox();
  }
  topBox.classList.toggle("hidden");
});

const bottomBtn = document.getElementById("bottomBtn");
const bottomBox = document.getElementById("bottom-box");

bottomBtn.addEventListener("click", () => {
  if (bottomBox.classList.contains("hidden")) {
    hideAllClothesBox();
  }
  bottomBox.classList.toggle("hidden");
});

const skirtBtn = document.getElementById("skirtBtn");
const skirtBox = document.getElementById("skirt-box");

skirtBtn.addEventListener("click", () => {
  if (skirtBox.classList.contains("hidden")) {
    hideAllClothesBox();
  }
  skirtBox.classList.toggle("hidden");
});

const jacketBtn = document.getElementById("jacketBtn");
const jacketBox = document.getElementById("jacket-box");

jacketBtn.addEventListener("click", () => {
  if (jacketBox.classList.contains("hidden")) {
    hideAllClothesBox();
  }
  jacketBox.classList.toggle("hidden");
});

const socksBtn = document.getElementById("socksBtn");
const socksBox = document.getElementById("socks-box");

socksBtn.addEventListener("click", () => {
  if (socksBox.classList.contains("hidden")) {
    hideAllClothesBox();
  }
  socksBox.classList.toggle("hidden");
});

const shoesBtn = document.getElementById("shoesBtn");
const shoesBox = document.getElementById("shoes-box");

shoesBtn.addEventListener("click", () => {
  if (shoesBox.classList.contains("hidden")) {
    hideAllClothesBox();
  }
  shoesBox.classList.toggle("hidden");
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

    // Save the very first skin as initial state
    if (!initialSkinSrc) {
      initialSkinSrc = skinSrc;
    }

    changeSkin(skinSrc);
  });
});

function changeSkin(skinSrc) {
  const newSkinImage = new Image();
  newSkinImage.src = skinSrc;

  newSkinImage.onload = function () {
    if (skinImage) {
      // Save current state before replacing
      historyStack.push(skinImage.clone());
      skinImage.destroy();
    }

    skinImage = new Konva.Image({
      image: newSkinImage,
      x: 100,
      y: 25,
      name: "skin",
    });
    layer.add(skinImage);

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
}

document.getElementById("resetBtn").addEventListener("click", () => {
  if (initialSkinSrc) {
    historyStack.length = 0; // Clear undo history
    changeSkin(initialSkinSrc);
  }
});

let eyeImage = null;
document.querySelectorAll(".eye-option").forEach((eyeOption) => {
  eyeOption.addEventListener("click", () => {
    const eyeSrc = eyeOption.getAttribute("data-src");

    const newEyeImage = new Image();
    newEyeImage.src = eyeSrc;

    newEyeImage.onload = function () {
      if (eyeImage) {
        eyeImage.destroy();
      }

      eyeImage = new Konva.Image({
        image: newEyeImage,
        x: 100,
        y: 25,
        name: "eye",
      });

      layer.add(eyeImage);
      bringFrameToFront();
      layer.draw();
    };
  });
});

document.querySelectorAll(".eye-option").forEach((option) => {
  option.addEventListener("click", () => {
    saveHistory();
    const imgSrc = option.getAttribute("data-src");
    document.getElementById("skinLayer").src = imgSrc;
    currentState.skin = imgSrc;
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

document.querySelectorAll(".lip-option").forEach((option) => {
  option.addEventListener("click", () => {
    saveHistory();
    const imgSrc = option.getAttribute("data-src");
    document.getElementById("skinLayer").src = imgSrc;
    currentState.skin = imgSrc;
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

document.querySelectorAll(".cheek-option").forEach((option) => {
  option.addEventListener("click", () => {
    saveHistory();
    const imgSrc = option.getAttribute("data-src");
    document.getElementById("skinLayer").src = imgSrc;
    currentState.skin = imgSrc;
  });
});

let hairImage = null;
document.querySelectorAll("#hair-box .options").forEach((hairOption) => {
  hairOption.addEventListener("click", () => {
    const hairSrc = hairOption.getAttribute("data-src");
    const newHairImage = new Image();
    newHairImage.src = hairSrc;

    newHairImage.onload = function () {
      if (hairImage) {
        hairImage.destroy();
      }

      hairImage = new Konva.Image({
        image: newHairImage,
        x: 100,
        y: 25,
        name: "hair",
      });

      layer.add(hairImage);
      layer.draw();
    };
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

function bringHairToFront() {
  if (hairImage) {
    hairImage.moveToTop();
    layer.draw();
  }
}

// Change clothes

let topImage = null;
document.querySelectorAll("#top-box .options").forEach((topOption) => {
  topOption.addEventListener("click", () => {
    const topSrc = topOption.getAttribute("data-src");
    const newTopImage = new Image();
    newTopImage.src = topSrc;

    newTopImage.onload = function () {
      if (topImage) {
        topImage.destroy();
      }

      topImage = new Konva.Image({
        image: newTopImage,
        x: 100,
        y: 25,
        name: "hair",
      });

      layer.add(topImage);
      layer.draw();
    };
  });
});

let bottomImage = null;
document.querySelectorAll("#bottom-box .options").forEach((bottomOption) => {
  bottomOption.addEventListener("click", () => {
    const bottomSrc = bottomOption.getAttribute("data-src");
    const newBottomImage = new Image();
    newBottomImage.src = bottomSrc;

    newBottomImage.onload = function () {
      if (bottomImage) {
        bottomImage.destroy();
      }

      bottomImage = new Konva.Image({
        image: newBottomImage,
        x: 100,
        y: 25,
        name: "hair",
      });

      layer.add(bottomImage);
      layer.draw();
    };
  });
});

let skirtImage = null;
document.querySelectorAll("#skirt-box .options").forEach((skirtOption) => {
  skirtOption.addEventListener("click", () => {
    const skirtSrc = skirtOption.getAttribute("data-src");
    const newSkirtImage = new Image();
    newSkirtImage.src = skirtSrc;

    newSkirtImage.onload = function () {
      if (skirtImage) {
        skirtImage.destroy();
      }

      skirtImage = new Konva.Image({
        image: newSkirtImage,
        x: 100,
        y: 25,
        name: "hair",
      });

      layer.add(skirtImage);
      layer.draw();
    };
  });
});

let jacketImage = null;
document.querySelectorAll("#jacket-box .options").forEach((jacketOption) => {
  jacketOption.addEventListener("click", () => {
    const jacketSrc = jacketOption.getAttribute("data-src");
    const newJacketImage = new Image();
    newJacketImage.src = jacketSrc;

    newJacketImage.onload = function () {
      if (jacketImage) {
        jacketImage.destroy();
      }

      jacketImage = new Konva.Image({
        image: newJacketImage,
        x: 100,
        y: 25,
        name: "hair",
      });

      layer.add(jacketImage);
      layer.draw();
    };
  });
});

function bringJacketToFront() {
  if (jacketImage) {
    jacketImage.moveToTop();
    layer.draw();
  }
}

let socksImage = null;
document.querySelectorAll("#socks-box .options").forEach((socksOption) => {
  socksOption.addEventListener("click", () => {
    const socksSrc = socksOption.getAttribute("data-src");
    const newSocksImage = new Image();
    newSocksImage.src = socksSrc;

    newSocksImage.onload = function () {
      if (socksImage) {
        socksImage.destroy();
      }

      socksImage = new Konva.Image({
        image: newSocksImage,
        x: 100,
        y: 25,
        name: "hair",
      });

      layer.add(socksImage);
      socksImage.moveDown();
      layer.draw();
    };
  });
});

let shoesImage = null;
document.querySelectorAll("#shoes-box .options").forEach((shoesOption) => {
  shoesOption.addEventListener("click", () => {
    const shoesSrc = shoesOption.getAttribute("data-src");
    const newShoesImage = new Image();
    newShoesImage.src = shoesSrc;

    newShoesImage.onload = function () {
      if (shoesImage) {
        shoesImage.destroy();
      }

      shoesImage = new Konva.Image({
        image: newShoesImage,
        x: 100,
        y: 25,
        name: "hair",
      });

      layer.add(shoesImage);
      shoesImage.moveDown();
      layer.draw();
    };
  });
});

// Reset
// Undo
const historyStack = [];
let initialSkinSrc = null;

// Wrap the skin change logic in a function
function changeSkin(skinSrc) {
  const newSkinImage = new Image();
  newSkinImage.src = skinSrc;

  newSkinImage.onload = function () {
    if (skinImage) {
      // Save current state before replacing
      historyStack.push(skinImage.clone());
      skinImage.destroy();
    }

    skinImage = new Konva.Image({
      image: newSkinImage,
      x: 100,
      y: 25,
      name: "skin",
    });
    layer.add(skinImage);

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
}
