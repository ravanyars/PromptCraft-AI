/* =============================================
   PromptCraft — Feature 5: Prompt Input
   input.js
   ============================================= */

/* ── DOM refs ── */
const promptInput = document.getElementById('promptInput');
const charCount    = document.getElementById('charCount');
const submitBtn     = document.getElementById('submitBtn');
const hintBtn        = document.getElementById('hintBtn');
const feedbackMsg   = document.getElementById('feedbackMsg');

/* ── Sample hints (swap with real level data later) ── */
const hints = [
  'Think about the lighting style.',
  'Consider the main subject and setting.',
  'What mood or color palette stands out?'
];
let hintIndex = 0;

/* =============================================
   STEP 2 — character counter
   ============================================= */
promptInput.addEventListener('input', () => {
  charCount.textContent = promptInput.value.length;
  clearState();
});

/* =============================================
   STEP 3 — listen for click / Enter key
   ============================================= */
submitBtn.addEventListener('click', handleSubmit);

promptInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSubmit();
  }
});

hintBtn.addEventListener('click', showHint);

/* =============================================
   STEP 4 — read text  /  STEP 5 — validate
   ============================================= */
function handleSubmit() {
  const userPrompt = promptInput.value;

  if (userPrompt.trim() === '') {
    shake();
    showFeedback('Enter a prompt before submitting.', 'fail');
    return;
  }

  /* STEP 6 — send to matching engine */
  comparePrompt(userPrompt);

  /* STEP 7 — clear input */
  promptInput.value = '';
  charCount.textContent = '0';
}

/* =============================================
   STEP 6 (stub) — Prompt Matching Engine
   Feature 6 will replace this with the real engine.
   ============================================= */
function comparePrompt(userPrompt) {
  console.log('Sending to Prompt Matcher:', userPrompt);

  /* Lightweight placeholder scoring so this file
     can be tested stand-alone before Feature 6 lands */
  const sample = 'neon cyberpunk cat on giant donut in space';
  const origWords  = sample.toLowerCase().split(/\s+/);
  const guessWords = userPrompt.toLowerCase().split(/\s+/);
  const matched    = guessWords.filter(w => origWords.includes(w)).length;
  const pct        = Math.min(100, Math.round((matched / origWords.length) * 100));

  applyResult(pct);
}

function applyResult(pct) {
  clearState();

  if (pct >= 90) {
    promptInput.classList.add('state-success');
    showFeedback(`✓ ${pct}% match — Level Cleared!`, 'success');
  } else {
    promptInput.classList.add('state-fail');
    showFeedback(`${pct}% match — Keep trying.`, 'info');
  }
}

/* =============================================
   HINT SYSTEM (preview of Feature 8)
   ============================================= */
function showHint() {
  if (hintIndex >= hints.length) {
    showFeedback('No more hints available.', 'info');
    return;
  }
  showFeedback(`Hint: ${hints[hintIndex]}`, 'info');
  hintIndex++;
}

/* =============================================
   HELPERS
   ============================================= */
function clearState() {
  promptInput.classList.remove('state-success', 'state-fail');
}

function shake() {
  promptInput.classList.remove('shake');
  void promptInput.offsetWidth; /* restart animation if needed */
  promptInput.classList.add('shake');
}

function showFeedback(msg, type) {
  feedbackMsg.textContent = msg;
  feedbackMsg.className = 'feedback-msg ' + type;
}