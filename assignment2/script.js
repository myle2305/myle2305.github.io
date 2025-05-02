let playlist = [0];

const trackNames = ["Track 1", "Track 2", "Track 3", "Track 4"];

const fileNames = [
  "p-hase_Hes.mp3",
  "p-hase_Dry-Down-feat-Ben-Snaath.mp3",
  "p-hase_Leapt.mp3",
  "p-hase_Water-Feature.mp3",
];

// Play Pause logic
// Users click icon to play or pause the audio, icon will be changed to play or pause icon.
// if the audio is pause, the pause button will shown
// if the audio is play. the play button will shown
// This icon lets users know the play pause status of the audio even when the volume is mute.
function playOrPause() {
  const audio = document.getElementById("audio");
  const icon = document.getElementById("play-pause");
  if (audio.paused) {
    audio.play();
    audio.currentTime = audioProgress.value;
    icon.src = "pause-button.png";
  } else {
    audio.pause();
    icon.src = "play-button.png";
  }
}

// Skip Back logic
// loop run until it can no longer go to the previous song which means the audio is the first track (index = 0)
// when users hit skip back button, the audio will be automatically play so that users do not need to press play button again
// when users skip to previous audio, audio name will be also changed according to audio
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

// Skip Forward logic
// Similar to skip back logic
// loop will run into it can no longer go to the next song => it is the last track (index = 3)
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

// Change Song logic
// Users can hit skip back, skip forward icon or click into the track list to play audio
// If users click the track list to play, the audio will play without clicking play pause icon
function changeSong(index) {
  const audio = document.getElementById("audio");
  const icon = document.getElementById("play-pause");
  audio.src = fileNames[index];
  audio.load();
  audio.play();
  icon.src = "pause-button.png";
  document.getElementById("track-name-player").textContent = trackNames[index];
}

// Mute or unmute logic
// Users click the volume-high-icon, the volume will be mute (volume value = 0)
// Users click the mute-icon, the volume will turn to the highest range of volume which is 1
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

// Volume Control logic
// allow users to adjust the volume
// If users adjust volume value to 0, the mute-icon will be shown
// Adjust volume value to more than 0, the volume-high-icon will be shown
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

// Time update logic
// let users know the current time of the audio
// current time and duration in minutes
// current time is updated while audio is playing
// duration is updated when users change to other tracks
// users can click on the slider to move to the part they want to listen to.
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

// Update Duration logic
function updateDuration(durationInSecond) {
  const duration = document.getElementById("duration");
  //Every time the number of seconds is enough to subtract 60, the number of minutes increases by 1, the surplus is the number of seconds.
  let minute = 0;
  while (durationInSecond >= 60) {
    durationInSecond = durationInSecond - 60;
    minute = minute + 1;
  }
  //there is an issue with seconds is when they are less than 10, they only displays 1 digit.
  //for example: 0:5
  // So, for seconds less than 10, I have to add a zero before seconds.
  if (durationInSecond < 10) {
    durationInSecond = "0" + durationInSecond;
  }
  duration.textContent = minute + ":" + durationInSecond;
}

// Update current Time logic
// Similar to update duration logic
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

// Add remove playlist logic
// track 1 is automatically chosen
// users add playlist by clicking the plus icon, track name will appear in "My Playlist" section and the check icon will also appear instead of plus icon
// remove track from playlist by clicking check icon, track name will no longer appear in the playlist section, plus icon will appear instead of check icon
// playlist sort order from top to bottom as in track section
// when the previous track is removed, the following track will replace
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

// Like logic
// if the not filled heart icon is shown, the fill heart icon will replace after clicking and vice versa
function changeHeart(index) {
  const icons = document.getElementsByClassName("heart-icon");
  const icon = icons[index];
  if (icon.src.includes("heart-icon.png")) {
    icon.src = "heart-icon-fill.png";
  } else {
    icon.src = "heart-icon.png";
  }
}
