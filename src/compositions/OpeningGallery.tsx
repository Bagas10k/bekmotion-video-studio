import React from 'react';
import { Sequence } from 'remotion';
import { TwoLayerStage } from '../components/TwoLayerStage';
import {
  DigitalScan,
  Shockwave,
  TypoExplosion,
  GlitchImpact,
  PunchCut,
  SpeedTunnel,
  ScreenCrack,
  FlashReveal,
} from '../components/OpeningMotions';

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
          {/* 01: Digital Scan (Frames 0 - 60) */}
          <Sequence from={0} durationInFrames={60}>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DigitalScan text="ANALISIS SISTEM" subtitle="TELEMETRY SCAN... 094%" accentColor="#FA5D29" />
            </div>
          </Sequence>

          {/* 02: Shockwave (Frames 60 - 120) */}
          <Sequence from={60} durationInFrames={60}>
            <Shockwave title="TIRAI TERBUKA" subtitle="KAIMAKU · 2026 OPENING" accentColor="#FF4D6D" />
          </Sequence>

          {/* 03: Typo Explosion (Frames 120 - 180) */}
          <Sequence from={120} durationInFrames={60}>
            <TypoExplosion title="PARTIKEL MENYATU" />
          </Sequence>

          {/* 04: Glitch Impact (Frames 180 - 240) */}
          <Sequence from={180} durationInFrames={60}>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GlitchImpact title="KEBANGKITAN" subtitle="RUNTIME INITIALIZED" accentColor="#49B3FC" />
            </div>
          </Sequence>

          {/* 05: Punch Cut (Frames 240 - 300) */}
          <Sequence from={240} durationInFrames={60}>
            <PunchCut title="TEROBOSAN" badge="TOPPA · PUNCH CUT" />
          </Sequence>

          {/* 06: Speed Tunnel (Frames 300 - 360) */}
          <Sequence from={300} durationInFrames={60}>
            <SpeedTunnel title="BEKMOTION" />
          </Sequence>

          {/* 07: Screen Crack (Frames 360 - 420) */}
          <Sequence from={360} durationInFrames={60}>
            <ScreenCrack title="LAYAR PECAH" />
          </Sequence>

          {/* 08: Flash Reveal (Frames 420 - 480) */}
          <Sequence from={420} durationInFrames={60}>
            <FlashReveal text="BAGAS CIHUY" year="2026" />
          </Sequence>
        </div>
      }
    />
  );
};
