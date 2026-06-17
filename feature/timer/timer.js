/* =============================================
   PromptCraft — Feature 4: Timer System
   timer.js
   ============================================= */

let timeLeft       = 60;
let timerInterval  = null;
let isRunning      = false;

/* ── DOM refs ── */
const timerEl   = document.getElementById('timer');
const statusEl  = document.getElementById('timer-status');
const startBtn  = document.getElementById('btn-start');
const pauseBtn  = document.getElementById('btn-pause');
const resetBtn  = document.getElementById('btn-reset');
const overlay   = document.getElementById('overlay');
const playAgainBtn = document.getElementById('btn-play-again');
const nextLevelBtn = document.getElementById('btn-next-level');

/* ── Button events ── */
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
playAgainBtn.addEventListener('click', () => { hideOverlay(); resetTimer(); });
nextLevelBtn.addEventListener('click', () => { hideOverlay(); resetTimer(); });

/* =============================================
   STEP 3 — startTimer()
   ============================================= */
function startTimer() {
  if (isRunning) return;
  if (timeLeft <= 0) timeLeft = 60;

  isRunning = true;
  setStatus('Running', 'running');
  startBtn.disabled = true;

  /* STEP 4 — decrease every second */
  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();

    /* STEP 5 — stop at zero */
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      isRunning = false;
      handleTimeUp();
    }
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;
  clearInterval(timerInterval);
  isRunning = false;
  startBtn.disabled = false;
  setStatus('Paused', '');
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  timeLeft  = 60;
  startBtn.disabled = false;
  updateDisplay();
  setStatus('Ready', '');
}

/* =============================================
   UPDATE DISPLAY (color phases)
   ============================================= */
function updateDisplay() {
  timerEl.textContent = timeLeft;

  timerEl.classList.remove('warn', 'danger');

  if (timeLeft <= 10) {
    timerEl.classList.add('danger');
    setStatus('Danger', 'danger');
  } else if (timeLeft <= 20) {
    timerEl.classList.add('warn');
    setStatus('Warning', 'warn');
  } else {
    setStatus('Running', 'running');
  }
}

function setStatus(text, cls) {
  statusEl.textContent = text;
  statusEl.className   = 'timer-status ' + cls;
}

/* =============================================
   STEP 7 — handleTimeUp()
   ============================================= */
function handleTimeUp() {
  setStatus('Time Up', 'danger');
  startBtn.disabled = true;
  showOverlay();
}

function showOverlay() {
  overlay.classList.add('show');
}

function hideOverlay() {
  overlay.classList.remove('show');
}

/* ── Init ── */
updateDisplay();