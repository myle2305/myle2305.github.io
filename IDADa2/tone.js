class AudioSystem {
  constructor() {
    this.synth = null;
    this.masterVolume = null;
    this.isInitialized = false;
  }

  async init() {
    if (this.isInitialized) return;

    try {
      await Tone.start();

      this.masterVolume = new Tone.Volume(-10).toDestination();

      this.synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "sine",
        },
        envelope: {
          attack: 0.1,
          decay: 0.3,
          sustain: 0.5,
          release: 2,
        },
      }).connect(this.masterVolume);

      this.isInitialized = true;
      console.log("Audio system initialized");
    } catch (error) {
      console.error("Failed to initialize audio:", error);
    }
  }

  playNote(note, duration = "8n") {
    if (!this.isInitialized || !this.synth) {
      console.warn("Audio system not initialized");
      return;
    }

    const randomDetune = (Math.random() - 0.5) * 20;
    this.synth.triggerAttackRelease(note, duration, Tone.now(), 0.5);
  }

  playChord(notes, duration = "2n") {
    if (!this.isInitialized || !this.synth) {
      console.warn("Audio system not initialized");
      return;
    }

    this.synth.triggerAttackRelease(notes, duration);
  }

  setVolume(value) {
    if (!this.masterVolume) return;

    const volumeDb = (value / 100) * 40 - 30;
    this.masterVolume.volume.value = volumeDb;
  }

  playConstellationReveal(notes) {
    if (!this.isInitialized) return;

    notes.forEach((note, index) => {
      const time = Tone.now() + index * 0.15;
      this.synth.triggerAttackRelease(note, "8n", time, 0.6);
    });

    setTimeout(() => {
      this.playChord(notes, "1n");
    }, notes.length * 150 + 200);
  }

  dispose() {
    if (this.synth) {
      this.synth.dispose();
    }
    if (this.masterVolume) {
      this.masterVolume.dispose();
    }
    this.isInitialized = false;
  }
}

const audioSystem = new AudioSystem();
