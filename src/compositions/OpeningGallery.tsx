import React from 'react';
import { Sequence } from 'remotion';
import { TwoLayerStage } from '../components/TwoLayerStage';
import { DigitalScan, GlitchImpact, SpeedTunnel, FlashReveal } from '../components/OpeningMotions';

export const OpeningGallery: React.FC = () => {
  return (
    <TwoLayerStage
      bg="#08090C"
      layer0Background={
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(20, 24, 36, 0.6) 0%, #08090C 80%)',
          }}
        />
      }
      layer10Content={
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {/* Scene 1: 01 Digital Scan (Frames 0 - 60) */}
          <Sequence from={0} durationInFrames={60}>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DigitalScan text="ANALISIS SISTEM" subtitle="TELEMETRY SCAN... 094%" accentColor="#FA5D29" />
            </div>
          </Sequence>

          {/* Scene 2: 04 Glitch Impact (Frames 60 - 120) */}
          <Sequence from={60} durationInFrames={60}>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GlitchImpact title="KEBANGKITAN" subtitle="RUNTIME INITIALIZED" accentColor="#49B3FC" />
            </div>
          </Sequence>

          {/* Scene 3: 06 Speed Tunnel (Frames 120 - 180) */}
          <Sequence from={120} durationInFrames={60}>
            <SpeedTunnel title="BEKMOTION" />
          </Sequence>

          {/* Scene 4: 08 Flash Reveal (Frames 180 - 240) */}
          <Sequence from={180} durationInFrames={60}>
            <FlashReveal text="BAGAS CIHUY" year="2026" />
          </Sequence>
        </div>
      }
    />
  );
};
