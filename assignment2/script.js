const trackList = [
  { id: 1, src: "p-hase_Hes.mp3" },
  { id: 2, src: "p-hase_Dry-Down-feat-Ben-Snaath.mp3" },
  {
    id: 3,
    src: "p-hase_Leapt.mp3",
  },
  { id: 4, src: "p-hase_Water-Feature.mp3" },
];

let playlist = [0];

const trackNames = ["Track 1", "Track 2", "Track 3", "Track 4"];

const fileNames = [
  "p-hase_Hes.mp3",
  "p-hase_Dry-Down-feat-Ben-Snaath.mp3",
  "p-hase_Leapt.mp3",
  "p-hase_Water-Feature.mp3",
];

function playOrPause() {
  const audio = document.getElementById("audio");
  const icon = document.getElementById("play-pause");
  if (audio.paused) {
    audio.play();
    icon.src = "pause-button.png";
  } else {
    audio.pause();
    icon.src = "play-button.png";
  }
}

function skipBack() {
  const trackName = document.getElementById("track-name-player").textContent;
  let index = 0;
  for (let i = 0; i < trackNames.length; i = i + 1) {
    if (trackNames[i] == trackName) {
      index = i;
    }
  }
  if (index == 0) {
    return;
  }
  index = index - 1;
  const audio = document.getElementById("audio");
  const icon = document.getElementById("play-pause");
  audio.src = fileNames[index];
  audio.load();
  audio.play();
  icon.src = "pause-button.png";
  document.getElementById("track-name-player").textContent = trackNames[index];
}

function skipForward() {
  const trackName = document.getElementById("track-name-player").textContent;
  let index = 0;
  for (let i = 0; i < trackNames.length; i = i + 1) {
    if (trackNames[i] == trackName) {
      index = i;
    }
  }
  if (index == 3) {
    return;
  }
  index = index + 1;
  const audio = document.getElementById("audio");
  const icon = document.getElementById("play-pause");
  audio.src = fileNames[index];
  audio.load();
  audio.play();
  icon.src = "pause-button.png";
  document.getElementById("track-name-player").textContent = trackNames[index];
}

function changeSong(index) {
  const audio = document.getElementById("audio");
  const icon = document.getElementById("play-pause");
  audio.src = fileNames[index];
  audio.load();
  audio.play();
  icon.src = "pause-button.png";
  document.getElementById("track-name-player").textContent = trackNames[index];
}

function muteUnmute() {
  const volumeControl = document.getElementById("volume-range");
  const icon = document.getElementById("volume-icon");
  const audio = document.getElementById("audio");
  if (volumeControl.value == 0) {
    volumeControl.value = 1;
    audio.volume = 1;
    icon.src = "volume-high-icon.png";
  } else {
    volumeControl.value = 0;
    audio.volume = 0;
    icon.src = "mute-icon.png";
  }
}

const volumeControl = document.getElementById("volume-range");
const audio = document.getElementById("audio");
const icon = document.getElementById("volume-icon");
const audioProgress = document.getElementById("audio-progress");
volumeControl.addEventListener("input", function () {
  audio.volume = this.value;
  if (volumeControl.value == 0) {
    icon.src = "mute-icon.png";
  } else {
    icon.src = "volume-high-icon.png";
  }
});

audio.addEventListener("timeupdate", () => {
  audioProgress.max = audio.duration;
  audioProgress.value = audio.currentTime;
  updateCurrentTime(Math.floor(audio.currentTime));
});
audio.addEventListener("loadedmetadata", () => {
  updateDuration(Math.floor(audio.duration));
});
audioProgress.addEventListener("input", () => {
  audio.currentTime = audioProgress.value;
  updateCurrentTime(Math.floor(audio.currentTime));
});
updatePlaylist();
function updateDuration(durationInSecond) {
  const duration = document.getElementById("duration");
  let minute = 0;
  while (durationInSecond >= 60) {
    durationInSecond = durationInSecond - 60;
    minute = minute + 1;
  }
  if (durationInSecond < 10) {
    durationInSecond = "0" + durationInSecond;
  }
  duration.textContent = minute + ":" + durationInSecond;
}

function updateCurrentTime(currentTimeInSecond) {
  const currentTime = document.getElementById("current-time");
  let minute = 0;
  while (currentTimeInSecond >= 60) {
    currentTimeInSecond = currentTimeInSecond - 60;
    minute = minute + 1;
  }
  if (currentTimeInSecond < 10) {
    currentTimeInSecond = "0" + currentTimeInSecond;
  }
  currentTime.textContent = minute + ":" + currentTimeInSecond;
}

function addRemovePlaylist(index) {
  if (playlist.includes(index)) {
    playlist = playlist.filter((e) => e !== index);
  } else {
    playlist.push(index);
  }
  updatePlaylist();
}

function updatePlaylist() {
  const plusIcons = document.getElementsByClassName("plus-icon");
  for (let i = 0; i < plusIcons.length; i++) {
    const plusIcon = plusIcons[i];
    plusIcon.src = "plus.png";
  }
  for (let i = 0; i < playlist.length; i++) {
    const plusIcon = plusIcons[playlist[i]];
    plusIcon.src = "check-icon.png";
  }
  const playlistSong = document.getElementById("playlist-song");
  playlistSong.replaceChildren();
  for (let i = 0; i < playlist.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.textContent = trackNames[playlist[i]];
    playlistSong.appendChild(newDiv);
  }
}

function changeHeart(index) {
  const icons = document.getElementsByClassName("heart-icon");
  const icon = icons[index];
  if (icon.src.includes("heart-icon.png")) {
    icon.src = "heart-icon-fill.png";
  } else {
    icon.src = "heart-icon.png";
  }
}
