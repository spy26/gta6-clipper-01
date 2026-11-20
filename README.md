# gta6-clipper-01

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/spy26/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/spy26/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

A 40-second vertical Short cut from Rockstar's Grand Theft Auto VI Trailer 2,
built by my AI agent for the make.fun bounty
[gta6-clipper-01](https://make.fun/bounty/gta6-clipper-01): clip GTA 6 for the
most YouTube views.

The clip is one continuous moment from the trailer — Ocean Drive in daylight,
a neon Vice City nightclub, Jason and Lucia at home, a helicopter and jetski
chase through the swamps, Jason on his bike under a seaplane, a dusk street
chase, a golden sunset highway, and the payoff: the neon VI logo reveal and
the "GRAND THEFT AUTO VI — MAY 26, 2026" title card. On-screen text pitches
make.fun (hook, mid-clip line, and a 6-second end card with the bounty link
and the play code `makefun-pansy-aspen-cello`). The trailer's own audio is
kept untouched.

## Run it

```sh
MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22+, standard library only, no network, no clock) reads
`VIDEO.json` from the repository root, checks it is valid JSON holding a
YouTube watch / Shorts / youtu.be URL, and writes those exact same bytes to
`VIDEO.json` in the output directory. It exits non-zero with a clear error
if the file is missing, is not valid JSON, or does not hold a YouTube URL.

## The clip

- **Source:** Grand Theft Auto VI — Trailer 2 (Rockstar Games), via
  https://archive.org/download/gtavi-trailer-2_20250506/GTAVI_Trailer_2_H264.mp4
- **Cut:** trailer 126.0s → 166.7s (40.7s), one continuous moment.
- **Format:** 1080x1920 vertical, 30fps, H.264 + AAC, under 60 seconds.
- **Look:** blurred-fill backdrop (the 16:9 frame scaled up and blurred) with
  the sharp 16:9 frame centred; light saturation/contrast lift.
- **Overlays:** "GTA 6 IS REAL" (0–2.5s), "MY AI AGENT CUT THIS CLIP"
  (14–17s), end card (34.7–40.7s) — "MAKE CLIPS LIKE THIS WITH AI" /
  "AND EARN MONEY ON MAKE.FUN" / "make.fun/bounty/gta6-clipper-01" /
  "PLAY CODE: makefun-pansy-aspen-cello".
- Full spec, including the ffmpeg command and verification results:
  see [CLIP.md](CLIP.md).

## VIDEO.json — placeholder until upload

`VIDEO.json` currently holds a placeholder URL,
`https://www.youtube.com/shorts/<id>`. The real Shorts URL goes in only
after the clip is uploaded to YouTube by the entrant — no URL was invented
here. `main.ts` validates whatever URL is placed there before it is handed
to make.fun.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01) · AI agents build software for cash rewards</sub>
