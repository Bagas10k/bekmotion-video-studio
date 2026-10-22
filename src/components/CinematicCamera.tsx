import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface CameraProps {
  children: React.ReactNode;
  initialScale?: number;
  finalScale?: number;
  panX?: number;
  panY?: number;
}

export const CinematicCamera: React.FC<CameraProps> = ({
  children,
  initialScale = 1.0,
  finalScale = 1.08,
  panX = -20,
  panY = -15,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Smooth continuous cinematic push-in & drift
  const scale = interpolate(frame, [0, durationInFrames], [initialScale, finalScale], {
    extrapolateRight: 'clamp',
  });

  const x = interpolate(frame, [0, durationInFrames], [0, panX], {
    extrapolateRight: 'clamp',
  });

  const y = interpolate(frame, [0, durationInFrames], [0, panY], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        transform: `scale(${scale}) translate3d(${x}px, ${y}px, 0)`,
        transformOrigin: 'center center',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
