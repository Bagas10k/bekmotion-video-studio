import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface KineticTextProps {
  title: string;
  accentWords?: string[];
  accentColor?: string;
  subtitle?: string;
  delay?: number;
  fontSize?: number;
}

export const KineticText: React.FC<KineticTextProps> = ({
  title,
  accentWords = [],
  accentColor = '#FA5D29',
  subtitle,
  delay = 0,
  fontSize = 64,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Natural spring entrance
  const progress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 14,
      stiffness: 160,
      mass: 0.8,
    },
  });

  const opacity = interpolate(frame - delay, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(progress, [0, 1], [35, 0]);

  // Parse accent words
  const words = title.split(' ');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
      }}
    >
      <h1
        style={{
          fontSize,
          fontWeight: 800,
          lineHeight: 1.02,
          letterSpacing: '-0.03em',
          color: '#EDEDED',
          margin: 0,
          maxWidth: 1200,
        }}
      >
        {words.map((w, idx) => {
          const isAccent = accentWords.some((aw) => w.toLowerCase().includes(aw.toLowerCase()));
          return (
            <span
              key={idx}
              style={{
                color: isAccent ? accentColor : '#EDEDED',
                marginRight: '0.28em',
                textDecoration: isAccent ? 'underline' : 'none',
                textUnderlineOffset: '6px',
                textDecorationThickness: '2px',
              }}
            >
              {w}
            </span>
          );
        })}
      </h1>

      {subtitle && (
        <p
          style={{
            fontSize: Math.round(fontSize * 0.32),
            fontWeight: 500,
            color: '#8E9AA8',
            marginTop: 18,
            letterSpacing: '0.08em',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
