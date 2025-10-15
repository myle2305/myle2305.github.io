const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const notes = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4"];

document.documentElement.addEventListener("mousedown", () => {
  if (Tone.context.state !== "running") {
    Tone.start();
  }
});

function playRandomNote() {
  const randomNote = notes[Math.floor(Math.random() * notes.length)];
  synth.triggerAttackRelease(randomNote, "8n");
}

const galaxyBackground = document.getElementById("galaxy-background");
const numberOfStars = 300;
const backgroundWidth = 200;
const backgroundHeight = 200;

function createStars() {
  const container = document.body;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const randomSize = Math.random() * 3 + 1;
    star.style.setProperty("--star-size", `${randomSize}px`);

    const randomDelay = Math.random() * 5;
    star.style.animationDelay = `${randomDelay}s`;

    const randomDuration = Math.random() * 2 + 2;
    star.style.animationDuration = `${randomDuration}s`;

    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    star.style.left = `${randomX}%`;
    star.style.top = `${randomY}%`;

    star.addEventListener("click", (e) => {
      e.stopPropagation();
      playRandomNote();

      star.classList.add("active");
      setTimeout(() => {
        star.classList.remove("active");
      }, 300);
    });

    container.appendChild(star);
  }
}

createStars();

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const dx = (mouseX - centerX) / centerX;
  const dy = (mouseY - centerY) / centerY;

  const bgOffsetX = dx * 10;
  const bgOffsetY = dy * 10;
  galaxyBackground.style.transform = `translate(${bgOffsetX}px, ${bgOffsetY}px)`;

  document.querySelectorAll(".star").forEach((star) => {
    const starSpeed = 20;
    const starOffsetX = dx * starSpeed;
    const starOffsetY = dy * starSpeed;

    star.style.transform = `translate(${starOffsetX}px, ${starOffsetY}px) rotate(45deg)`;
  });
});
