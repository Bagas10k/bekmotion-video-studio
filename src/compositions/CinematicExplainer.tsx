import React from 'react';
import { Sequence } from 'remotion';
import { TwoLayerStage } from '../components/TwoLayerStage';
import { CinematicCamera } from '../components/CinematicCamera';
import { KineticText } from '../components/KineticText';
import { BlurGlassCard } from '../components/BlurGlassCard';

export const CinematicExplainer: React.FC = () => {
  return (
    <CinematicCamera initialScale={1.0} finalScale={1.06} panX={-25} panY={-12}>
      <TwoLayerStage
        layer0Background={
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="expBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#08090D" />
                <stop offset="100%" stopColor="#141724" />
              </linearGradient>
              <pattern id="gridPat" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#expBg)" />
            <rect width="100%" height="100%" fill="url(#gridPat)" />
          </svg>
        }
        layer10Content={
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {/* Scene 1: Monumental Opening Hook (Frames 0 - 90) */}
            <Sequence from={0} durationInFrames={90}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <KineticText
                  title="REKAYASA SISTEM TANPA KOMPROMI"
                  accentWords={['KOMPROMI']}
                  accentColor="#FA5D29"
                  subtitle="AUTONOMOUS ARCHITECTURE · ZERO AI SLOP"
                  fontSize={72}
                />
              </div>
            </Sequence>

            {/* Scene 2: Interactive Telemetry Card (Frames 90 - 180) */}
            <Sequence from={90} durationInFrames={90}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <BlurGlassCard width={760}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      color: '#49B3FC',
                      letterSpacing: '0.1em',
                    }}
                  >
                    ● NODE TELEMETRY CLUSTER · RUNTIME VERIFIED
                  </div>
                  <h2
                    style={{
                      fontSize: 36,
                      fontWeight: 700,
                      color: '#EDEDED',
                      margin: 0,
                    }}
                  >
                    Performa <span style={{ color: '#10B981' }}>99.98%</span> Bebas Bottleneck
                  </h2>
                  <p
                    style={{
                      fontSize: 16,
                      color: '#8E9AA8',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    Pipeline asinkron berkecepatan milidetik yang memproses jutaan instruksi dalam
                    arsitektur Two-Layer Silhouette berstandar WCAG AAA.
                  </p>
                </BlurGlassCard>
              </div>
            </Sequence>
          </div>
        }
      />
    </CinematicCamera>
  );
};
