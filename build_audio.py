#!/usr/bin/env python3
"""Generate Thai audio files (edge-tts, th-TH-PremwadeeNeural) for every Thai
word/phrase in the Thai Dai curriculum, and write the lookup map."""
import re, os, asyncio, json, sys

ROOT = "/root/thai-dai-audit"
AUDIO_DIR = os.path.join(ROOT, "audio")
os.makedirs(AUDIO_DIR, exist_ok=True)

# collect raw text from data-bearing files
learn = open(os.path.join(ROOT, "learn.html"), encoding="utf-8").read()
sr = open(os.path.join(ROOT, "session-runner.js"), encoding="utf-8").read()
text = learn + "\n" + sr

# capture Thai strings from thai/tts fields (JSON double-quoted, JS double-quoted,
# and thaiDict single-quoted)
pat = (
    r'["\']?(?:thai|tts)["\']?\s*:\s*["\']'
    r'([\u0E00-\u0E7F][\u0E00-\u0E7F\s]*?)["\']'
)
thai_strings = set()
for m in re.findall(pat, text):
    s = m.strip()
    if s:
        thai_strings.add(s)

# drop over-long/odd captures and pure-whitespace
thai_strings = {s for s in thai_strings if 1 <= len(s) <= 60}
ordered = sorted(thai_strings)
print(f"distinct Thai strings: {len(ordered)}", flush=True)

VOICE = "th-TH-PremwadeeNeural"
MAP = {}

async def gen(text_, path):
    import edge_tts
    for attempt in range(3):
        try:
            c = edge_tts.Communicate(text_, VOICE)
            await c.save(path)
            if os.path.exists(path) and os.path.getsize(path) > 0:
                return True
        except Exception:
            pass
        await asyncio.sleep(0.8)
    return False

async def main():
    for i, s in enumerate(ordered):
        fn = f"w{i:04d}.mp3"
        p = os.path.join(AUDIO_DIR, fn)
        if os.path.exists(p) and os.path.getsize(p) > 0:
            MAP[s] = f"audio/{fn}"
            continue
        try:
            ok = await gen(s, p)
            if ok:
                MAP[s] = f"audio/{fn}"
            else:
                print(f"  FAIL {s!r}", flush=True)
        except Exception as e:
            print(f"  FAIL {s!r}: {e}", flush=True)
        await asyncio.sleep(0.25)
        if (i + 1) % 25 == 0:
            print(f"  {i+1}/{len(ordered)}", flush=True)
    # write map
    body = ",\n".join(f'  {json.dumps(k, ensure_ascii=False)}: {json.dumps(v)}' for k, v in sorted(MAP.items()))
    map_js = "window.THAI_AUDIO = {\n" + body + "\n};\n"
    with open(os.path.join(ROOT, "thai-audio-map.js"), "w", encoding="utf-8") as f:
        f.write(map_js)
    print(f"wrote {len(MAP)} audio files + thai-audio-map.js", flush=True)

asyncio.run(main())
