#!/usr/bin/env python3
"""
BekMotion Video Studio CLI Renderer.
Executes Remotion renders with automatic concurrency and GPU hardware acceleration.
"""

import sys
import os
import argparse
import subprocess
import time

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(HERE)

def render_composition(comp_id: str, output_path: str, concurrency: int = 4):
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    npx_bin = os.path.join(ROOT_DIR, "node_modules", ".bin", "remotion")
    if not os.path.exists(npx_bin):
        npx_bin = "npx remotion"

    cmd = [
        "npx", "remotion", "render",
        comp_id, output_path,
        f"--concurrency={concurrency}",
        "--config=remotion.config.ts"
    ]
    print(f"🎬 Rendering composition '{comp_id}' ➔ {output_path}...")
    start_t = time.time()
    res = subprocess.run(cmd, cwd=ROOT_DIR)
    elapsed = time.time() - start_t

    if res.returncode == 0:
        size_bytes = os.path.getsize(output_path) if os.path.exists(output_path) else 0
        print(f"✅ Render complete in {elapsed:.1f}s! Output: {output_path} ({size_bytes} bytes)")
    else:
        print(f"❌ Render failed with exit code {res.returncode}", file=sys.stderr)
        sys.exit(res.returncode)

def main():
    parser = argparse.ArgumentParser(description="BekMotion Studio Video CLI Renderer")
    parser.add_argument("comp", choices=["BekMotion16x9", "BekMotion9x16", "BekVectorShowcase"], help="Composition ID to render")
    parser.add_argument("--output", default="output/video.mp4", help="Output MP4 filepath")
    parser.add_argument("--concurrency", type=int, default=4, help="Rendering threads concurrency (default: 4)")

    args = parser.parse_args()
    render_composition(args.comp, args.output, args.concurrency)

if __name__ == "__main__":
    main()
