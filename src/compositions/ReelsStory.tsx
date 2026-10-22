import React from 'react';
import { Sequence } from 'remotion';
import { TwoLayerStage } from '../components/TwoLayerStage';
import { CinematicCamera } from '../components/CinematicCamera';
import { KineticText } from '../components/KineticText';
import { BlurGlassCard } from '../components/BlurGlassCard';

export const ReelsStory: React.FC = () => {
  return (
    <CinematicCamera initialScale={1.0} finalScale={1.05} panX={0} panY={-20}>
      <TwoLayerStage
        bg="#090B10"
        layer0Background={
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="reelsBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06070A" />
                <stop offset="50%" stopColor="#10131F" />
                <stop offset="100%" stopColor="#221828" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#reelsBg)" />
          </svg>
        }
        layer10Content={
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0 48px',
            }}
          >
            <Sequence from={0} durationInFrames={120}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 14,
                    color: '#FA5D29',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    border: '1px solid rgba(250, 93, 41, 0.3)',
                    padding: '6px 16px',
                    borderRadius: 999,
                  }}
                >
                  ● BEKMOTION REELS 2026
                </div>

                <KineticText
                  title="RAHASIA SOFTWARE KASTA ATAS"
                  accentWords={['KASTA', 'ATAS']}
                  accentColor="#FA5D29"
                  subtitle="TIGA DNA IDENTIK: BLUR GLASS · EASING · MORPHING"
                  fontSize={84}
                />

                <BlurGlassCard width={920} padding={48}>
                  <p
                    style={{
                      fontSize: 28,
                      color: '#EDEDED',
                      lineHeight: 1.5,
                      textAlign: 'center',
                      margin: 0,
                    }}
                  >
                    Bukan sekadar animasi biasa, tapi gerakan fluida 60 FPS yang memberi bobot
                    fisik pada setiap interaksi digital.
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
