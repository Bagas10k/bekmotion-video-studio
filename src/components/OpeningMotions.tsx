import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

// ---------------------------------------------------------------------------
// 01. DIGITAL SCAN (Pemindaian Laser & HUD Telemetri)
// ---------------------------------------------------------------------------
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

  // Laser beam position sweeps vertically from 0% to 100%
  const scanProgress = interpolate(frame, [0, durationInFrames * 0.7], [0, 100], {
    extrapolateRight: 'clamp',
  });

  // Text unmask reveal based on scan position
  const clipHeight = scanProgress;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
      }}
    >
      {/* Sci-Fi HUD Bracket Frame */}
      <svg
        width="440"
        height="220"
        viewBox="0 0 440 220"
        style={{ position: 'absolute', pointerEvents: 'none' }}
      >
        <path d="M 0 40 L 0 0 L 40 0" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <path d="M 400 0 L 440 0 L 440 40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <path d="M 0 180 L 0 220 L 40 220" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <path d="M 400 220 L 440 220 L 440 180" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        {/* Reticle tick marks */}
        <line x1="220" y1="10" x2="220" y2="24" stroke={accentColor} strokeWidth="2" />
        <line x1="220" y1="196" x2="220" y2="210" stroke={accentColor} strokeWidth="2" />
      </svg>

      {/* Scanned Typography */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#EDEDED',
            letterSpacing: '0.08em',
            margin: 0,
            clipPath: `polygon(0 0, 100% 0, 100% ${clipHeight}%, 0 ${clipHeight}%)`,
          }}
        >
          {text}
        </h1>

        {/* Laser Scanning Beam Line */}
        {scanProgress < 99 && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: `${scanProgress}%`,
              height: 3,
              backgroundColor: accentColor,
              boxShadow: `0 0 16px ${accentColor}, 0 0 32px ${accentColor}`,
            }}
          />
        )}
      </div>

      {/* Telemetry Status Label */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: accentColor,
          letterSpacing: '0.2em',
          marginTop: 18,
        }}
      >
        [{subtitle}]
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 04. GLITCH IMPACT (Hentakan Gangguan Digital & RGB Split)
// ---------------------------------------------------------------------------
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

  // Glitch jitter triggers during frames 0 to 24, then locks stable
  const isGlitching = frame < 24;
  const jitterX = isGlitching ? Math.sin(frame * 9.2) * 8 : 0;
  const jitterY = isGlitching ? Math.cos(frame * 7.4) * 4 : 0;
  const rgbOffset = isGlitching ? Math.sin(frame * 12.1) * 6 : 0;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          transform: `translate3d(${jitterX}px, ${jitterY}px, 0)`,
        }}
      >
        {/* Red Split Layer */}
        {isGlitching && (
          <h1
            style={{
              position: 'absolute',
              inset: 0,
              fontSize: 84,
              fontWeight: 800,
              color: '#FA5D29',
              margin: 0,
              transform: `translate3d(${-rgbOffset}px, 0, 0)`,
              opacity: 0.75,
              clipPath: 'polygon(0 20%, 100% 20%, 100% 45%, 0 45%)',
            }}
          >
            {title}
          </h1>
        )}

        {/* Cyan Split Layer */}
        {isGlitching && (
          <h1
            style={{
              position: 'absolute',
              inset: 0,
              fontSize: 84,
              fontWeight: 800,
              color: accentColor,
              margin: 0,
              transform: `translate3d(${rgbOffset}px, 0, 0)`,
              opacity: 0.75,
              clipPath: 'polygon(0 60%, 100% 60%, 100% 85%, 0 85%)',
            }}
          >
            {title}
          </h1>
        )}

        {/* Main Solid Locked Layer */}
        <h1
          style={{
            fontSize: 84,
            fontWeight: 800,
            color: '#EDEDED',
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          {title}
        </h1>
      </div>

      {subtitle && (
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            color: accentColor,
            letterSpacing: '0.25em',
            marginTop: 16,
            opacity: frame > 12 ? 1 : 0,
          }}
        >
          ● {subtitle}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// 06. SPEED TUNNEL (Terowongan Wireframe 3D Melaju Kencang)
// ---------------------------------------------------------------------------
interface SpeedTunnelProps {
  title: string;
}

export const SpeedTunnel: React.FC<SpeedTunnelProps> = ({ title }) => {
  const frame = useCurrentFrame();

  // 6 Concentric expanding wireframe boxes zooming towards camera
  const boxes = [0, 1, 2, 3, 4, 5].map((idx) => {
    const loopOffset = (frame * 3 + idx * 30) % 180;
    const progress = loopOffset / 180;
    const size = interpolate(progress, [0, 1], [40, 1200]);
    const opacity = interpolate(progress, [0, 0.2, 0.8, 1], [0, 0.8, 0.8, 0]);
    return { size, opacity };
  });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Zooming Wireframe Rectangles */}
      {boxes.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: b.size,
            height: b.size * 0.56,
            border: '1.5px solid #FA5D29',
            opacity: b.opacity,
            borderRadius: 12,
            boxShadow: '0 0 12px rgba(250, 93, 41, 0.3)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Hero Title Emerging */}
      <h1
        style={{
          position: 'relative',
          zIndex: 10,
          fontSize: 76,
          fontWeight: 800,
          color: '#FFFFFF',
          letterSpacing: '-0.02em',
          textShadow: '0 0 30px rgba(250, 93, 41, 0.8)',
        }}
      >
        {title}
      </h1>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 08. FLASH REVEAL (Kilatan Cahaya Menyala & Mengungkap Judul)
// ---------------------------------------------------------------------------
interface FlashRevealProps {
  text: string;
  year?: string;
}

export const FlashReveal: React.FC<FlashRevealProps> = ({ text, year = '2026' }) => {
  const frame = useCurrentFrame();

  // Blinding flash at frame 0 that fades to reveal text
  const flashOpacity = interpolate(frame, [0, 6, 24], [1, 0.9, 0], {
    extrapolateRight: 'clamp',
  });

  const textScale = interpolate(frame, [0, 40], [1.12, 1.0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* White-Hot Light Bloom Flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#FFFFFF',
          opacity: flashOpacity,
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `scale(${textScale})`,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            color: '#FA5D29',
            letterSpacing: '0.3em',
            marginBottom: 12,
          }}
        >
          {year}
        </span>
        <h1
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: '#EDEDED',
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          {text}
        </h1>
      </div>
    </div>
  );
};
