import React from 'react';
import { Composition } from 'remotion';
import { CinematicExplainer } from './compositions/CinematicExplainer';
import { ReelsStory } from './compositions/ReelsStory';
import { VectorLivingStage } from './compositions/VectorLivingStage';

export const Root: React.FC = () => {
  return (
    <>
      {/* 16:9 Landscape Cinematic Explainer (1920x1080 @ 60 FPS, 3 seconds / 180 frames) */}
      <Composition
        id="BekMotion16x9"
        component={CinematicExplainer}
        durationInFrames={180}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* 9:16 Portrait Reels/TikTok Story (1080x1920 @ 60 FPS, 2 seconds / 120 frames) */}
      <Composition
        id="BekMotion9x16"
        component={ReelsStory}
        durationInFrames={120}
        fps={60}
        width={1080}
        height={1920}
      />

      {/* Procedural Vector Integration Showcase (1920x1080 @ 60 FPS, 3 seconds / 180 frames) */}
      <Composition
        id="BekVectorShowcase"
        component={VectorLivingStage}
        durationInFrames={180}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
