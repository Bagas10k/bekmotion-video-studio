import React from 'react';

interface TwoLayerStageProps {
  layer0Background: React.ReactNode;
  layer10Content: React.ReactNode;
  bg?: string;
}

export const TwoLayerStage: React.FC<TwoLayerStageProps> = ({
  layer0Background,
  layer10Content,
  bg = '#0A0B0E',
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: bg,
        overflow: 'hidden',
        fontFamily: "'Inter Tight', -apple-system, sans-serif",
      }}
    >
      {/* Layer 0: Generative Canvas & Procedural Vectors (No Pointer Events) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {layer0Background}
      </div>

      {/* Layer 10: Razor-Sharp Content & Typography (WCAG AAA >= 7:1) */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {layer10Content}
      </div>
    </div>
  );
};
