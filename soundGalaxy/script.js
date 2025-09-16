const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const notes = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4"];

function playRandomNote() {
  Tone.start();
  const randomNote = notes[Math.floor(Math.random() * notes.length)];
  synth.triggerAttackRelease(randomNote, "8n");
}

const scrollContainer = document.getElementById("scroll-container");
const numberOfStars = 1000;
const backgroundWidth = 6000;
const backgroundHeight = 6000;

function createStars() {
  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const randomX = Math.random() * backgroundWidth;
    const randomY = Math.random() * backgroundHeight;
    star.style.left = `${randomX}px`;
    star.style.top = `${randomY}px`;

    star.addEventListener("click", (e) => {
      e.stopPropagation();
      playRandomNote();
      star.classList.add("clicked-star");
      setTimeout(() => {
        star.classList.remove("clicked-star");
      }, 300);
    });

    scrollContainer.appendChild(star);
  }
}

createStars();
