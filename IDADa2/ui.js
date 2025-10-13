class UIManager {
  constructor() {
    this.container = document.getElementById("galaxy-container");
    this.constellationInfo = document.getElementById("constellation-info");
    this.foundConstellations = new Set();
    this.activeStars = new Map();
  }

  createBackgroundStars() {
    const starCount = 800;
    const containerWidth = 10000;
    const containerHeight = 6000;

    const ambientNotes = [
      "C3",
      "D3",
      "E3",
      "F3",
      "G3",
      "A3",
      "B3",
      "C4",
      "D4",
      "E4",
      "F4",
      "G4",
    ];

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "background-star";
      const bgSize = 3 + Math.random() * 2;
      star.style.width = bgSize + "px";
      star.style.height = bgSize + "px";

      star.style.left = Math.random() * containerWidth + "px";
      star.style.top = Math.random() * containerHeight + "px";

      star.style.animationDelay = Math.random() * 3 + "s";
      star.style.animationDuration = 2 + Math.random() * 4 + "s";

      const randomNote =
        ambientNotes[Math.floor(Math.random() * ambientNotes.length)];
      star.dataset.note = randomNote;

      star.style.cursor = "pointer";

      star.addEventListener("click", (e) => {
        this.handleBackgroundStarClick(star);
        e.stopPropagation();
      });

      star.addEventListener("mouseenter", () => {
        star.style.transform = "scale(2)";
        star.style.boxShadow = "0 0 8px rgba(255, 255, 255, 1)";
      });

      star.addEventListener("mouseleave", () => {
        star.style.transform = "scale(1)";
        star.style.boxShadow = "none";
      });

      this.container.appendChild(star);
    }
  }

  handleBackgroundStarClick(star) {
    const note = star.dataset.note;
    audioSystem.playNote(note, "16n");

    star.style.animation = "none";
    star.style.background = "#ffed4e";
    star.style.boxShadow = "0 0 15px #ffed4e";
    star.style.transform = "scale(3)";

    setTimeout(() => {
      star.style.background = "#fff";
      star.style.boxShadow = "none";
      star.style.transform = "scale(1)";
      star.style.animation = "";
    }, 300);
  }

  createConstellationStars() {
    constellations.forEach((constellation, constellationIndex) => {
      constellation.stars.forEach((pos, starIndex) => {
        const star = this.createStar(
          pos,
          constellationIndex,
          starIndex,
          constellation
        );
        this.container.appendChild(star);

        if (!this.activeStars.has(constellationIndex)) {
          this.activeStars.set(constellationIndex, []);
        }
        this.activeStars.get(constellationIndex).push(star);
      });
    });
  }

  createStar(pos, constellationIndex, starIndex, constellation) {
    const star = document.createElement("div");
    star.className = "star";

    const size = 12 + Math.random() * 8;
    star.style.width = size + "px";
    star.style.height = size + "px";

    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;

    const finalX = pos[0] + offsetX;
    const finalY = pos[1] + offsetY;

    star.style.left = finalX + "px";
    star.style.top = finalY + "px";

    star.dataset.constellation = constellationIndex;
    star.dataset.starIndex = starIndex;
    star.dataset.x = finalX;
    star.dataset.y = finalY;
    star.dataset.size = size;

    star.addEventListener("click", (e) => {
      this.handleStarClick(star, constellation, starIndex);
      e.stopPropagation();
    });

    return star;
  }

  handleStarClick(star, constellation, starIndex) {
    star.classList.add("active");

    const note = constellation.notes[starIndex];
    audioSystem.playNote(note);

    const constellationStars = this.activeStars.get(
      parseInt(star.dataset.constellation)
    );
    const allClicked = constellationStars.every((s) =>
      s.classList.contains("active")
    );

    if (allClicked && !this.foundConstellations.has(constellation.name)) {
      this.revealConstellation(constellation, constellationStars);
      this.foundConstellations.add(constellation.name);
      this.updateFoundCount();
    }
  }

  revealConstellation(constellation, stars) {
    for (let i = 0; i < stars.length - 1; i++) {
      this.drawLine(stars[i], stars[i + 1]);
    }

    this.showConstellationInfo(constellation);

    audioSystem.playConstellationReveal(constellation.notes);
  }

  drawLine(star1, star2) {
    const x1 = parseFloat(star1.dataset.x);
    const y1 = parseFloat(star1.dataset.y);
    const x2 = parseFloat(star2.dataset.x);
    const y2 = parseFloat(star2.dataset.y);

    const size1 = parseFloat(star1.dataset.size);
    const size2 = parseFloat(star2.dataset.size);

    const centerX1 = x1 + size1 / 2;
    const centerY1 = y1 + size1 / 2;
    const centerX2 = x2 + size2 / 2;
    const centerY2 = y2 + size2 / 2;

    const length = Math.sqrt(
      Math.pow(centerX2 - centerX1, 2) + Math.pow(centerY2 - centerY1, 2)
    );
    const angle =
      (Math.atan2(centerY2 - centerY1, centerX2 - centerX1) * 180) / Math.PI;

    const line = document.createElement("div");
    line.className = "constellation-line";
    line.style.width = length + "px";
    line.style.left = centerX1 + "px";
    line.style.top = centerY1 + "px";
    line.style.transform = "rotate(" + angle + "deg)";

    this.container.appendChild(line);
  }

  showConstellationInfo(constellation) {
    document.getElementById("constellation-name").textContent =
      constellation.symbol + " " + constellation.name;
    document.getElementById("constellation-desc").textContent =
      constellation.desc;
    document.getElementById("constellation-dates").textContent =
      constellation.dates;

    this.constellationInfo.classList.add("active");

    setTimeout(() => {
      this.constellationInfo.classList.remove("active");
    }, 5000);
  }

  updateFoundCount() {
    const countElement = document.getElementById("found-count");
    countElement.textContent = this.foundConstellations.size;

    if (this.foundConstellations.size === 12) {
      this.showCompletionMessage();
    }
  }

  showCompletionMessage() {
    setTimeout(() => {
      alert(
        "🎉 Congratulations! You discovered all 12 zodiac constellations! 🎉"
      );
    }, 1000);
  }

  setupScrollIndicator() {
    const scrollThumb = document.getElementById("scroll-thumb");
    const containerWidth = 10000;
    const viewportWidth = window.innerWidth;
    const maxScroll = containerWidth - viewportWidth;

    window.addEventListener("scroll", () => {
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
      const scrollPercentage = Math.min(scrollLeft / maxScroll, 1);
      const indicatorWidth = 200;
      const thumbWidth = 20;
      const maxThumbPosition = indicatorWidth - thumbWidth;

      scrollThumb.style.left = scrollPercentage * maxThumbPosition + "px";
    });
  }

  init() {
    this.createBackgroundStars();
    this.createConstellationStars();
    this.setupScrollIndicator();
  }
}

const uiManager = new UIManager();
