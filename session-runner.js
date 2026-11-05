/* ============================================================
   Thai Dai — Step-based lesson engine (active acquisition, v2)
   ============================================================
   Step types:
     presentation          (explore) — never scored
     tone_discrimination   (drill)   — audio-only, identify pitch contour
     minimal_pair           (drill)   — audio-only, pick the Thai spelling
     morphology             (drill)   — build a compound from root tiles
     sentence_assembler     (drill)   — reorder Thai word tiles
     scrambled_syllable     (drill)   — legacy, reorder phonetic syllables (speak-only)
     audio_comprehension    (assess)  — hear audio, pick the Thai sentence
     contextual_match       (assess)  — scenario, Thai-only options

   Scaffolding modes (persistent, per user):
     1 = Novice      — Thai + tone-marked romanization; English in a drawer
     2 = Standard    — Thai only; romanization/translation behind "Peek" (review-tagged)
     3 = Strict      — Thai + audio only; zero romanization, zero English

   Score rule: presentation is NEVER scored. Peeking tags the step for review.
   ============================================================ */

// ---- curated lesson 1 (demonstrates every question type) ----
window.STEP_LESSONS = {
  1: {
    unitId: "unit-1",
    unitTitle: "Street Survival & Politeness",
    lessonId: "lesson-1-golden-words",
    lessonTitle: "The Golden Words",
    steps: [
      {
        stepId: "s1-intro", type: "presentation", phase: "explore",
        thai: "ขอบคุณครับ", tts: "ขอบคุณครับ",
        hints: { romanized: "khòp-khun kráp", translation: "Thank you (polite male)" },
        note: "ครับ (kráp) is the polite male particle; ค่ะ (khâ) is the female form."
      },
      {
        stepId: "s2-minimal-pair", type: "minimal_pair", phase: "drill",
        prompt: "Listen. Which word did you hear?", tts: "ค่ะ",
        hints: { romanized: "khâ vs khá", translation: "polite particle vs question particle" },
        options: [
          { thai: "ค่ะ", hints: { romanized: "khâ (falling)", translation: "polite particle (female)" } },
          { thai: "คะ",  hints: { romanized: "khá (high)",    translation: "question particle (female)" } }
        ],
        correctIndex: 0
      },
      {
        stepId: "s3-tone", type: "tone_discrimination", phase: "drill",
        prompt: "Listen. What tone is it?", tts: "ครับ",
        hints: { romanized: "kráp", translation: "polite particle (male)" },
        syllable: "kráp", correctTone: "high",
        options: [
          { id: "mid",     label: "Mid",     contour: "ˉ" },
          { id: "low",     label: "Low",     contour: "ˋ" },
          { id: "high",    label: "High",    contour: "ˊ" },
          { id: "falling", label: "Falling", contour: "ˆ" },
          { id: "rising",  label: "Rising",  contour: "ˇ" }
        ]
      },
      {
        stepId: "s4-assemble", type: "sentence_assembler", phase: "drill",
        prompt: "No sugar, please (male speaker).", tts: "ขอไม่ใส่น้ำตาลครับ",
        hints: { romanized: "khǒr mâi sài nám-taan kráp", translation: "No sugar, please (male)" },
        tiles: [
          { thai: "ขอ",     hints: { romanized: "khǒr",      translation: "please / would like" } },
          { thai: "ไม่ใส่", hints: { romanized: "mâi sài",   translation: "don't add" } },
          { thai: "น้ำตาล", hints: { romanized: "nám-taan",  translation: "sugar" } },
          { thai: "ครับ",   hints: { romanized: "kráp",      translation: "polite particle (male)" } }
        ],
        correctSequence: [0, 1, 2, 3]
      },
      {
        stepId: "s5-morphology", type: "morphology", phase: "drill",
        prompt: "Construct the word for \u2018Restroom\u2019.", compound: "ห้องน้ำ",
        hints: { romanized: "hâwng-náam", translation: "Restroom" },
        roots: [
          { thai: "ห้อง", meaning: "room" },
          { thai: "น้ำ", meaning: "water" },
          { thai: "เย็น", meaning: "cold" },
          { thai: "กิน", meaning: "eat" }
        ],
        correctRoots: [0, 1]
      },
      {
        stepId: "s6-listen", type: "audio_comprehension", phase: "assess",
        prompt: "Listen and choose what you heard.", tts: "ขอบคุณมากครับ",
        hints: { romanized: "khòp-khun mâak kráp", translation: "Thank you very much (male)" },
        options: [
          { thai: "ขอบคุณมากครับ", hints: { romanized: "khòp-khun mâak kráp", translation: "Thank you very much (male)" } },
          { thai: "ขอโทษครับ",     hints: { romanized: "khǎaw-thôot kráp",    translation: "Sorry / Excuse me (male)" } },
          { thai: "สวัสดีครับ",    hints: { romanized: "sà-wàt-dii kráp",     translation: "Hello (male)" } }
        ],
        correctIndex: 0
      },
      {
        stepId: "s7-context", type: "contextual_match", phase: "assess",
        scenario: "A 7-Eleven clerk hands you your change and receipt. How do you politely say thank you?",
        hints: { romanized: "khòp-khun kráp", translation: "Thank you (polite male)" },
        options: [
          { thai: "ขอบคุณครับ", hints: { romanized: "khòp-khun kráp", translation: "Thank you (polite male)" } },
          { thai: "สวัสดีครับ", hints: { romanized: "sà-wàt-dii kráp", translation: "Hello (male)" } },
          { thai: "ขอโทษครับ", hints: { romanized: "khǎaw-thôot kráp", translation: "Sorry / Excuse me (male)" } }
        ],
        correctIndex: 0
      }
    ]
  }
};

// ---- tone table ----
const STEP_TONES = {
  mid:     { label: "Mid",     contour: "ˉ" },
  low:     { label: "Low",     contour: "ˋ" },
  high:    { label: "High",    contour: "ˊ" },
  falling: { label: "Falling", contour: "ˆ" },
  rising:  { label: "Rising",  contour: "ˇ" }
};

const STEP_TONE_OPTS = [
  { id: "mid",     label: "Mid",     contour: "ˉ" },
  { id: "low",     label: "Low",     contour: "ˋ" },
  { id: "high",    label: "High",    contour: "ˊ" },
  { id: "falling", label: "Falling", contour: "ˆ" },
  { id: "rising",  label: "Rising",  contour: "ˇ" }
];

const STEP_PHASES = { explore: "Explore", drill: "Drill", assess: "Assessment" };

// ---- session state ----
const stepSession = {
  lessonId: null,
  soIndex: undefined,
  steps: [],
  index: 0,
  correct: 0,
  totalScored: 0,
  answered: false,
  peeked: false,
  peekCount: 0,
  userSequence: [],
  selectedRoots: [],
  bankItems: [],
  tiles: [],
  correctSeq: [],
  correctRoots: []
};

function stepIsScored(type) {
  return ["tone_discrimination", "minimal_pair", "morphology", "sentence_assembler",
          "scrambled_syllable", "audio_comprehension", "contextual_match"].indexOf(type) >= 0;
}

function stepShuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

// ---- hints: accepts new {hints:{romanized,translation}} or legacy top-level fields ----
function stepHints(step) {
  if (step && step.hints) return { romanized: step.hints.romanized || "", translation: step.hints.translation || "" };
  return { romanized: (step && step.romanized) || "", translation: (step && step.translation) || "" };
}
function optHints(o) {
  if (o && o.hints) return { romanized: o.hints.romanized || "", translation: o.hints.translation || "" };
  return { romanized: (o && o.romanized) || "", translation: (o && o.explanation) || "" };
}

// ---- scaffolding mode ----
function stepModeLevel() {
  try {
    const m = parseInt(localStorage.getItem("thaiDaiScaffold") || "2", 10);
    return (m === 1 || m === 2 || m === 3) ? m : 2;
  } catch (e) { return 2; }
}
function stepSetMode(m) {
  try { localStorage.setItem("thaiDaiScaffold", String(m)); } catch (e) {}
  stepRender();
}
function stepApplyModeClass() {
  const modal = document.getElementById("lessonModal");
  if (!modal) return;
  modal.classList.remove("mode-1", "mode-2", "mode-3");
  modal.classList.add("mode-" + stepModeLevel());
}
function stepPeek() {
  stepSession.peeked = !stepSession.peeked;
  if (stepSession.peeked) stepSession.peekCount++;
  const card = document.querySelector(".step-card");
  if (card) card.classList.toggle("peeked", stepSession.peeked);
  const btn = document.getElementById("peekBtn");
  if (btn) btn.classList.toggle("active", stepSession.peeked);
}

// ---- audio (TTS fallback; swap for audioUrl playback when files exist) ----
function stepSpeak(text, rate) {
  if (!text || !("speechSynthesis" in window)) return;
  try { window.speechSynthesis.cancel(); } catch (e) {}
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "th-TH";
  u.rate = rate || 0.9;
  u.pitch = 1;
  u.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  const th = voices.find(function (v) { return (v.lang || "").toLowerCase().indexOf("th") === 0; });
  if (th) u.voice = th;
  window.speechSynthesis.speak(u);
}

// ---- controller ----
function stepStartLesson(id) {
  const lesson = window.STEP_LESSONS[id];
  if (!lesson) return;
  stepSession.soIndex = undefined;
  stepSession.lessonId = id;
  stepSession.steps = lesson.steps;
  stepSession.index = 0;
  stepSession.correct = 0;
  stepSession.peekCount = 0;
  stepSession.totalScored = lesson.steps.filter(function (s) { return stepIsScored(s.type); }).length;
  stepSession.answered = false;
  stepSession.userSequence = [];
  try {
    const saved = JSON.parse(sessionStorage.getItem("thaiDaiStepSession") || "null");
    if (saved && saved.lessonId === id && saved.index > 0 && saved.index < lesson.steps.length) {
      stepSession.index = saved.index;
    }
  } catch (e) {}
  const hearts = document.querySelector(".lesson-hearts");
  if (hearts) hearts.style.display = "none";
  document.getElementById("lessonModal").classList.add("active");
  document.body.classList.add("modal-open");
  stepApplyModeClass();
  stepRender();
}

function stepPersistSave() {
  try { sessionStorage.setItem("thaiDaiStepSession", JSON.stringify({ lessonId: stepSession.lessonId, index: stepSession.index })); } catch (e) {}
}
function stepPersistClear() {
  try { sessionStorage.removeItem("thaiDaiStepSession"); } catch (e) {}
}

function stepRender() {
  const step = stepSession.steps[stepSession.index];
  const area = document.querySelector(".exercise-area");
  const footer = document.querySelector(".lesson-footer");
  stepApplyModeClass();
  stepSession.answered = false;
  stepSession.peeked = false;
  stepSession.userSequence = [];
  stepSession.selectedRoots = [];
  document.getElementById("progressFill").style.width = Math.round((stepSession.index / stepSession.steps.length) * 100) + "%";

  area.innerHTML = stepToolbar(step) + stepCardHTML(step);

  if (step.type === "presentation") {
    footer.innerHTML = '<button class="btn btn-primary" id="stepNextBtn" onclick="stepAdvance()">Continue →</button>';
  } else if (step.type === "scrambled_syllable" || step.type === "sentence_assembler" || step.type === "morphology") {
    footer.innerHTML = '<button class="btn btn-primary" id="stepNextBtn" onclick="stepCheckBuilder()" disabled>Check</button>';
  } else {
    footer.innerHTML = '<button class="btn btn-primary" id="stepNextBtn" onclick="stepAdvance()" disabled>Continue →</button>';
  }
  if (window.lucide) lucide.createIcons();
  stepPersistSave();
}

function stepCardHTML(step) {
  switch (step.type) {
    case "presentation":         return stepHTMLPresentation(step);
    case "tone_discrimination":  return stepHTMLTone(step);
    case "minimal_pair":         return stepHTMLMinimalPair(step);
    case "morphology":           return stepHTMLMorphology(step);
    case "sentence_assembler":   return stepHTMLAssembler(step);
    case "scrambled_syllable":   return stepHTMLScrambled(step);
    case "audio_comprehension":  return stepHTMLAudioComp(step);
    case "contextual_match":     return stepHTMLContextual(step);
    default:                     return '<div class="step-card"></div>';
  }
}

function stepToolbar(step) {
  const ph = step.phase || "drill";
  const m = stepModeLevel();
  const h = stepHints(step);
  const peekAllowed = m === 2 && (h.romanized || h.translation);
  return '<div class="step-toolbar">' +
    '<span class="phase-badge phase-' + ph + '">' + (STEP_PHASES[ph] || "Drill") + '</span>' +
    '<div class="scaffold-seg">' +
      '<button class="scaffold-btn' + (m === 1 ? " active" : "") + '" data-mode="1" onclick="stepSetMode(1)">Novice</button>' +
      '<button class="scaffold-btn' + (m === 2 ? " active" : "") + '" data-mode="2" onclick="stepSetMode(2)">Standard</button>' +
      '<button class="scaffold-btn' + (m === 3 ? " active" : "") + '" data-mode="3" onclick="stepSetMode(3)">Strict</button>' +
    '</div>' +
    (peekAllowed
      ? '<button class="peek-btn" id="peekBtn" onclick="stepPeek()" title="Peek hints (marks for review)"><i data-lucide="eye"></i></button>'
      : '') +
    '</div>';
}

function stepSetNext(label, handler) {
  const btn = document.getElementById("stepNextBtn");
  if (!btn) return;
  btn.textContent = label;
  btn.disabled = false;
  btn.onclick = handler;
}

function stepAdvance() {
  stepSession.index++;
  if (stepSession.index >= stepSession.steps.length) stepComplete();
  else stepRender();
}

function stepComplete() {
  closeLesson();
  const scored = stepSession.totalScored;
  stepPersistClear();
  if (typeof stepSession.soIndex !== "undefined" && stepSession.soIndex !== null) {
    try {
      if (typeof soLessons !== "undefined" && soLessons && soLessons[stepSession.soIndex]) {
        const done = JSON.parse(localStorage.getItem("thaiDaiSODone") || "[]");
        if (done.indexOf(soLessons[stepSession.soIndex].id) < 0) done.push(soLessons[stepSession.soIndex].id);
        localStorage.setItem("thaiDaiSODone", JSON.stringify(done));
        const path = document.querySelector(".learning-path");
        if (path && document.body.classList.contains("so-mode")) path.innerHTML = soRenderPath();
      }
    } catch (e) {}
  } else {
    markLessonCompleted(stepSession.lessonId);
  }
  const peekNote = stepSession.peekCount > 0 ? (" • " + stepSession.peekCount + " peeked") : "";
  alert("Lesson complete! You got " + stepSession.correct + "/" + scored + " correct." + peekNote);
}

// ===================== renderers =====================

// shared: romanized + translation lines, visibility CSS-driven by mode/peek
function stepRomanizedHTML(step) {
  const r = stepHints(step).romanized;
  return r ? '<div class="step-romanized">' + r + '</div>' : "";
}
function stepTranslationHTML(step) {
  const t = stepHints(step).translation;
  if (!t) return "";
  if (stepModeLevel() === 1) {
    return '<details class="step-drawer"><summary>Translation</summary><div class="step-translation">' + t + '</div></details>';
  }
  return '<div class="step-translation">' + t + '</div>';
}
function stepAudioBtn(text, cls) {
  return '<button class="step-audio' + (cls ? " " + cls : "") + '" onclick="stepSpeak(\'' + text + '\')"><i data-lucide="volume-2"></i></button>';
}

function stepHTMLPresentation(step) {
  const h = stepHints(step);
  var main = step.thai
    ? '<div class="step-thai">' + step.thai + '</div>' + stepRomanizedHTML(step)
    : '<div class="step-thai" style="font-family:var(--font-phonetic)">' + h.romanized + '</div>';
  return '<div class="step-card">' +
    '<div class="step-phase">Listen &amp; Repeat</div>' +
    main +
    stepTranslationHTML(step) +
    stepAudioBtn(step.tts || step.thai) +
    (step.note ? '<div class="step-note">' + step.note + '</div>' : '') +
    '</div>';
}

function stepHTMLTone(step) {
  const opts = (step.options || STEP_TONE_OPTS).map(function (o) {
    return '<button class="tone-option" data-tone="' + o.id + '" onclick="stepToneAnswer(this, \'' + o.id + '\')">' +
      '<span class="tone-label">' + o.label + '</span>' +
      '<span class="tone-contour">' + o.contour + '</span></button>';
  }).join("");
  return '<div class="step-card">' +
    '<div class="step-phase">Ear Training</div>' +
    '<p class="step-prompt">' + (step.prompt || "Listen. What tone is it?") + '</p>' +
    stepAudioBtn(step.tts || "") +
    stepRomanizedHTML(step) + stepTranslationHTML(step) +
    '<div class="tone-options">' + opts + '</div>' +
    '</div>';
}

function stepHTMLMinimalPair(step) {
  const opts = (step.options || []).map(function (o, i) {
    const oh = optHints(o);
    return '<button class="context-option" data-idx="' + i + '" onclick="stepChoiceAnswer(this, ' + i + ')">' +
      '<div class="ctx-thai">' + o.thai + '</div>' +
      '<div class="opt-roman">' + oh.romanized + '</div>' +
      '<div class="opt-eng">' + oh.translation + '</div></button>';
  }).join("");
  return '<div class="step-card">' +
    '<div class="step-phase">Minimal Pair</div>' +
    '<p class="step-prompt">' + (step.prompt || "Which word did you hear?") + '</p>' +
    stepAudioBtn(step.tts || "", "step-audio-lg") +
    stepRomanizedHTML(step) + stepTranslationHTML(step) +
    '<div class="context-options">' + opts + '</div>' +
    '</div>';
}

function stepHTMLAudioComp(step) {
  const opts = (step.options || []).map(function (o, i) {
    const oh = optHints(o);
    return '<button class="context-option" data-idx="' + i + '" onclick="stepChoiceAnswer(this, ' + i + ')">' +
      '<div class="ctx-thai">' + o.thai + '</div>' +
      '<div class="opt-roman">' + oh.romanized + '</div>' +
      '<div class="opt-eng">' + oh.translation + '</div></button>';
  }).join("");
  return '<div class="step-card">' +
    '<div class="step-phase">Listening</div>' +
    '<p class="step-prompt">' + (step.prompt || "Listen and choose what you heard.") + '</p>' +
    stepAudioBtn(step.tts || "", "step-audio-lg") +
    stepRomanizedHTML(step) + stepTranslationHTML(step) +
    '<div class="context-options">' + opts + '</div>' +
    '</div>';
}

function stepHTMLContextual(step) {
  const opts = (step.options || []).map(function (o, i) {
    const oh = optHints(o);
    return '<button class="context-option" data-idx="' + i + '" onclick="stepChoiceAnswer(this, ' + i + ')">' +
      '<div class="ctx-thai">' + o.thai + '</div>' +
      '<div class="opt-roman">' + oh.romanized + '</div>' +
      '<div class="opt-eng">' + oh.translation + '</div></button>';
  }).join("");
  return '<div class="step-card">' +
    '<div class="step-phase">In Context</div>' +
    '<p class="step-scenario">' + step.scenario + '</p>' +
    stepAudioBtn(step.tts || "") +
    stepRomanizedHTML(step) + stepTranslationHTML(step) +
    '<div class="context-options">' + opts + '</div>' +
    '</div>';
}

// ---- builder steps (assembler / morphology / legacy scrambled) ----
function stepHTMLAssembler(step) {
  stepSession.tiles = step.tiles.slice();
  stepSession.correctSeq = step.correctSequence;
  stepSession.userSequence = [];
  stepSession.selectedRoots = [];
  return '<div class="step-card">' +
    '<div class="step-phase">Build the Sentence</div>' +
    '<p class="step-prompt">' + step.prompt + '</p>' +
    stepRomanizedHTML(step) + stepTranslationHTML(step) +
    '<div class="syl-slot" id="sylSlot"></div>' +
    '<div class="syl-bank" id="sylBank">' + stepHTMLTileBank() + '</div>' +
    '</div>';
}

function stepHTMLMorphology(step) {
  stepSession.tiles = step.roots.map(function (r) { return { thai: r.thai, meaning: r.meaning }; });
  stepSession.correctRoots = step.correctRoots;
  stepSession.userSequence = [];
  stepSession.selectedRoots = [];
  const roots = (step.roots || []).map(function (r, i) {
    return '<button class="root-chip" data-idx="' + i + '" onclick="stepRootTap(' + i + ')">' +
      '<span class="root-thai">' + r.thai + '</span>' +
      '<span class="root-meaning">' + (r.meaning || "") + '</span></button>';
  }).join("");
  return '<div class="step-card">' +
    '<div class="step-phase">Word Builder</div>' +
    '<p class="step-prompt">' + step.prompt + '</p>' +
    stepRomanizedHTML(step) + stepTranslationHTML(step) +
    '<div class="syl-slot" id="sylSlot"></div>' +
    '<div class="syl-bank" id="sylBank">' + roots + '</div>' +
    '</div>';
}

function stepHTMLScrambled(step) {
  stepSession.bankItems = stepShuffle(step.bank.slice());
  stepSession.correctSeq = step.correctSequence;
  stepSession.userSequence = [];
  stepSession.selectedRoots = [];
  return '<div class="step-card">' +
    '<div class="step-phase">Build the Phrase</div>' +
    '<p class="step-prompt">' + step.prompt + '</p>' +
    stepRomanizedHTML(step) + stepTranslationHTML(step) +
    '<div class="syl-slot" id="sylSlot"></div>' +
    '<div class="syl-bank" id="sylBank">' + stepHTMLBank() + '</div>' +
    '</div>';
}

function stepHTMLTileBank() {
  return stepSession.tiles.map(function (t, i) {
    if (stepSession.userSequence.indexOf(i) >= 0) return "";
    return '<button class="tile-chip" data-idx="' + i + '" onclick="stepTileTap(' + i + ')">' + t.thai + '</button>';
  }).join("");
}

function stepTileTap(idx) {
  if (stepSession.answered) return;
  const pos = stepSession.userSequence.indexOf(idx);
  if (pos >= 0) stepSession.userSequence.splice(pos, 1);
  else stepSession.userSequence.push(idx);
  stepSyncBuilderUI();
}

function stepRootTap(idx) {
  if (stepSession.answered) return;
  const pos = stepSession.selectedRoots.indexOf(idx);
  if (pos >= 0) stepSession.selectedRoots.splice(pos, 1);
  else stepSession.selectedRoots.push(idx);
  stepSyncBuilderUI();
}

function stepSyncBuilderUI() {
  const slot = document.getElementById("sylSlot");
  const bank = document.getElementById("sylBank");
  const isMorph = stepSession.steps[stepSession.index].type === "morphology";
  if (slot) {
    if (isMorph) {
      slot.innerHTML = stepSession.selectedRoots.map(function (i) {
        const r = stepSession.tiles[i];
        return '<span class="tile-chip placed">' + r.thai + '</span>';
      }).join("");
    } else {
      slot.innerHTML = stepSession.userSequence.map(function (i) {
        const t = stepSession.tiles[i];
        return '<span class="tile-chip placed">' + t.thai + '</span>';
      }).join("");
    }
  }
  if (bank) {
    if (isMorph) {
      const roots = stepSession.steps[stepSession.index].roots;
      bank.innerHTML = roots.map(function (r, i) {
        if (stepSession.selectedRoots.indexOf(i) >= 0) return "";
        return '<button class="root-chip" data-idx="' + i + '" onclick="stepRootTap(' + i + ')">' +
          '<span class="root-thai">' + r.thai + '</span>' +
          '<span class="root-meaning">' + (r.meaning || "") + '</span></button>';
      }).join("");
    } else {
      bank.innerHTML = stepHTMLTileBank();
    }
  }
  const btn = document.getElementById("stepNextBtn");
  if (btn) {
    const want = isMorph ? stepSession.correctRoots.length : stepSession.correctSeq.length;
    const have = isMorph ? stepSession.selectedRoots.length : stepSession.userSequence.length;
    btn.disabled = have !== want;
  }
}

function stepCheckBuilder() {
  if (stepSession.answered) return;
  const step = stepSession.steps[stepSession.index];
  const isMorph = step.type === "morphology";
  stepSession.answered = true;
  let correct = false;
  if (isMorph) {
    const got = stepSession.selectedRoots.slice().sort().join("-");
    const want = step.correctRoots.slice().sort().join("-");
    correct = got === want;
  } else {
    correct = step.correctSequence.join("-") === stepSession.userSequence.join("-");
  }
  const slot = document.getElementById("sylSlot");
  if (correct) {
    stepSession.correct++;
    if (slot) slot.classList.add("correct");
    stepSetNext("Continue →", stepAdvance);
  } else {
    if (slot) slot.classList.add("wrong");
    stepSetNext("Got it →", stepAdvance);
  }
}

function stepHTMLBank() {
  return stepSession.bankItems.filter(function (b) { return stepSession.userSequence.indexOf(b.id) < 0; })
    .map(stepChipHTML).join("");
}
function stepChipHTML(b) {
  return '<button class="syl-chip" data-id="' + b.id + '" onclick="stepChipTap(\'' + b.id + '\')">' +
    '<span>' + b.text + '</span><span class="syl-tone">' + b.contour + '</span></button>';
}
function stepChipTap(id) {
  if (stepSession.answered) return;
  const idx = stepSession.userSequence.indexOf(id);
  if (idx >= 0) stepSession.userSequence.splice(idx, 1);
  else stepSession.userSequence.push(id);
  const slot = document.getElementById("sylSlot");
  const bank = document.getElementById("sylBank");
  if (slot) {
    const byId = {};
    stepSession.bankItems.forEach(function (b) { byId[b.id] = b; });
    slot.innerHTML = stepSession.userSequence.map(function (id) { return stepChipHTML(byId[id]); }).join("");
  }
  if (bank) bank.innerHTML = stepHTMLBank();
  const btn = document.getElementById("stepNextBtn");
  if (btn) btn.disabled = stepSession.userSequence.length !== stepSession.correctSeq.length;
}
function stepCheckScrambled() {
  if (stepSession.answered) return;
  stepSession.answered = true;
  const correct = stepSession.correctSeq.join("-") === stepSession.userSequence.join("-");
  const slot = document.getElementById("sylSlot");
  if (correct) {
    stepSession.correct++;
    if (slot) slot.classList.add("correct");
    stepSetNext("Continue →", stepAdvance);
  } else {
    if (slot) slot.classList.add("wrong");
    stepSetNext("Got it →", stepAdvance);
  }
}

// ---- answer handlers ----
function stepToneAnswer(el, tone) {
  if (stepSession.answered) return;
  stepSession.answered = true;
  const step = stepSession.steps[stepSession.index];
  const correct = step.correctTone === tone;
  document.querySelectorAll(".tone-option").forEach(function (o) {
    o.classList.remove("correct", "wrong");
    if (o.getAttribute("data-tone") === step.correctTone) o.classList.add("correct");
  });
  if (correct) {
    stepSession.correct++;
    el.classList.add("correct");
    stepSetNext("Continue →", stepAdvance);
  } else {
    el.classList.add("wrong");
    stepSetNext("Got it →", stepAdvance);
  }
}

function stepChoiceAnswer(el, idx) {
  if (stepSession.answered) return;
  stepSession.answered = true;
  const step = stepSession.steps[stepSession.index];
  const correct = idx === step.correctIndex;
  document.querySelectorAll(".context-option").forEach(function (o, i) {
    o.classList.remove("correct", "wrong");
    if (i === step.correctIndex) o.classList.add("correct");
  });
  if (correct) {
    stepSession.correct++;
    el.classList.add("correct");
    stepSetNext("Continue →", stepAdvance);
  } else {
    el.classList.add("wrong");
    stepSetNext("Got it →", stepAdvance);
  }
}


// ===== Speak-Only curriculum -> active step lessons =====
(function () {
  try {
    if (typeof SO_CURRICULUM === "undefined") return;
    var GLYPH = { low: "ˋ", mid: "ˉ", high: "ˊ", falling: "ˆ", rising: "ˇ" };
    function toneOf(syl) {
      if (/[àèìòù]/.test(syl)) return "low";
      if (/[âêîôû]/.test(syl)) return "falling";
      if (/[áéíóú]/.test(syl)) return "high";
      if (/[ǎěǐǒǔ]/.test(syl)) return "rising";
      return "mid";
    }
    function splitSyls(ph) {
      return String(ph).replace(/\{\{particle\}\}/g, "kráp")
        .split(/[\s\u2013\u2014-]+/)
        .map(function (s) { return s.replace(/[?!.,()]/g, ""); })
        .filter(Boolean);
    }
    window.SO_STEP_LESSONS = {};
    var idx = 0;
    (SO_CURRICULUM.units || []).forEach(function (unit) {
      (unit.lessons || []).forEach(function (lesson) {
        var steps = [];
        (lesson.items || []).forEach(function (item) {
          var ph = String(item.phonetic || "").replace(/\{\{particle\}\}/g, "kráp");
          var tts = item.tts || "";
          if (item.type === "phrase_builder") {
            steps.push({ stepId: "p_" + item.id, type: "presentation", phase: "explore", romanized: ph, translation: item.english, tts: tts, hints: { romanized: ph, translation: item.english } });
          } else {
            var sTone = splitSyls(ph).map(function (x) { var t = toneOf(x); return { text: x, tone: t, contour: GLYPH[t] }; });
            steps.push({ stepId: "p_" + item.id, type: "presentation", phase: "explore", romanized: ph, translation: item.english, tts: tts, hints: { romanized: ph, translation: item.english } });
            if (sTone.length) {
              var pick = sTone[0];
              steps.push({ stepId: "t_" + item.id, type: "tone_discrimination", phase: "drill", prompt: "Listen. What tone is it?", tts: tts, syllable: pick.text, correctTone: pick.tone, hints: { romanized: ph, translation: item.english }, options: STEP_TONE_OPTS });
            }
            if (!/[\/,]/.test(ph) && sTone.length >= 2) {
              steps.push({ stepId: "s_" + item.id, type: "scrambled_syllable", phase: "drill", prompt: 'Assemble: "' + item.english + '"', targetTranslation: item.english, correctSequence: sTone.map(function (x) { return x.text; }), hints: { romanized: ph, translation: item.english }, bank: sTone.map(function (x, i) { return { id: "s" + i, text: x.text, tone: x.tone, contour: x.contour }; }) });
            }
          }
        });
        if (steps.length) window.SO_STEP_LESSONS[idx] = { unitId: unit.id, unitTitle: unit.title, lessonId: lesson.id, lessonTitle: lesson.title, steps: steps };
        idx++;
      });
    });
  } catch (e) { if (window.console) console.error("SO step build failed", e); }
})();

function stepStartSO(i) {
  var lesson = window.SO_STEP_LESSONS && window.SO_STEP_LESSONS[i];
  if (!lesson) return false;
  stepSession.soIndex = i;
  stepSession.lessonId = null;
  stepSession.steps = lesson.steps;
  stepSession.index = 0;
  stepSession.correct = 0;
  stepSession.peekCount = 0;
  stepSession.totalScored = lesson.steps.filter(function (s) { return stepIsScored(s.type); }).length;
  stepSession.answered = false;
  stepSession.userSequence = [];
  var hearts = document.querySelector(".lesson-hearts");
  if (hearts) hearts.style.display = "none";
  document.getElementById("lessonModal").classList.add("active");
  document.body.classList.add("modal-open");
  stepApplyModeClass();
  stepRender();
  return true;
}


window.THAI_LIT = {
  "pom cheu": "My name is... (male)","sawasdee": "Hello / Goodbye", "sawasdee krab": "Hello (male)", "sawasdee ka": "Hello (female)", "khun": "You (polite)", "phom cheu": "My name is... (male)", "chan cheu": "My name is... (female)", "khun cheu arai": "What is your name?", "khob khun": "Thank you", "khob khun mak ka": "Thank you very much (female)", "yin dee": "You're welcome / Glad to", "dee jai thi dai roojak": "Nice to meet you", "sabai dee mai": "How are you?", "laa gawn": "Goodbye", "khaw thot": "Sorry / Excuse me", "mai pen rai": "It's okay / Never mind", "neung": "One", "see": "Four", "haa": "Five", "sip": "Ten", "yee sip": "Twenty", "thao rai": "How much?", "gee baht": "How many baht?", "phaeng": "Expensive", "thuk": "Cheap / Correct", "lot dai mai": "Can you discount?", "thuk gwa nee dai mai": "Can it be cheaper than this?", "ra kha tao rai": "What is the price?", "chan ao arai nee ka": "I'll take this one (female)", "pet": "Spicy", "wan": "Sweet", "priaw": "Sour", "jeut": "Bland / Not salty", "mai pet": "Not spicy", "pet mak": "Very spicy", "nid noi": "A little bit", "ao": "Want / Take", "mai ao": "Don't want", "chob": "Like", "aroi": "Delicious", "nam": "Water", "khao": "Rice / Meal", "kuay tiao": "Noodles", "pad thai": "Pad Thai", "chan gin jay ka": "I'm vegetarian (female)", "check bin krab": "Check please (male)", "check bin": "Bill / Check", "chan im laew ka": "I'm full (female)", "kor krab": "I would like [X] (male)", "meter": "Turn on the meter", "pai thi": "Go to [place]", "glai mai": "Is it far?", "reo noi krab": "A bit faster please (male)", "liaw sai": "Turn left", "liaw khwa": "Turn right", "dtrong pai": "Go straight", "jawt dtrong nee": "Stop here", "klap rot": "U-turn", "phaeng pai": "Too expensive", "dai krab": "Yes / Okay (male)", "chan ha khun khwa ka": "I'll find another one (female)", "na khrap": "Here / This one (male)", "mai dtong thon": "Keep the change", "khob khun ka laew joo gan": "Thanks, see you (female)", "chok dee": "Good luck"
};

// ===== Read-mode lessons 2-13 -> active step lessons (Thai-only, no English crutch) =====
(function () {
  try {
    if (typeof lessonData === "undefined") return;
    var GLYPH = { low: "ˋ", mid: "ˉ", high: "ˊ", falling: "ˆ", rising: "ˇ" };
    function toneOf(syl) {
      if (/[àèìòù]/.test(syl)) return "low";
      if (/[âêîôû]/.test(syl)) return "falling";
      if (/[áéíóú]/.test(syl)) return "high";
      if (/[ǎěǐǒǔ]/.test(syl)) return "rising";
      return "mid";
    }
    function strip(s) { return String(s || "").replace(/[()]/g, "").replace(/\s+/g, " ").trim(); }
    function syls(s) { return strip(s).split(/[\s\u2013\u2014-]+/).filter(Boolean); }
    function cleanEng(s) {
      s = String(s || "").trim();
      s = s.replace(/\s+(male|female)$/i, function (m, g) { return " (" + g.toLowerCase() + ")"; });
      s = s.replace(/\byoure\b/gi, "You're").replace(/\bim\b/gi, "I'm").replace(/\bdont\b/gi, "Don't").replace(/\bits\b/gi, "It's").replace(/\buturn\b/gi, "U-turn");
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
    function engOf(value) { return (window.THAI_LIT && window.THAI_LIT[value]) || cleanEng(value || ""); }

    Object.keys(lessonData).forEach(function (id) {
      if (window.STEP_LESSONS[id]) return; // skip curated lesson 1
      var exercises = lessonData[id] || [];
      var steps = [];

      // build Thai -> {romanized, translation} reverse index for distractor hints
      var thaiInfo = {};
      exercises.forEach(function (ex) {
        (ex.options || []).forEach(function (o) {
          if (o.thai && !thaiInfo[o.thai]) {
            thaiInfo[o.thai] = { romanized: strip(o.romanized || ""), translation: engOf(o.value) };
          }
        });
      });
      var allThai = Object.keys(thaiInfo);

      exercises.forEach(function (ex, ei) {
        var opts = ex.options || [];
        var correctOpt = opts.find(function (o) { return o.value === ex.correct; }) || opts[0];
        if (!correctOpt) return;
        var thai = correctOpt.thai || "";
        var rom = strip(correctOpt.romanized || "");
        var eng = engOf(correctOpt.value);
        var sTone = syls(rom).map(function (x) { var t = toneOf(x); return { text: x, tone: t, contour: GLYPH[t] }; });

        // 1. presentation (explore)
        steps.push({ stepId: "p_" + id + "_" + ei, type: "presentation", phase: "explore", thai: thai, tts: thai, hints: { romanized: rom, translation: eng } });

        // 2. tone discrimination (drill) — audio-only
        if (sTone.length) {
          var pick = sTone[0];
          steps.push({ stepId: "t_" + id + "_" + ei, type: "tone_discrimination", phase: "drill", prompt: "Listen. What tone is it?", tts: thai, syllable: pick.text, correctTone: pick.tone, hints: { romanized: rom, translation: eng }, options: STEP_TONE_OPTS });
        }

        // 3. audio comprehension (assess) — Thai-only options
        var distractors = allThai.filter(function (t) { return t !== thai; });
        distractors = stepShuffle(distractors).slice(0, 3);
        if (distractors.length >= 2) {
          var choices = stepShuffle([thai].concat(distractors)).map(function (t) {
            var info = thaiInfo[t] || {};
            return { thai: t, hints: { romanized: info.romanized || "", translation: info.translation || "" } };
          });
          var correctIndex = choices.findIndex(function (o) { return o.thai === thai; });
          steps.push({ stepId: "a_" + id + "_" + ei, type: "audio_comprehension", phase: "assess", prompt: "Listen and choose what you heard.", tts: thai, correctIndex: correctIndex, hints: { romanized: rom, translation: eng }, options: choices });
        }
      });

      if (steps.length) {
        window.STEP_LESSONS[id] = { unitId: "read_" + id, unitTitle: "Read & Write", lessonId: "lesson-" + id, lessonTitle: "Lesson " + id, steps: steps };
      }
    });
  } catch (e) { if (window.console) console.error("read step build failed", e); }
})();
