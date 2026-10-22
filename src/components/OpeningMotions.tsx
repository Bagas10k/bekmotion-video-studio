import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

// ===========================================================================
// 01. DIGITAL SCAN (Pemindaian Laser & HUD Telemetri)
// ===========================================================================
interface DigitalScanProps {
  text: string;
  subtitle?: string;
  accentColor?: string;
}

export const DigitalScan: React.FC<DigitalScanProps> = ({
  text,
  subtitle = 'SCANNING... 084%',
  accentColor = '#FA5D29',
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const scanProgress = interpolate(frame, [0, durationInFrames * 0.7], [0, 100], {
    extrapolateRight: 'clamp',
  });
  const clipHeight = scanProgress;

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      {/* Sci-Fi HUD Bracket Frame */}
      <svg width="440" height="220" viewBox="0 0 440 220" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <path d="M 0 40 L 0 0 L 40 0" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <path d="M 400 0 L 440 0 L 440 40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <path d="M 0 180 L 0 220 L 40 220" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <path d="M 400 220 L 440 220 L 440 180" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <line x1="220" y1="10" x2="220" y2="24" stroke={accentColor} strokeWidth="2" />
        <line x1="220" y1="196" x2="220" y2="210" stroke={accentColor} strokeWidth="2" />
      </svg>

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <h1 style={{ fontSize: 72, fontWeight: 800, color: '#EDEDED', letterSpacing: '0.08em', margin: 0, clipPath: `polygon(0 0, 100% 0, 100% ${clipHeight}%, 0 ${clipHeight}%)` }}>
          {text}
        </h1>
        {scanProgress < 99 && (
          <div style={{ position: 'absolute', left: 0, right: 0, top: `${scanProgress}%`, height: 3, backgroundColor: accentColor, boxShadow: `0 0 16px ${accentColor}, 0 0 32px ${accentColor}` }} />
        )}
      </div>

      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: accentColor, letterSpacing: '0.2em', marginTop: 18 }}>
        [{subtitle}]
      </div>
    </div>
  );
};

// ===========================================================================
// 02. SHOCKWAVE (Hentakan Gelombang Kejut & Tirai Membuka)
// ===========================================================================
interface ShockwaveProps {
  title: string;
  subtitle?: string;
  accentColor?: string;
}

export const Shockwave: React.FC<ShockwaveProps> = ({
  title,
  subtitle = 'KAIMAKU · OPENING',
  accentColor = '#FF4D6D',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const waveProgress = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const waveRadius = interpolate(waveProgress, [0, 1], [40, 600]);
  const waveOpacity = interpolate(waveProgress, [0, 0.4, 1], [1, 0.8, 0]);

  const textSpring = spring({ frame, fps, config: { damping: 10, stiffness: 220, mass: 0.7 } });
  const textScale = interpolate(textSpring, [0, 1], [0.6, 1.0]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <circle cx="50%" cy="50%" r={waveRadius} fill="none" stroke={accentColor} strokeWidth="4" opacity={waveOpacity} />
        <circle cx="50%" cy="50%" r={waveRadius * 0.75} fill="none" stroke="#FFFFFF" strokeWidth="2" opacity={waveOpacity * 0.7} />
      </svg>

      <div style={{ transform: `scale(${textScale})`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{
          fontSize: 88,
          fontWeight: 900,
          color: '#FFFFFF',
          margin: 0,
          letterSpacing: '-0.02em',
          textShadow: `4px 4px 0px ${accentColor}, 8px 8px 0px rgba(255, 77, 109, 0.6), 12px 12px 24px rgba(0,0,0,0.8)`
        }}>
          {title}
        </h1>
        {subtitle && (
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: accentColor, letterSpacing: '0.25em', marginTop: 16 }}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

// ===========================================================================
// 03. TYPO EXPLOSION (Ledakan Partikel Menyatu Membentuk Huruf)
// ===========================================================================
interface TypoExplosionProps {
  title: string;
}

export const TypoExplosion: React.FC<TypoExplosionProps> = ({ title }) => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: 24 }).map((_, i) => {
    const angle = (i / 24) * 2 * Math.PI;
    const dist = interpolate(frame, [0, 25], [350, 0], { extrapolateRight: 'clamp' });
    const px = Math.cos(angle) * dist;
    const py = Math.sin(angle) * dist;
    const opacity = interpolate(frame, [0, 20, 30], [0, 1, 0], { extrapolateRight: 'clamp' });
    const size = (i % 3 + 2) * 3;
    const col = i % 2 === 0 ? '#FA5D29' : '#FFFFFF';
    return { px, py, opacity, size, col };
  });

  const titleOpacity = interpolate(frame, [18, 28], [0, 1], { extrapolateRight: 'clamp' });
  const titleScale = interpolate(frame, [18, 28], [1.3, 1.0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {particles.map((p, idx) => (
        <div key={idx} style={{
          position: 'absolute', width: p.size, height: p.size, backgroundColor: p.col,
          opacity: p.opacity, transform: `translate3d(${p.px}px, ${p.py}px, 0)`,
          borderRadius: 2, boxShadow: `0 0 8px ${p.col}`
        }} />
      ))}

      <h1 style={{
        fontSize: 84, fontWeight: 800, color: '#EDEDED', letterSpacing: '-0.02em',
        opacity: titleOpacity, transform: `scale(${titleScale})`, margin: 0
      }}>
        {title}
      </h1>
    </div>
  );
};

// ===========================================================================
// 04. GLITCH IMPACT (Hentakan Gangguan Digital & RGB Split)
// ===========================================================================
interface GlitchImpactProps {
  title: string;
  subtitle?: string;
  accentColor?: string;
}

export const GlitchImpact: React.FC<GlitchImpactProps> = ({
  title,
  subtitle = 'AWAKENING',
  accentColor = '#49B3FC',
}) => {
  const frame = useCurrentFrame();
  const isGlitching = frame < 24;
  const jitterX = isGlitching ? Math.sin(frame * 9.2) * 8 : 0;
  const jitterY = isGlitching ? Math.cos(frame * 7.4) * 4 : 0;
  const rgbOffset = isGlitching ? Math.sin(frame * 12.1) * 6 : 0;

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', transform: `translate3d(${jitterX}px, ${jitterY}px, 0)` }}>
        {isGlitching && (
          <h1 style={{
            position: 'absolute', inset: 0, fontSize: 84, fontWeight: 800, color: '#FA5D29', margin: 0,
            transform: `translate3d(${-rgbOffset}px, 0, 0)`, opacity: 0.75, clipPath: 'polygon(0 20%, 100% 20%, 100% 45%, 0 45%)'
          }}>{title}</h1>
        )}
        {isGlitching && (
          <h1 style={{
            position: 'absolute', inset: 0, fontSize: 84, fontWeight: 800, color: accentColor, margin: 0,
            transform: `translate3d(${rgbOffset}px, 0, 0)`, opacity: 0.75, clipPath: 'polygon(0 60%, 100% 60%, 100% 85%, 0 85%)'
          }}>{title}</h1>
        )}
        <h1 style={{ fontSize: 84, fontWeight: 800, color: '#EDEDED', letterSpacing: '-0.02em', margin: 0 }}>
          {title}
        </h1>
      </div>
      {subtitle && (
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: accentColor, letterSpacing: '0.25em', marginTop: 16, opacity: frame > 12 ? 1 : 0 }}>
          ● {subtitle}
        </div>
      )}
    </div>
  );
};

// ===========================================================================
// 05. PUNCH CUT (Potongan Hentak Berirama Tajam & Slanted Bold)
// ===========================================================================
interface PunchCutProps {
  title: string;
  badge?: string;
}

export const PunchCut: React.FC<PunchCutProps> = ({
  title,
  badge = 'BREAKTHROUGH · TOPPA',
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 4, 12], [1.35, 0.98, 1.0], { extrapolateRight: 'clamp' });
  const flash = frame < 3 ? 1 : 0;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {flash > 0 && <div style={{ position: 'absolute', inset: 0, backgroundColor: '#FFFFFF', zIndex: 15 }} />}

      <div style={{ transform: `scale(${scale}) skewX(-6deg)`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ backgroundColor: '#FA5D29', color: '#0A0B0E', padding: '4px 16px', fontWeight: 900, fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.2em', marginBottom: 12 }}>
          {badge}
        </div>
        <h1 style={{ fontSize: 96, fontWeight: 900, color: '#FFFFFF', margin: 0, letterSpacing: '-0.04em', textTransform: 'uppercase' }}>
          {title}
        </h1>
      </div>
    </div>
  );
};

// ===========================================================================
// 06. SPEED TUNNEL (Terowongan Wireframe 3D Melaju Kencang)
// ===========================================================================
interface SpeedTunnelProps {
  title: string;
}

export const SpeedTunnel: React.FC<SpeedTunnelProps> = ({ title }) => {
  const frame = useCurrentFrame();

  const boxes = [0, 1, 2, 3, 4, 5].map((idx) => {
    const loopOffset = (frame * 3 + idx * 30) % 180;
    const progress = loopOffset / 180;
    const size = interpolate(progress, [0, 1], [40, 1200]);
    const opacity = interpolate(progress, [0, 0.2, 0.8, 1], [0, 0.8, 0.8, 0]);
    return { size, opacity };
  });

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {boxes.map((b, i) => (
        <div key={i} style={{
          position: 'absolute', width: b.size, height: b.size * 0.56, border: '1.5px solid #FA5D29',
          opacity: b.opacity, borderRadius: 12, boxShadow: '0 0 12px rgba(250, 93, 41, 0.3)', pointerEvents: 'none'
        }} />
      ))}
      <h1 style={{ position: 'relative', zIndex: 10, fontSize: 76, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(250, 93, 41, 0.8)' }}>
        {title}
      </h1>
    </div>
  );
};

// ===========================================================================
// 07. SCREEN CRACK (Layar Retak Membuka Konten)
// ===========================================================================
interface ScreenCrackProps {
  title: string;
}

export const ScreenCrack: React.FC<ScreenCrackProps> = ({ title }) => {
  const frame = useCurrentFrame();
  const splitOffset = interpolate(frame, [15, 35], [0, 180], { extrapolateRight: 'clamp' });
  const crackOpacity = interpolate(frame, [0, 15, 30], [0, 1, 0], { extrapolateRight: 'clamp' });
  const textScale = interpolate(frame, [15, 35], [0.8, 1.0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 5, transform: `scale(${textScale})` }}>
        <h1 style={{ fontSize: 84, fontWeight: 900, color: '#EDEDED', letterSpacing: '-0.03em', margin: 0 }}>
          {title}
        </h1>
      </div>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '50%', backgroundColor: '#0B0D13', transform: `translate3d(0, -${splitOffset}px, 0)`, zIndex: 10 }} />
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, bottom: 0, backgroundColor: '#0B0D13', transform: `translate3d(0, ${splitOffset}px, 0)`, zIndex: 10 }} />

      {crackOpacity > 0 && (
        <svg width="100%" height="100%" viewBox="0 0 1000 600" style={{ position: 'absolute', inset: 0, zIndex: 15, opacity: crackOpacity, pointerEvents: 'none' }}>
          <path d="M 0 300 L 320 280 L 450 320 L 500 295 L 560 330 L 720 290 L 1000 300" fill="none" stroke="#FF4D6D" strokeWidth="4" />
          <path d="M 500 295 L 480 180 M 500 295 L 530 420" fill="none" stroke="#FF4D6D" strokeWidth="2" />
        </svg>
      )}
    </div>
  );
};

// ===========================================================================
// 08. FLASH REVEAL (Kilatan Cahaya Menyala & Mengungkap Judul)
// ===========================================================================
interface FlashRevealProps {
  text: string;
  year?: string;
}

export const FlashReveal: React.FC<FlashRevealProps> = ({ text, year = '2026' }) => {
  const frame = useCurrentFrame();
  const flashOpacity = interpolate(frame, [0, 6, 24], [1, 0.9, 0], { extrapolateRight: 'clamp' });
  const textScale = interpolate(frame, [0, 40], [1.12, 1.0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#FFFFFF', opacity: flashOpacity, pointerEvents: 'none', zIndex: 20 }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${textScale})` }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, color: '#FA5D29', letterSpacing: '0.3em', marginBottom: 12 }}>
          {year}
        </span>
        <h1 style={{ fontSize: 96, fontWeight: 800, color: '#EDEDED', letterSpacing: '-0.03em', margin: 0 }}>
          {text}
        </h1>
      </div>
    </div>
  );
};
