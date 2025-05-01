const trackList = [
  { id: 1, src: "p-hase_Hes.mp3" },
  { id: 2, src: "p-hase_Dry-Down-feat-Ben-Snaath.mp3" },
  {
    id: 3,
    src: "p-hase_Leapt.mp3",
  },
  { id: 4, src: "p-hase_Water-Feature.mp3" },
];

function playOrPause() {
  const audio = document.getElementById("audio");
  const icon = document.getElementById("play-pause");
  if (audio.paused) {
    audio.play();
    icon.src = "play-button.png";
  } else {
    audio.pause();
    icon.src = "pause-button.png";
  }
}
