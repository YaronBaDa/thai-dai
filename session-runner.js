/* ============================================================
   Thai Dai — Step-based lesson engine (active language acquisition)
   Step types: presentation, tone_discrimination,
               scrambled_syllable, contextual_match
   Score rule: presentation steps are NEVER scored.
   ============================================================ */

// ---- sample lesson data (new multi-step schema) ----
// Mirrors lesson-1.json; runtime uses this synchronous copy (audio via TTS).
window.STEP_LESSONS = {
  1: {
    unitId: "unit-1",
    unitTitle: "Street Survival & Politeness",
    lessonId: "lesson-1-golden-words",
    lessonTitle: "The Golden Words",
    steps: [
      {
        stepId: "step-1-intro",
        type: "presentation",
        thai: "ขอบคุณครับ",
        romanized: "khòp-khun kráp",
        translation: "Thank you (polite male)",
        tts: "ขอบคุณครับ",
        syllables: [
          { text: "khòp", thai: "ขอบ", tone: "low",  contour: "ˋ" },
          { text: "khun", thai: "คุณ", tone: "mid",  contour: "ˉ" },
          { text: "kráp", thai: "ครับ", tone: "high", contour: "ˊ" }
        ],
        note: "Particles 'kráp' (male) and 'khâ' (female) soften phrases and show respect."
      },
      {
        stepId: "step-2-ear-training",
        type: "tone_discrimination",
        prompt: "Listen to the syllable. What tone is it?",
        tts: "ครับ",
        syllable: "kráp",
        correctTone: "high",
        options: [
          { id: "mid",     label: "Mid",     contour: "ˉ" },
          { id: "low",     label: "Low",     contour: "ˋ" },
          { id: "high",    label: "High",    contour: "ˊ" },
          { id: "falling", label: "Falling", contour: "ˆ" },
          { id: "rising",  label: "Rising",  contour: "ˇ" }
        ]
      },
      {
        stepId: "step-3-reconstruct",
        type: "scrambled_syllable",
        prompt: "Assemble: 'Thank you' (polite male)",
        targetTranslation: "Thank you",
        correctSequence: ["khòp", "khun", "kráp"],
        bank: [
          { id: "s1", text: "kráp", thai: "ครับ", tone: "high",    contour: "ˊ" },
          { id: "s2", text: "khòp", thai: "ขอบ", tone: "low",     contour: "ˋ" },
          { id: "s3", text: "khun", thai: "คุณ", tone: "mid",     contour: "ˉ" },
          { id: "s4", text: "kâ",   thai: "คะ",  tone: "falling", contour: "ˆ" }
        ]
      },
      {
        stepId: "step-4-context",
        type: "contextual_match",
        scenario: "A 7-Eleven clerk hands you your change and receipt. How do you politely say thank you?",
        correctIndex: 0,
        options: [
          { text: "ขอบคุณครับ", romanized: "khòp-khun kráp", explanation: "Polite thank you for male speakers." },
          { text: "สวัสดีครับ", romanized: "sà-wàt-dii kráp", explanation: "Means 'hello', not 'thank you'." },
          { text: "ขอโทษครับ", romanized: "khɔ̌ɔ-thôot kráp", explanation: "Means 'sorry / excuse me'." }
        ]
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

// ---- session state ----
const stepSession = {
  lessonId: null,
  steps: [],
  index: 0,
  correct: 0,
  totalScored: 0,
  answered: false,
  userSequence: [],
  bankItems: [],
  correctSeq: []
};

function stepIsScored(type) {
  return type === "tone_discrimination" || type === "scrambled_syllable" || type === "contextual_match";
}

function stepShuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
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
  stepSession.answered = false;
  stepSession.userSequence = [];
  document.getElementById("progressFill").style.width = Math.round((stepSession.index / stepSession.steps.length) * 100) + "%";
  if (step.type === "presentation") area.innerHTML = stepHTMLPresentation(step);
  else if (step.type === "tone_discrimination") area.innerHTML = stepHTMLTone(step);
  else if (step.type === "scrambled_syllable") area.innerHTML = stepHTMLScrambled(step);
  else if (step.type === "contextual_match") area.innerHTML = stepHTMLContextual(step);

  if (step.type === "presentation") {
    footer.innerHTML = '<button class="btn btn-primary" id="stepNextBtn" onclick="stepAdvance()">Continue →</button>';
  } else if (step.type === "scrambled_syllable") {
    footer.innerHTML = '<button class="btn btn-primary" id="stepNextBtn" onclick="stepCheckScrambled()" disabled>Check</button>';
  } else {
    footer.innerHTML = '<button class="btn btn-primary" id="stepNextBtn" onclick="stepAdvance()" disabled>Continue →</button>';
  }
  if (window.lucide) lucide.createIcons();
  stepPersistSave();
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
  alert("Lesson complete! You got " + stepSession.correct + "/" + scored + " correct.");
}

// ---- renderers ----
function stepHTMLPresentation(step) {
  const syls = (step.syllables || []).map(function (s) {
    return '<button class="syl-chip" onclick="stepSpeak(\'' + (s.thai || step.tts || s.text) + '\')">' +
      '<span>' + s.text + '</span><span class="syl-tone">' + s.contour + '</span></button>';
  }).join("");
  var main = step.thai
    ? '<div class="step-thai">' + step.thai + '</div><div class="step-romanized">' + step.romanized + '</div>'
    : '<div class="step-thai" style="font-family:var(--font-phonetic)">' + step.romanized + '</div>';
  return '<div class="step-card">' +
    '<div class="step-phase">Listen &amp; Repeat</div>' +
    main +
    '<div class="step-translation">' + step.translation + '</div>' +
    '<button class="step-audio" onclick="stepSpeak(\'' + (step.tts || step.thai) + '\')"><i data-lucide="volume-2"></i></button>' +
    '<div class="step-syllables">' + syls + '</div>' +
    (step.note ? '<div class="step-note">' + step.note + '</div>' : '') +
    '</div>';
}

function stepHTMLTone(step) {
  const opts = (step.options || []).map(function (o) {
    return '<button class="tone-option" data-tone="' + o.id + '" onclick="stepToneAnswer(this, \'' + o.id + '\')">' +
      '<span class="tone-label">' + o.label + '</span>' +
      '<span class="tone-contour">' + o.contour + '</span></button>';
  }).join("");
  return '<div class="step-card">' +
    '<div class="step-phase">Ear Training</div>' +
    '<p class="step-prompt">' + step.prompt + '</p>' +
    '<button class="step-audio" onclick="stepSpeak(\'' + (step.tts || "") + '\')"><i data-lucide="volume-2"></i></button>' +
    '<div class="tone-options">' + opts + '</div>' +
    '</div>';
}

function stepHTMLScrambled(step) {
  stepSession.bankItems = stepShuffle(step.bank.slice());
  stepSession.correctSeq = step.correctSequence;
  stepSession.userSequence = [];
  return '<div class="step-card">' +
    '<div class="step-phase">Build the Phrase</div>' +
    '<p class="step-prompt">' + step.prompt + '</p>' +
    '<div class="syl-slot" id="sylSlot"></div>' +
    '<div class="syl-bank" id="sylBank">' + stepHTMLBank() + '</div>' +
    '</div>';
}

function stepChipHTML(b) {
  return '<button class="syl-chip" data-id="' + b.id + '" onclick="stepChipTap(\'' + b.id + '\')">' +
    '<span>' + b.text + '</span><span class="syl-tone">' + b.contour + '</span></button>';
}

function stepHTMLBank() {
  return stepSession.bankItems.filter(function (b) { return stepSession.userSequence.indexOf(b.id) < 0; })
    .map(stepChipHTML).join("");
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

function stepHTMLContextual(step) {
  const opts = step.options.map(function (o, i) {
    return '<button class="context-option" data-idx="' + i + '" onclick="stepContextAnswer(this, ' + i + ')">' +
      '<div class="ctx-thai">' + o.text + '</div>' +
      '<div class="ctx-roman">' + o.romanized + '</div>' +
      '<div class="ctx-exp">' + o.explanation + '</div></button>';
  }).join("");
  return '<div class="step-card">' +
    '<div class="step-phase">In Context</div>' +
    '<p class="step-scenario">' + step.scenario + '</p>' +
    '<div class="context-options">' + opts + '</div>' +
    '</div>';
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

function stepContextAnswer(el, idx) {
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
    var TONE_OPTS = [
      { id: "mid", label: "Mid", contour: "ˉ" },
      { id: "low", label: "Low", contour: "ˋ" },
      { id: "high", label: "High", contour: "ˊ" },
      { id: "falling", label: "Falling", contour: "ˆ" },
      { id: "rising", label: "Rising", contour: "ˇ" }
    ];
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
            steps.push({ stepId: "p_" + item.id, type: "presentation", romanized: ph, translation: item.english, tts: tts, syllables: [] });
          } else {
            var sTone = splitSyls(ph).map(function (x) { var t = toneOf(x); return { text: x, tone: t, contour: GLYPH[t] }; });
            steps.push({ stepId: "p_" + item.id, type: "presentation", romanized: ph, translation: item.english, tts: tts, syllables: sTone });
            if (sTone.length) {
              var pick = sTone[0];
              steps.push({ stepId: "t_" + item.id, type: "tone_discrimination", prompt: 'Listen. What tone is "' + pick.text + '"?', tts: tts, syllable: pick.text, correctTone: pick.tone, options: TONE_OPTS });
            }
            if (!/[\/,]/.test(ph) && sTone.length >= 2) {
              steps.push({ stepId: "s_" + item.id, type: "scrambled_syllable", prompt: 'Assemble: "' + item.english + '"', targetTranslation: item.english, correctSequence: sTone.map(function (x) { return x.text; }), bank: sTone.map(function (x, i) { return { id: "s" + i, text: x.text, tone: x.tone, contour: x.contour }; }) });
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
  stepSession.totalScored = lesson.steps.filter(function (s) { return stepIsScored(s.type); }).length;
  stepSession.answered = false;
  stepSession.userSequence = [];
  var hearts = document.querySelector(".lesson-hearts");
  if (hearts) hearts.style.display = "none";
  document.getElementById("lessonModal").classList.add("active");
  document.body.classList.add("modal-open");
  stepRender();
  return true;
}


window.THAI_LIT = {
  "pom cheu": "My name is... (male)","sawasdee": "Hello / Goodbye", "sawasdee krab": "Hello (male)", "sawasdee ka": "Hello (female)", "khun": "You (polite)", "phom cheu": "My name is... (male)", "chan cheu": "My name is... (female)", "khun cheu arai": "What is your name?", "khob khun": "Thank you", "khob khun mak ka": "Thank you very much (female)", "yin dee": "You're welcome / Glad to", "dee jai thi dai roojak": "Nice to meet you", "sabai dee mai": "How are you?", "laa gawn": "Goodbye", "khaw thot": "Sorry / Excuse me", "mai pen rai": "It's okay / Never mind", "neung": "One", "see": "Four", "haa": "Five", "sip": "Ten", "yee sip": "Twenty", "thao rai": "How much?", "gee baht": "How many baht?", "phaeng": "Expensive", "thuk": "Cheap / Correct", "lot dai mai": "Can you discount?", "thuk gwa nee dai mai": "Can it be cheaper than this?", "ra kha tao rai": "What is the price?", "chan ao arai nee ka": "I'll take this one (female)", "pet": "Spicy", "wan": "Sweet", "priaw": "Sour", "jeut": "Bland / Not salty", "mai pet": "Not spicy", "pet mak": "Very spicy", "nid noi": "A little bit", "ao": "Want / Take", "mai ao": "Don't want", "chob": "Like", "aroi": "Delicious", "nam": "Water", "khao": "Rice / Meal", "kuay tiao": "Noodles", "pad thai": "Pad Thai", "chan gin jay ka": "I'm vegetarian (female)", "check bin krab": "Check please (male)", "check bin": "Bill / Check", "chan im laew ka": "I'm full (female)", "kor krab": "I would like [X] (male)", "meter": "Turn on the meter", "pai thi": "Go to [place]", "glai mai": "Is it far?", "reo noi krab": "A bit faster please (male)", "liaw sai": "Turn left", "liaw khwa": "Turn right", "dtrong pai": "Go straight", "jawt dtrong nee": "Stop here", "klap rot": "U-turn", "phaeng pai": "Too expensive", "dai krab": "Yes / Okay (male)", "chan ha khun khwa ka": "I'll find another one (female)", "na khrap": "Here / This one (male)", "mai dtong thon": "Keep the change", "khob khun ka laew joo gan": "Thanks, see you (female)", "chok dee": "Good luck", "bpai": "Go", "maa": "Come", "nai": "Where", "arai": "What", "meuan gan": "Same / Me too", "gin khao": "Eat rice / Have a meal", "hong nam": "Bathroom", "rot fai": "Train", "rot mee": "Bus", "sanam bin": "Airport", "ta naam": "Pier / Ferry dock", "rot dtap": "Traffic jam", "pang": "Bread", "kaffe": "Coffee", "nam khaeng": "Ice", "nam pla": "Fish sauce", "nam man": "Cooking oil / Gasoline", "nam sot": "Drinking water", "nam phon la mai": "Fruit juice", "cha yen": "Iced tea", "cha ron": "Hot tea", "bia": "Beer", "lao": "Liquor / Spirits", "rot tam ruat": "Police car", "hong yaak": "Hospital", "ran ahan": "Restaurant", "dtalaat": "Market", "tlot": "All the way / Through", "hong nam yuu thi nai": "Where is the bathroom?", "kit thung": "Miss (someone)", "rak": "Love", "jing jing": "Really / Truly", "mai chai": "No (it isn't)", "chai": "Yes (it is)", "dai": "Can / Get / Okay", "mai dai": "Cannot / Not okay"};

// ===== Read-mode lessons 2-13 -> active step lessons =====
(function () {
  try {
    if (typeof lessonData === "undefined") return;
    var GLYPH = { low: "ˋ", mid: "ˉ", high: "ˊ", falling: "ˆ", rising: "ˇ" };
    var TONE_OPTS = [
      { id: "mid", label: "Mid", contour: "ˉ" },
      { id: "low", label: "Low", contour: "ˋ" },
      { id: "high", label: "High", contour: "ˊ" },
      { id: "falling", label: "Falling", contour: "ˆ" },
      { id: "rising", label: "Rising", contour: "ˇ" }
    ];
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

    Object.keys(lessonData).forEach(function (id) {
      if (window.STEP_LESSONS[id]) return; // skip already-curated lesson 1
      var exercises = lessonData[id] || [];
      var steps = [];
      exercises.forEach(function (ex, ei) {
        var opts = ex.options || [];
        var correctOpt = opts.find(function (o) { return o.value === ex.correct; }) || opts[0];
        if (!correctOpt) return;
        var thai = correctOpt.thai || "";
        var rom = strip(correctOpt.romanized || "");
        var eng = (window.THAI_LIT && window.THAI_LIT[correctOpt.value]) || cleanEng(correctOpt.value || "");
        var sTone = syls(rom).map(function (x) { var t = toneOf(x); return { text: x, tone: t, contour: GLYPH[t] }; });
        // presentation
        steps.push({ stepId: "p_" + id + "_" + ei, type: "presentation", thai: thai, romanized: rom, translation: eng, tts: thai, syllables: sTone });
        // tone discrimination
        if (sTone.length) {
          var pick = sTone[0];
          steps.push({ stepId: "t_" + id + "_" + ei, type: "tone_discrimination", prompt: 'Listen. What tone is "' + pick.text + '"?', tts: thai, syllable: pick.text, correctTone: pick.tone, options: TONE_OPTS });
        }
        // scrambled syllable (active recall)
        if (!/[\/,]/.test(rom) && sTone.length >= 2) {
          steps.push({ stepId: "s_" + id + "_" + ei, type: "scrambled_syllable", prompt: 'Assemble: "' + eng + '"', targetTranslation: eng, correctSequence: sTone.map(function (x) { return x.text; }), bank: sTone.map(function (x, i) { return { id: "s" + i, text: x.text, tone: x.tone, contour: x.contour }; }) });
        }
      });
      if (steps.length) {
        window.STEP_LESSONS[id] = { unitId: "read_" + id, unitTitle: "Read & Write", lessonId: "lesson-" + id, lessonTitle: "Lesson " + id, steps: steps };
      }
    });
  } catch (e) { if (window.console) console.error("read step build failed", e); }
})();
