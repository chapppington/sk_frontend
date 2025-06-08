class SoundConfig {
  private static instance: SoundConfig;
  private ambientAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private shouldPlayAmbient: boolean = false;

  private constructor() {
    // Initialize mute state from localStorage
    if (typeof window !== "undefined") {
      const storedMuted = localStorage.getItem("sound-muted");
      this.isMuted = storedMuted !== null ? JSON.parse(storedMuted) : false;
      this.shouldPlayAmbient = !this.isMuted;
    }
  }

  static getInstance(): SoundConfig {
    if (!SoundConfig.instance) {
      SoundConfig.instance = new SoundConfig();
    }
    return SoundConfig.instance;
  }

  getMuteState(): boolean {
    return this.isMuted;
  }

  playHoverSound() {
    if (this.isMuted) return;
    const audio = new Audio("/sounds/main/hover.mp3");
    audio.volume = 0.05;
    audio.play().catch((error) => {
      console.warn("Failed to play hover sound:", error);
    });
  }

  playClickSound() {
    if (this.isMuted) return;
    const audio = new Audio("/sounds/main/click.mp3");
    audio.volume = 0.05;
    audio.play().catch((error) => {
      console.warn("Failed to play click sound:", error);
    });
  }

  playSoftButtonSound() {
    if (this.isMuted) return;
    const audio = new Audio("/sounds/main/soft-button.mp3");
    audio.volume = 0.02;
    audio.play().catch((error) => {
      console.warn("Failed to play soft button sound:", error);
    });
  }

  playAmbientSound() {
    if (this.isMuted) return;
    if (!this.ambientAudio) {
      this.ambientAudio = new Audio("/sounds/main/ambient.mp3");
      this.ambientAudio.loop = true;
      this.ambientAudio.volume = 0.03;
    }
    this.ambientAudio.play().catch((error) => {
      console.warn("Failed to play ambient sound:", error);
      // If autoplay fails, we'll try again on next user interaction
      this.shouldPlayAmbient = true;
    });
  }

  stopAmbientSound() {
    if (this.ambientAudio) {
      this.ambientAudio.pause();
      this.ambientAudio.currentTime = 0;
    }
    this.shouldPlayAmbient = false;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbientSound();
    } else {
      this.shouldPlayAmbient = true;
      this.playAmbientSound();
    }
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("sound-muted", JSON.stringify(this.isMuted));
    }
    return this.isMuted;
  }

  // Call this method on user interaction
  handleUserInteraction() {
    if (this.shouldPlayAmbient && !this.isMuted) {
      this.playAmbientSound();
    }
  }

  setVolume(
    type: "hover" | "click" | "ambient" | "soft-button",
    volume: number
  ) {
    switch (type) {
      case "hover":
        // Store hover volume in localStorage or state management
        break;
      case "click":
        // Store click volume in localStorage or state management
        break;
      case "soft-button":
        // Store soft button volume in localStorage or state management
        break;
      case "ambient":
        if (this.ambientAudio) {
          this.ambientAudio.volume = volume;
        }
        break;
    }
  }
}

// Export singleton instance
export const soundConfig = SoundConfig.getInstance();

// Export individual functions for backward compatibility
export const playHoverSound = () => soundConfig.playHoverSound();
export const playClickSound = () => soundConfig.playClickSound();
export const playSoftButtonSound = () => soundConfig.playSoftButtonSound();
