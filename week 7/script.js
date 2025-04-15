// For this application I need to fetch the audio and the button so that
// when someone clicks on the button I can then play the audio.
const topHeading = document.querySelector("#top-heading");
console.log(topHeading);

let myNewHeading = "audio is currently playing";

const airportAudio = document.querySelector("#airport-audio");
console.log(airportAudio);

// my logic for playing the sound:
const playButton = document.querySelector("#play-button");
console.log(playButton);

playButton.addEventListener("click", playAudio);

function playAudio() {
  myNewHeading = "audio is currently playing";
  airportAudio.play();
  topHeading.textContent = myNewHeading;
}
//---------------------

// my logic for pausing the sound:
const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

pauseButton.addEventListener("click", pauseAudio);

function pauseAudio() {
  myNewHeading = "audio is currently playing";
  airportAudio.pause();
  topHeading.textContent = myNewHeading;
}
//---------------------

// my logic for pausing the sound:
const popSound = document.querySelector("#pop-audio");
console.log(popSound);

const popButton = document.querySelector("#pop-button");
console.log(popButton);

popButton.addEventListener("click", popAudio);

function popAudio() {
  myNewHeading = "Popping sound";
  //   airportAudio.pop();
  popSound.play();
  topHeading.textContent = myNewHeading;
}
//---------------------
