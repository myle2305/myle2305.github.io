class SoundGalaxy {
  constructor() {
    this.isStarted = false;
  }

  async init() {
    console.log("Sound Galaxy initializing...");

    this.setupEventListeners();

    uiManager.init();

    console.log("Sound Galaxy ready.");
  }

  async start() {
    if (this.isStarted) return;

    try {
      await audioSystem.init();

      document.getElementById("intro-overlay").style.display = "none";

      this.isStarted = true;
      console.log("Sound Galaxy started!");
    } catch (error) {
      console.error("Failed to start Sound Galaxy:", error);
      alert("Failed to initialize audio. Please refresh and try again.");
    }
  }

  setupEventListeners() {
    const startBtn = document.getElementById("start-btn");
    startBtn.addEventListener("click", () => this.start());

    const toggleHelpBtn = document.getElementById("toggle-help");
    const controls = document.getElementById("controls");
    const closeHelpBtn = document.getElementById("close-help");

    toggleHelpBtn.addEventListener("click", () => {
      if (controls.style.display === "none" || controls.style.display === "") {
        controls.style.display = "block";
      } else {
        controls.style.display = "none";
      }
    });

    closeHelpBtn.addEventListener("click", () => {
      controls.style.display = "none";
    });

    const volumeSlider = document.getElementById("volume-slider");
    const volumeValue = document.getElementById("volume-value");

    volumeSlider.addEventListener("input", (e) => {
      const volume = parseInt(e.target.value);
      volumeValue.textContent = volume;
      audioSystem.setVolume(volume);
    });

    document.addEventListener("keydown", (e) => {
      this.handleKeyboard(e);
    });
  }

  handleKeyboard(e) {
    switch (e.key.toLowerCase()) {
      case "h":
        document.getElementById("toggle-help").click();
        break;
      case "m":
        const slider = document.getElementById("volume-slider");
        const volumeValue = document.getElementById("volume-value");
        if (slider.value > 0) {
          slider.dataset.prevVolume = slider.value;
          slider.value = 0;
          volumeValue.textContent = "0";
        } else {
          slider.value = slider.dataset.prevVolume || 70;
          volumeValue.textContent = slider.value;
        }
        slider.dispatchEvent(new Event("input"));
        break;
      case "arrowleft":
        window.scrollBy({ left: -200, behavior: "smooth" });
        break;
      case "arrowright":
        window.scrollBy({ left: 200, behavior: "smooth" });
        break;
      case "arrowup":
        window.scrollBy({ top: -200, behavior: "smooth" });
        break;
      case "arrowdown":
        window.scrollBy({ top: 200, behavior: "smooth" });
        break;
    }
  }

  dispose() {
    audioSystem.dispose();
    this.isStarted = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new SoundGalaxy();
  app.init();

  window.soundGalaxy = app;
});
