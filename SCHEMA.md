# Thai Dai — Question & Step Schema (v2)

Active-recall architecture. The guiding rule is **strict separation of target and clue**:
the learner is tested on Thai script / audio, and English + romanization are *hints*, never
answer surfaces.

## 1. Scaffolding Modes (persistent, per user)

Stored in `localStorage.thaiDaiScaffold` (`1` | `2` | `3`), default **2**.

| Level | Name | Thai script | Romanization | English | Audio |
|---|---|---|---|---|---|
| 1 | Novice | ✅ | ✅ visible | 🗂 in a collapsible drawer | ✅ |
| 2 | Standard (default) | ✅ | 👁 behind "Peek" | 👁 behind "Peek" | ✅ |
| 3 | Strict | ✅ | ❌ | ❌ | ✅ |

- "Peek" (eye icon) reveals romanization + translation for the current card and tags the step
  **for review** (tracked in `stepSession.peekCount`).
- Peek is only offered in **Standard** mode. Strict mode has no romanization and no English,
  on answer buttons or anywhere else.

## 2. Step Types

| type | phase | scored | purpose |
|---|---|---|---|
| `presentation` | explore | ❌ | input / shadowing |
| `tone_discrimination` | drill | ✅ | audio-only → identify pitch contour |
| `minimal_pair` | drill | ✅ | audio-only → pick the correct Thai spelling |
| `morphology` | drill | ✅ | build a compound from root tiles |
| `sentence_assembler` | drill | ✅ | reorder Thai word tiles |
| `scrambled_syllable` | drill | ✅ | legacy: reorder phonetic syllables (speak-only) |
| `audio_comprehension` | assess | ✅ | hear audio → pick the Thai sentence |
| `contextual_match` | assess | ✅ | scenario → Thai-only options |

`stepIsScored(type)` returns `true` for every type except `presentation`.

## 3. Common Fields

```jsonc
{
  "stepId": "s6-listen",
  "type": "audio_comprehension",
  "phase": "assess",                    // explore | drill | assess

  // target — never English, never romanized on the answer surface
  "thai": "ขอบคุณครับ",                 // target Thai (read & write track)
  "tts": "ขอบคุณครับ",                  // what the narrator speaks (th-TH)
  "audioUrl": "/audio/x.mp3",           // optional real recording (falls back to TTS)

  // clues — LAZY, gated by scaffolding mode + Peek
  "hints": {
    "romanized": "khòp-khun kráp",      // Paiboon/RTGS with tone marks
    "translation": "Thank you (male)"   // English meaning
  }
}
```

Legacy top-level `romanized` / `translation` / `explanation` fields are still accepted and
normalized to `hints` at render time (`stepHints()` / `optHints()`).

## 4. Per-Type Shapes

### presentation
```jsonc
{ "type": "presentation", "phase": "explore", "thai": "ขอบคุณครับ", "tts": "ขอบคุณครับ",
  "hints": { "romanized": "khòp-khun kráp", "translation": "Thank you (male)" },
  "note": "ครับ (kráp) is the polite male particle." }
```

### tone_discrimination
```jsonc
{ "type": "tone_discrimination", "phase": "drill", "prompt": "Listen. What tone is it?",
  "tts": "ครับ", "correctTone": "high", "syllable": "kráp",
  "hints": { "romanized": "kráp", "translation": "polite particle (male)" },
  "options": [
    { "id": "mid", "label": "Mid", "contour": "ˉ" },
    { "id": "low", "label": "Low", "contour": "ˋ" },
    { "id": "high", "label": "High", "contour": "ˊ" },
    { "id": "falling", "label": "Falling", "contour": "ˆ" },
    { "id": "rising", "label": "Rising", "contour": "ˇ" }
  ] }
```

### minimal_pair
```jsonc
{ "type": "minimal_pair", "phase": "drill", "prompt": "Which word did you hear?",
  "tts": "ค่ะ", "correctIndex": 0,
  "hints": { "romanized": "khâ vs khá", "translation": "particle pair" },
  "options": [
    { "thai": "ค่ะ", "hints": { "romanized": "khâ (falling)", "translation": "polite particle" } },
    { "thai": "คะ",  "hints": { "romanized": "khá (high)",    "translation": "question particle" } }
  ] }
```

### morphology (Lego builder)
```jsonc
{ "type": "morphology", "phase": "drill", "prompt": "Construct the word for 'Restroom'.",
  "compound": "ห้องน้ำ", "correctRoots": [0, 1],
  "hints": { "romanized": "hâwng-náam", "translation": "Restroom" },
  "roots": [
    { "thai": "ห้อง", "meaning": "room" },
    { "thai": "น้ำ", "meaning": "water" },
    { "thai": "เย็น", "meaning": "cold" },   // distractor
    { "thai": "กิน", "meaning": "eat" }       // distractor
  ] }
```
Root `meaning` labels reinforce compound derivation; hidden in Strict mode.

### sentence_assembler
```jsonc
{ "type": "sentence_assembler", "phase": "drill", "prompt": "No sugar, please (male).",
  "tts": "ขอไม่ใส่น้ำตาลครับ", "correctSequence": [0, 1, 2, 3],
  "hints": { "romanized": "khǒr mâi sài nám-taan kráp", "translation": "No sugar, please" },
  "tiles": [
    { "thai": "ขอ",     "hints": { "romanized": "khǒr",     "translation": "please / would like" } },
    { "thai": "ไม่ใส่", "hints": { "romanized": "mâi sài",  "translation": "don't add" } },
    { "thai": "น้ำตาล", "hints": { "romanized": "nám-taan", "translation": "sugar" } },
    { "thai": "ครับ",   "hints": { "romanized": "kráp",     "translation": "polite particle (male)" } }
  ] }
```

### audio_comprehension
```jsonc
{ "type": "audio_comprehension", "phase": "assess",
  "prompt": "Listen and choose what you heard.", "tts": "ขอบคุณมากครับ", "correctIndex": 0,
  "hints": { "romanized": "khòp-khun mâak kráp", "translation": "Thank you very much (male)" },
  "options": [
    { "thai": "ขอบคุณมากครับ", "hints": { "romanized": "...", "translation": "..." } },
    { "thai": "ขอโทษครับ",     "hints": { "romanized": "...", "translation": "..." } },
    { "thai": "สวัสดีครับ",    "hints": { "romanized": "...", "translation": "..." } }
  ] }
```

### contextual_match
```jsonc
{ "type": "contextual_match", "phase": "assess",
  "scenario": "A clerk hands you your change. How do you say thank you?", "correctIndex": 0,
  "hints": { "romanized": "khòp-khun kráp", "translation": "Thank you (male)" },
  "options": [
    { "thai": "ขอบคุณครับ", "hints": { "romanized": "...", "translation": "..." } },
    { "thai": "สวัสดีครับ", "hints": { "romanized": "...", "translation": "..." } },
    { "thai": "ขอโทษครับ", "hints": { "romanized": "...", "translation": "..." } }
  ] }
```

### scrambled_syllable (legacy, speak-only)
```jsonc
{ "type": "scrambled_syllable", "phase": "drill", "prompt": "Assemble: 'Hello'.",
  "correctSequence": ["sà", "wàt", "dii"], "hints": { "romanized": "sà-wàt-dii", "translation": "Hello" },
  "bank": [ { "id": "s1", "text": "sà", "tone": "low", "contour": "ˋ" } ] }
```

## 5. Target vs Clue Rules (enforced)

1. **English prompt → Thai-only options.** If the prompt is English, answer buttons render
   `thai` only — no romanized subtitle, no English subtitle.
2. **Thai / audio prompt → semantic distractors.** Distractors are other real Thai items from
   the same lesson, so matching is semantic, not superficial.
3. **Option hints are lazy.** Each option carries `hints.{romanized,translation}` but they are
   only revealed via Peek (Standard) or a drawer (Novice), never rendered on the button.

## 6. Lesson Loop (state machine)

Each unit lesson runs three phases, tagged per step:

1. **Explore** — `presentation` (dialogue + tap-to-inspect word breakdown). Never scored.
2. **Drill** — `tone_discrimination`, `minimal_pair`, `morphology`, `sentence_assembler`.
3. **Assessment** — `audio_comprehension`, `contextual_match` (rapid-fire audio + context).

The read-mode converter auto-generates `presentation → tone_discrimination → audio_comprehension`
for every exercise; curated lesson 1 demonstrates all eight types.
