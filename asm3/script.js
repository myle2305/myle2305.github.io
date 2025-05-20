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

const startBtn = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const mainGame = document.querySelector(".container");

startBtn.addEventListener("click", async () => {
  startScreen.style.display = "none";
  await Tone.start();
  ambientPlayer.start();
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

/// Main
const stage = new Konva.Stage({
  container: "model-box",
  width: 800,
  height: 500,
});

// Create layer first
const layer = new Konva.Layer();
stage.add(layer);

// Add background to layer
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

let baseModelImage = new Image();
baseModelImage.src = "model/skin1.PNG";

let x, y;

baseModelImage.onload = () => {
  const modelWidth = baseModelImage.width;
  const modelHeight = baseModelImage.height;

  x = (stage.width() - modelWidth) / 2;
  y = (stage.height() - modelHeight) / 2;

  const skinImage = new Konva.Image({
    image: baseModelImage,
    x: x,
    y: y,
    name: "model",
  });

  layer.add(skinImage);
  layer.draw();
};

// Handle skin changes
document.querySelectorAll(".skin-option").forEach((skinOption) => {
  skinOption.addEventListener("click", () => {
    const skinSrc = skinOption.getAttribute("data-src");

    if (!initialSkinSrc) {
      initialSkinSrc = skinSrc;
    }

    changeSkin(skinSrc);
  });
});

const skinImage = new Konva.Image({
  image: baseModelImage,
  x: x,
  y: y,
  name: "model",
});

function changeSkin(skinSrc) {
  const newSkinImage = new Image();
  newSkinImage.src = skinSrc;

  newSkinImage.onload = function () {
    if (skinImage) {
      skinImage.destroy();
    }

    skinImage = new Konva.Image({
      image: newSkinImage,
      x: x,
      y: y,
      name: "skin",
    });
    if (background) {
      skinImage.moveAbove(background);
    }
    layer.draw();

    const oldFrame = layer.findOne(".frame");
    if (oldFrame) {
      oldFrame.destroy();
    }

    const frame = new Konva.Image({
      image: frameImage,
      x: x,
      y: y,
      name: "frame",
      listening: false,
    });
    layer.add(frame);
    frame.moveAbove(skinImage);
    layer.draw();
  };
}

document.getElementById("resetBtn").addEventListener("click", () => {
  layer.destroyChildren();
  addBaseToLayer();
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
        x: x,
        y: y,
        name: "eye",
      });
      layer.add(eyeImage);
      eyeImage.moveAbove(skinImage);
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
        x: x,
        y: y,
        name: "lips",
      });
      layer.add(lipImage);
      if (eyeImage) {
        lipImage.moveAbove(eyeImage);
      }
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
        x: x,
        y: y,
        name: "cheeks",
      });
      layer.add(cheekImage);
      cheekImage.moveAbove(lipImage);
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
        x: x,
        y: y,
        name: "hair",
      });
      layer.add(hairImage);
      hairImage.moveToTop();
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
        x: x,
        y: y,
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
        x: x,
        y: y,
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
        x: x,
        y: y,
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
        x: x,
        y: y,
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
        x: x,
        y: y,
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
        x: x,
        y: y,
        name: "hair",
      });

      layer.add(shoesImage);
      shoesImage.moveDown();
      layer.draw();
    };
  });
});

// Reset
// let initialSkinSrc = null;

// const download = document.getElementById("download");
// download.addEventListener("click", () => {
//   let canvas = layer.canvas._canvas;
//   let lnk = document.createElement("a"),
//     e;
//   lnk.download = "download.png";
//   lnk.href = canvas.toDataURL("image/png;base64");
//   if (document.createEvent) {
//     e = document.createEvent("MouseEvents");
//     e.initMouseEvent(
//       "click",
//       true,
//       true,
//       window,
//       0,
//       0,
//       0,
//       0,
//       0,
//       false,
//       false,
//       false,
//       false,
//       0,
//       null
//     );

//     lnk.dispatchEvent(e);
//   } else if (lnk.fireEvent) {
//     lnk.fireEvent("onclick");
//   }
// });

// Download Image
document.getElementById("checkBtn").addEventListener("click", () => {
  const dataURL = stage.toDataURL({ pixelRatio: 3 });

  const link = document.createElement("a");
  link.download = "lookmeup.png";
  link.href = dataURL;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
