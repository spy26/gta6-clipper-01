# CLIP.md — gta6-clipper-01 clip spec

## Source

- **Footage:** Grand Theft Auto VI — Trailer 2 (Rockstar Games, official trailer).
- **Downloaded in-session (20 Nov 2026) from archive.org:**
  `https://archive.org/download/gtavi-trailer-2_20250506/GTAVI_Trailer_2_H264.mp4`
  (item `gtavi-trailer-2_20250506`, 3840x2160, 30fps, 2:47 / 166.741s,
  733,071,339 bytes, sha256
  `c46733b3c92d805e85c2615ea95051a89b1fe4a6947bd3589936e176bc8d562f`).
  YouTube was unreachable from the build VM, so the reachable archive.org
  copy of the same official trailer was used. No other footage was used.
- **Render script:** `clip/render.sh` (in the work directory, next to the
  finished clip `clip/gta6-clipper-final.mp4`).

## The cut — one continuous moment, trailer 126.0s → 166.741s (40.7s)

| Clip time | Trailer time | What is on screen |
|---:|---:|---|
| 0.0–0.7s | 126–126.7s | Ocean Drive in daylight — Dominion Hotel, sports cars, crowds. Hook text starts here. |
| 0.7–5s | 126.7–131s | Neon Vice City nightclub, pink lights. Hook text continues. |
| ~5–7s | 131–133s | Living room: TV showing a gun-store ad, beer bottles on the table. |
| ~7–13s | 133–139s | Lucia at home in her orange vest; Jason on the couch. |
| ~13–18s | 139–144s | Helicopter + jetski chase through the swamps; Jason on his bike under a seaplane. Mid-clip text here. |
| ~18–23s | 144–149s | Night city, embrace, boat + helicopter, dusk street chase ("South Beach" sign). |
| ~23–28s | 149–154s | Lucia driving; golden sunset highway aerial over the bridge. |
| ~28–35s | 154–161s | Black; the neon VI logo draws itself in and fills with sunset. |
| ~35–40.7s | 161–166.7s | "GRAND THEFT AUTO VI — MAY 26, 2026" title card, then the Rockstar logo. End card text here. |

Why this moment: it opens on the brightest, most instantly-readable Vice
City image (Ocean Drive), builds through the chase, and ends on the official
logo reveal — the payoff every GTA fan recognises — so the Short has a hook,
a middle, and a natural ending instead of stopping mid-scene.

## Overlays (on-screen text pitch, no voiceover)

Font files present on the build VM:
Noto Sans Condensed Black
(`/usr/share/fonts/truetype/noto/NotoSans-CondensedBlack.ttf`) for the hook
and mid line; DejaVu Sans Bold
(`/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf`) for the end card.
White text, black stroke, centred, clear of YouTube's bottom ~200px and
right edge.

| Time (clip) | Text | Size | Position |
|---|---|---|---|
| 0–2.5s | `GTA 6 IS REAL` | 140 | top, y=200 |
| 14–17s | `MY AI AGENT CUT THIS CLIP` | 80 | lower third, y=1480 |
| 34.7–40.7s | `MAKE CLIPS LIKE THIS WITH AI` | 54 | y=1420 |
| 34.7–40.7s | `AND EARN MONEY ON MAKE.FUN` | 54 | y=1495 |
| 34.7–40.7s | `make.fun/bounty/gta6-clipper-01` | 40 | y=1580 |
| 34.7–40.7s | `PLAY CODE: makefun-pansy-aspen-cello` | 38 | y=1655 |

Play code (verified live for this competition): `makefun-pansy-aspen-cello`.

## Render settings

- **Output:** `clip/gta6-clipper-final.mp4`, 1080x1920 vertical, 30fps,
  H.264 (libx264, CRF 20, preset medium, yuv420p), AAC audio copied
  untouched from the trailer.
- **Verticalize:** blur-fill — the 16:9 frame is scaled to 1080 wide and
  blurred (sigma 25) as the backdrop; the sharp 16:9 frame (1080x608) is
  overlaid centred. Light grade: backdrop saturation 1.1, foreground
  saturation 1.15 / contrast 1.05.
- **ffmpeg filter (from `clip/render.sh`):** trim 126→166.741, setpts reset,
  fps 30, split into blurred backdrop + sharp foreground, overlay centred,
  then the six drawtext overlays above. A semi-transparent black band
  (drawbox, black@0.55, y=1400–1720, only 34.7–40.7s) sits behind the four
  end-card lines so they stay readable over the bright title-card frame.

## Verification

- ffprobe on the finished clip (run by `clip/render.sh` after encoding):
  H.264 video 1080x1920, 30/1 fps; AAC audio; duration 40.746667s;
  size 18,592,147 bytes; overall bit rate 3,650,290 bit/s.
- Frame checks (extracted from the finished clip and looked at):
  - t=1s (hook): "GTA 6 IS REAL" in big white type with a black stroke at
    the top, over the pink neon nightclub — sharp, high contrast.
  - t=15.5s (mid): Jason and Lucia on the jetski mid-chase, "MY AI AGENT
    CUT THIS CLIP" at the bottom over the blurred backdrop — readable.
  - t=37s (end card): "GRAND THEFT AUTO VI / MAY 26, 2026" title card
    centred; below it the dark band carries all four end-card lines
    (pitch, bounty URL, play code) — all four lines legible.
