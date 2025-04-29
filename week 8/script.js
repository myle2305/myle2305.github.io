// let us first fetch the media or video file to play
const myVideo = document.querySelector("#my-video");
console.log(myVideo);

myVideo.addEventListener("timeupdate", updateProgressbar);

const progressBar = document.querySelector("#progress-bar");
console.log(progressBar);

function updateProgressbar()
{
    // find in percentage the amount of video played
    let progress = myVideo.currentTime/myVideo.duration * 100;
    // console.log(progress);
// adjust the width of the progress bar accordingly
    progressBar.computedStyleMap.width = progress + "%";
}

// play pause logic
// fetch the play pause button
const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);

playPauseButton.addEventListener("click", togglePlay);

const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

function togglePlay()
{
    if(myVideo.paused  myVideo.ended) {
        myVideo.play();
    } else {
        myVideo.pause();
    }
}

// mute unmute logic
// fetch the mute unmute button
const muteUnmuteButton = document.querySelector("#mute-unmute-button");
console.log(muteUnmuteButton);

// listen to click on that button
muteUnmuteButton.addEventListener("click", togglePlay);

const muteUnmuteImg = document.querySelector("#mute-unmute-img");
console.log(muteUnmuteImg);

function toggleSound()
// if the video has no sound that means muted === true, then unmute the video
{
    if(myVideo.muted) {
        muteUnmuteImg.src = "https://icons8.com/icon/91635/no-audio"
        myVideo.muted = false;
        // if the video has sound then mute the video
    } else {
        muteUnmuteImg.src = "https://icons8.com/icon/reqgj3e1uKBy/audio";
        myVideo.muted = false;
    }
}
// -------------------------------------------


// fast forward logic
// fetch the fast forward button
const fastForwardButton = document.querySelector("#fast-forward-button");
console.log(fastForwardButton);

// listen to click on that button
fastForwardButton.addEventListener("click", togglePlay);

function fastForward() {
    if (myVideo.playbackRate === 1.0) {
        myVideo.playbackRate = 2.0;
    } else {
        myVideo.playbackRate = 1.0;
    }
}
//  = assigning value name = "rohit" id = 3;
// == comparing values 3 == 4 false let b = 4; b == 4 true
// === compare value and type 3 == "3" true 3=== "3" false
// myVideo.muted === true => myVideo.muted
// myVideo.muted === false => !myVideo.muted



// stepping logic
// fetch the fast forward button
const step1Button = document.querySelector("#step1-button");
console.log(step1Button);

// listen to click on that button
step1Button.addEventListener("click", togglePlay);

function gotoStep1() {
    myVideo.currentTime = 17.0;
}


const step2Button = document.querySelector("#step2-button");
console.log(step2Button);

// listen to click on that button
step2Button.addEventListener("click", togglePlay);

function gotoStep2() {
    myVideo.currentTime = 43.54;
}
// --------------------------------------


// full screen logic
// fetch the fast forward button
const fullScreenButton = document.querySelector("#fullscreen-button");
console.log(fullScreenButton);

// listen to click on that button
fullScreenButton.addEventListener("click", goFullscreen);

function goFullscreen() {
    if(!document.fullscreenElement){
        myVideo.requestFullscreen();
    }
    else {
        document.exitFullscreen();
    }
}

// ----------------------------



// likes logic
// fetch the fast forward button
const heartButton = document.querySelector("#heart-button");
console.log(heartButton);

// listen to click on that button
heartButton.addEventListener("click", updateLikes);

let likes = 0;
const likesContainer = document.querySelector("#likes");

function updateLikes() {
    likes++;
    likesContainer.textContent = likes;
}

// ---------------------------------

const playlist = [
    {
        id:1,
        src:"stardust.mp4",
        name: "Stardust"
    },
    {
        id:2,
        src:"zenscape.mp4",
        name:"zenscape",
    },
    {
        id:3,
        src:"",
        name: "Music Video",
    }
];

// playlist logic
// fetch the fast forward button
const stardustButton = document.querySelector("#stardust-vid-button");
console.log(stardustButton);

// listen to click on that button
stardustButton.addEventListener("click", function chooseStardust() {
    chooseVideo(0);
});

const zenscapeButton = document.querySelector("#zenscape-vid-button");
console.log(stardustButton);

// listen to click on that button
zenscapeButton.addEventListener("click", function chooseZenscape() {
    chooseVideo(1);
});

const musicVideoButton = document.querySelector("#musicVideo-vid-button");
console.log(musicVideoButton);

// listen to click on that button
musicVideoButton.addEventListener("click", function chooseMusicVideo() {
    chooseVideo(2);
});

function chooseVideo(no) 
{
    // myVideo.pause();
    myVideo.src = playlist[no].src;
    console.log(musicVideo.src);
    myVideo.load();
    myVideo.play();
}

function chooseSrc(src) {
    myVideo.src = src;
    console.log(myVideo.src);
    myVideo.load();
    myVideo. play();
}
// ---------------------------------