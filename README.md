# 🎬 BekMotion Video Studio

> **Cinematic Motion Graphics, Procedural Vector Integration & Auto-Voiceover Sync Studio.**  
> *Developed by **Bagas Cihuy (Bagas Saputra)** with Bikagent (@Bekbekk_bot).*

---

## 🌟 Overview

**BekMotion Video Studio** is an enterprise-grade autonomous motion graphics and video animation framework built on top of **Remotion 4.0**, **React 18**, and **BekVector Engine**. It eliminates boring "slideshow / PPT-style" video presentations by enforcing continuous cinematic camera choreography, procedural mathematical vectors, kinetic typography, and audio-driven scene transitions.

---

## ⚡ Core Superpowers

1. **Anti-PPT Cinematic Camera Rig:** Continuous subtle drift, organic push-ins, and whip transitions across an infinite canvas. No static slides, no lazy fade-only cuts.
2. **BekVector Engine Integration:** Embeds mathematical SVG vectors (splines, cyber seals, mascots, telemetric charts) directly into Remotion compositions with infinite resolution and zero pixel blur.
3. **Dual Aspect Ratio Presets:**
   - **16:9 Landscape (1920×1080 @ 60 FPS):** Ideal for technical explainers, YouTube, and product launch films.
   - **9:16 Portrait (1080×1920 @ 60 FPS):** Engineered for Instagram Reels, TikTok, and YouTube Shorts.
4. **Auto-Voiceover Audio Sync (`scripts/vo_sync.py`):** Automatically analyzes voiceover audio using `ffmpeg silencedetect` to calculate exact frame transition cues.
5. **Two-Layer Silhouette Architecture:** Background procedural vectors and particle meshes stay on Layer 0, while crisp typography and frosted blur-glass cards float on Layer 10 (WCAG AAA $\ge 7:1$).
6. **Hardware-Accelerated Rendering:** Multithreaded concurrent Chromium render pipeline (`remotion.config.ts` with ANGLE OpenGL and H.264 CRF 18).

---

## 📦 Project Structure

```text
bekmotion-video-studio/
├── src/
│   ├── Root.tsx               # Remotion composition registry (16:9, 9:16, Vector)
│   ├── index.ts               # Entry point
│   ├── components/            # Reusable Motion Primitives
│   │   ├── CinematicCamera.tsx# Continuous drift & push-in camera rig
│   │   ├── TwoLayerStage.tsx  # Layer 0 (mesh) + Layer 10 (crisp text)
│   │   ├── VectorCanvas.tsx   # Inline BekVector SVG wrapper
│   │   ├── KineticText.tsx    # Spring physics headline & keyword accents
│   │   └── BlurGlassCard.tsx  # Frosted glass panel with 1px hairline border
│   └── compositions/          # Ready-to-Render Video Scenes
│       ├── CinematicExplainer.tsx  # 16:9 Tech Explainer
│       ├── ReelsStory.tsx          # 9:16 Vertical Story
│       └── VectorLivingStage.tsx   # BekVector Mascot & Telemetry Showcase
├── scripts/
│   ├── vo_sync.py             # Audio silence detector & frame cue analyzer
│   └── render_cli.py          # High-speed CLI video compiler
├── tests/                     # Automated integration tests
├── remotion.config.ts         # Optimized Chromium GPU flags
└── package.json               # Dependencies & scripts
```

---

## 🚀 Quickstart

### 1. Installation

```bash
git clone https://github.com/Bagas10k/bekmotion-video-studio.git
cd bekmotion-video-studio
npm install
```

### 2. Launch Interactive Remotion Studio

```bash
npm run studio
# Opens web studio preview at http://localhost:3370
```

### 3. Render High-Resolution Videos via CLI

```bash
# Render 16:9 Landscape Explainer
npm run render:16x9

# Render 9:16 Vertical Reels/TikTok Story
npm run render:9x16

# Render BekVector Procedural Integration Showcase
npm run render:vector
```

---

## 🎙️ Auto-Voiceover Sync CLI

Automatically calculate exact scene cut timestamps from any voiceover audio:

```bash
python3 scripts/vo_sync.py voiceover.mp3 --fps 60
```

Sample output:
```text
════════════════════════════════════════════════════════════
 🎙️  VOICEOVER AUTO-SYNC CUES: voiceover.mp3
════════════════════════════════════════════════════════════
 Total Duration: 42.5s (2550 frames @ 60 FPS)
 Detected Scenes: 5
────────────────────────────────────────────────────────────
 Scene Transition 1 ➔ Cut at Frame: 480 (8.0s)
 Scene Transition 2 ➔ Cut at Frame: 960 (16.0s)
 Scene Transition 3 ➔ Cut at Frame: 1560 (26.0s)
 Scene Transition 4 ➔ Cut at Frame: 2040 (34.0s)
════════════════════════════════════════════════════════════
```

---

## 🧪 Testing

```bash
npm test
# 100% passing integration tests
```

---

## 📜 License

MIT License © 2026 Bagas Cihuy (Bagas Saputra).
