import { useCallback, useRef } from "react";

type SoundType = "click" | "hover" | "success" | "error" | "whoosh";

const useClickSound = () => {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback((type: SoundType = "click") => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      switch (type) {
        case "click": {
          // Short mechanical click
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(800 + Math.random() * 400, now);
          osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.connect(gain).connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.08);
          break;
        }
        case "hover": {
          // Soft blip
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(1200 + Math.random() * 200, now);
          gain.gain.setValueAtTime(0.03, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.connect(gain).connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.05);
          break;
        }
        case "whoosh": {
          // Page transition swoosh using noise-like effect
          const bufferSize = ctx.sampleRate * 0.15;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          const bandpass = ctx.createBiquadFilter();
          bandpass.type = "bandpass";
          bandpass.frequency.setValueAtTime(2000, now);
          bandpass.frequency.exponentialRampToValueAtTime(500, now + 0.15);
          bandpass.Q.value = 2;
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          noise.connect(bandpass).connect(gain).connect(ctx.destination);
          noise.start(now);
          break;
        }
        case "success": {
          // Two-tone ascending chime
          [0, 0.1].forEach((delay, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(i === 0 ? 600 : 900, now + delay);
            gain.gain.setValueAtTime(0.06, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.15);
            osc.connect(gain).connect(ctx.destination);
            osc.start(now + delay);
            osc.stop(now + delay + 0.15);
          });
          break;
        }
        case "error": {
          // Descending buzz
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(400, now);
          osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          osc.connect(gain).connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.2);
          break;
        }
      }
    } catch {
      // Audio not supported
    }
  }, [getCtx]);

  return play;
};

export default useClickSound;
