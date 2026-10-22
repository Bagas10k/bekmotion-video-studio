import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { TwoLayerStage } from '../components/TwoLayerStage';
import { CinematicCamera } from '../components/CinematicCamera';
import { VectorCanvas } from '../components/VectorCanvas';
import { KineticText } from '../components/KineticText';

// SVG markup string for the iconic Bekbek duck
const BEKBEK_DUCK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -100 320 300" width="320" height="300">
  <circle cx="0" cy="0" r="140" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" stroke-width="1.5"/>
  <path d="M-130 95 Q-60 90 0 98 Q70 92 140 95" fill="none" stroke="#49B3FC" stroke-width="3" stroke-linecap="round"/>
  <path d="M-90 115 Q-20 112 40 118 Q100 114 120 115" fill="none" stroke="rgba(73, 179, 252, 0.4)" stroke-width="2" stroke-linecap="round"/>
  <path d="M-90 40 C-115 20 -80 50 -40 85 C20 88 75 70 90 40 C85 10 40 -10 -10 10 Z" fill="#FFD166" stroke="#111111" stroke-width="3"/>
  <circle cx="42" cy="-35" r="48" fill="#FFD166" stroke="#111111" stroke-width="3"/>
  <path d="M75 -28 Q125 -22 115 -10 Q72 -12 75 -28 Z" fill="#FA5D29" stroke="#111111" stroke-width="3"/>
  <circle cx="88" cy="-22" r="2.5" fill="#8E2800"/>
  <circle cx="52" cy="-45" r="11" fill="#111111"/>
  <circle cx="55" cy="-48" r="4" fill="#FFFFFF"/>
  <circle cx="49" cy="-42" r="1.8" fill="#FFFFFF"/>
  <ellipse cx="36" cy="-26" rx="8" ry="5" fill="rgba(250, 93, 41, 0.25)"/>
  <path d="M-50 45 Q-10 32 30 45 Q15 68 -25 70 Z" fill="#FFC043" stroke="#111111" stroke-width="2.5"/>
</svg>`;

export const VectorLivingStage: React.FC = () => {
  const frame = useCurrentFrame();

  // Floating bobbing motion on water
  const bobbingY = Math.sin((frame / 60) * 2 * Math.PI) * 12;
  const rotation = Math.cos((frame / 60) * 2 * Math.PI) * 2.5;

  return (
    <CinematicCamera initialScale={1.0} finalScale={1.04} panX={-15} panY={-8}>
      <TwoLayerStage
        bg="#0B0D13"
        layer0Background={
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="vStageGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#08090E" />
                <stop offset="100%" stopColor="#121625" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#vStageGrad)" />
          </svg>
        }
        layer10Content={
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 24,
            }}
          >
            <div
              style={{
                transform: `translate3d(0, ${bobbingY}px, 0) rotate(${rotation}deg)`,
                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))',
              }}
            >
              <VectorCanvas svgMarkup={BEKBEK_DUCK_SVG} />
            </div>

            <KineticText
              title="BEKVECTOR ENGINE DALAM REMOTION"
              accentWords={['REMOTION']}
              accentColor="#FA5D29"
              subtitle="VEKTOR PROSEDURAL 100% MATEMATIKA · RESOLUSI TAK TERBATAS"
              fontSize={48}
            />
          </div>
        }
      />
    </CinematicCamera>
  );
};
