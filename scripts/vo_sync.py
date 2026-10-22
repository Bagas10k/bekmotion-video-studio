#!/usr/bin/env python3
"""
BekMotion Auto-Voiceover Audio Sync Engine.
Analyzes voiceover audio using ffmpeg silencedetect to compute exact frame transition cues.
"""

import sys
import os
import re
import json
import argparse
import subprocess

def analyze_audio_pauses(audio_path: str, silence_thresh: float = -35.0, silence_duration: float = 0.35, fps: int = 60):
    if not os.path.exists(audio_path):
        print(f"Audio file not found: {audio_path}", file=sys.stderr)
        sys.exit(1)

    cmd = [
        "ffmpeg", "-i", audio_path,
        "-af", f"silencedetect=noise={silence_thresh}dB:d={silence_duration}",
        "-f", "null", "-"
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    stderr = res.stderr

    pauses = []
    starts = re.findall(r"silence_start:\s*([0-9.]+)", stderr)
    ends = re.findall(r"silence_end:\s*([0-9.]+)", stderr)

    for s, e in zip(starts, ends):
        t_start = float(s)
        t_end = float(e)
        pauses.append({
            "silence_start_s": t_start,
            "silence_end_s": t_end,
            "cut_frame": int(round((t_start + t_end) / 2.0 * fps)),
            "duration_s": round(t_end - t_start, 2)
        })

    duration_m = re.search(r"Duration:\s*([0-9:.]+)", stderr)
    total_dur_s = 0.0
    if duration_m:
        parts = duration_m.group(1).split(":")
        total_dur_s = float(parts[0]) * 3600 + float(parts[1]) * 60 + float(parts[2])

    result = {
        "audio_file": audio_path,
        "total_duration_s": round(total_dur_s, 2),
        "total_frames": int(round(total_dur_s * fps)),
        "fps": fps,
        "detected_scenes": len(pauses) + 1,
        "cut_cues": pauses
    }
    return result

def main():
    parser = argparse.ArgumentParser(description="Voiceover Audio Sync Cue Analyzer")
    parser.add_argument("audio", help="Path to voiceover audio file (.mp3, .wav, .m4a)")
    parser.add_argument("--fps", type=int, default=60, help="Target video FPS (default: 60)")
    parser.add_argument("--thresh", type=float, default=-35.0, help="Silence threshold dB (default: -35.0)")
    parser.add_argument("--json", action="store_true", help="Output raw JSON cues")

    args = parser.parse_args()
    data = analyze_audio_pauses(args.audio, silence_thresh=args.thresh, fps=args.fps)

    if args.json:
        print(json.dumps(data, indent=2))
    else:
        print("\n" + "═" * 60)
        print(f" 🎙️  VOICEOVER AUTO-SYNC CUES: {args.audio}")
        print("═" * 60)
        print(f" Total Duration: {data['total_duration_s']}s ({data['total_frames']} frames @ {args.fps} FPS)")
        print(f" Detected Scenes: {data['detected_scenes']}")
        print("─" * 60)
        for idx, cue in enumerate(data['cut_cues']):
            print(f" Scene Transition {idx+1} ➔ Cut at Frame: {cue['cut_frame']} ({cue['silence_start_s']}s)")
        print("═" * 60 + "\n")

if __name__ == "__main__":
    main()
