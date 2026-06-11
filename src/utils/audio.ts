class AudioManager {
  private ctx: AudioContext | null = null;
  private suspenseOscillator: OscillatorNode | null = null;
  private suspenseGain: GainNode | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTick() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  public playCorrect() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5

    notes.forEach((freq, index) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.1);

      gain.gain.setValueAtTime(0.12, now + index * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.1 + 0.4);

      osc.start(now + index * 0.1);
      osc.stop(now + index * 0.1 + 0.5);
    });
  }

  public playWrong() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(90, now + 0.6);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc.start();
    osc.stop(now + 0.7);
  }

  public playWin() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const majorArpeggio = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];

    majorArpeggio.forEach((freq, index) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.15);

      gain.gain.setValueAtTime(0.1, now + index * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.15 + 0.6);

      osc.start(now + index * 0.15);
      osc.stop(now + index * 0.15 + 0.7);
    });
  }

  public startSuspense() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    if (this.suspenseOscillator) {
      this.stopSuspense();
    }

    const now = this.ctx.currentTime;
    this.suspenseOscillator = this.ctx.createOscillator();
    this.suspenseGain = this.ctx.createGain();

    this.suspenseOscillator.connect(this.suspenseGain);
    this.suspenseGain.connect(this.ctx.destination);

    this.suspenseOscillator.type = 'sine';
    this.suspenseOscillator.frequency.setValueAtTime(98.00, now); // G2 note ambient suspense

    this.suspenseGain.gain.setValueAtTime(0, now);
    this.suspenseGain.gain.linearRampToValueAtTime(0.08, now + 1.0); // fade-in

    this.suspenseOscillator.start();
  }

  public stopSuspense() {
    if (this.suspenseOscillator && this.suspenseGain && this.ctx) {
      const now = this.ctx.currentTime;
      try {
        this.suspenseGain.gain.setValueAtTime(this.suspenseGain.gain.value, now);
        this.suspenseGain.gain.linearRampToValueAtTime(0, now + 0.5);
        this.suspenseOscillator.stop(now + 0.5);
      } catch (e) {
        // Safe fallback
      }
      this.suspenseOscillator = null;
      this.suspenseGain = null;
    }
  }
}

export const audio = new AudioManager();
export default audio;
