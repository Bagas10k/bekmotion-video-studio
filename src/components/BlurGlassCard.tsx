import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface BlurGlassCardProps {
  children: React.ReactNode;
  delay?: number;
  width?: number | string;
  padding?: number;
}

export const BlurGlassCard: React.FC<BlurGlassCardProps> = ({
  children,
  delay = 0,
  width = 680,
  padding = 32,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 15,
      stiffness: 180,
      mass: 0.9,
    },
  });

  const scale = interpolate(progress, [0, 1], [0.94, 1.0]);
  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width,
        padding,
        backgroundColor: 'rgba(18, 21, 29, 0.72)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 24,
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
        opacity,
        transform: `scale(${scale})`,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {children}
    </div>
  );
};
