/**
 * game-over.js
 * -----------------------------------------------------------------------
 * Renders the Game Over screen using ONLY live data — nothing hardcoded.
 *
 * Where the data comes from:
 *   The score-engine.js (at the moment a run ends) should save the
 *   result for THIS run into sessionStorage under "promptcraft_last_run",
 *   then navigate to game-over.html. Example, inside score-engine.js:
 *
 *     sessionStorage.setItem("promptcraft_last_run", JSON.stringify({
 *       playerName: currentPlayerName,
 *       finalScore: finalScore,
 *       levelsCleared: levelsCleared
 *     }));
 *     window.location.href = "../Over Screen/game-over.html";
 *
 * This file reads that, saves the real result into the leaderboard via
 * LeaderboardStorage.addResult(), then computes the player's live rank
 * against everyone else who has ever played (LeaderboardStorage.getRankForScore).
 * -----------------------------------------------------------------------
 */

const LAST_RUN_KEY = "promptcraft_last_run";

function getLastRun() {
  try {
    const raw = sessionStorage.getItem(LAST_RUN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed.finalScore !== "number") return null;
    return parsed;
  } catch (err) {
    console.error("game-over: failed to read last run", err);
    return null;
  }
}

function rankSuffix(rank) {
  const n = rank % 100;
  if (n >= 11 && n <= 13) return "th";
  switch (rank % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

function rankMessage(rank) {
  if (rank === 1) return "🏆 New high score! You're #1!";
  if (rank <= 3) return "🥉 Solid run, you're on the podium!";
  if (rank <= 10) return "👍 Nice work, you're in the top 10!";
  return "🎮 Run complete, keep crafting better prompts!";
}

function renderGameOver() {
  const lastRun = getLastRun();

  const levelsEl = document.getElementById("go-levels-cleared");
  const scoreEl = document.getElementById("go-best-score");
  const rankEl = document.getElementById("go-rank");
  const messageEl = document.getElementById("go-message");
  const saveStatusEl = document.getElementById("go-save-status");

  if (!lastRun) {
    // No live run found — nothing was played this session.
    // Don't fabricate numbers; tell the player honestly and send them to play.
    levelsEl.textContent = "—";
    scoreEl.textContent = "—";
    rankEl.textContent = "—";
    messageEl.textContent = "No run data found. Play a round to see your results here.";
    return;
  }

  // ---- STEP 1: show the result on screen immediately ----
  // Rank is computed against whatever is ALREADY saved (not including this
  // run yet) so the very first paint reflects "where you stood walking in".
  const provisionalRank = LeaderboardStorage.getRankForScore(lastRun.finalScore);

  levelsEl.textContent = lastRun.levelsCleared ?? 0;
  scoreEl.textContent = (lastRun.finalScore ?? 0).toLocaleString();
  rankEl.textContent = `#${provisionalRank}`;
  messageEl.textContent = rankMessage(provisionalRank);
  if (saveStatusEl) saveStatusEl.textContent = "Saving to leaderboard...";

  // ---- STEP 2: after the player has seen the result, persist it ----
  // This is the moment the real score actually gets written to localStorage
  // (via LeaderboardStorage.addResult, used by leaderboard.html too).
  setTimeout(() => {
    LeaderboardStorage.addResult({
      name: lastRun.playerName,
      score: lastRun.finalScore,
      levelsCleared: lastRun.levelsCleared,
    });

    // Re-check rank now that this run is actually in storage — covers the
    // edge case where the new score changes the player's own rank.
    const finalRank = LeaderboardStorage.getRankForScore(lastRun.finalScore);
    rankEl.textContent = `#${finalRank}`;
    messageEl.textContent = rankMessage(finalRank);
    if (saveStatusEl) saveStatusEl.textContent = "✓ Saved to leaderboard";

    // Clear the run so refreshing this page twice doesn't double-count the score.
    sessionStorage.removeItem(LAST_RUN_KEY);
  }, 600);
}

document.addEventListener("DOMContentLoaded", () => {
  renderGameOver();

  const playAgainBtn = document.getElementById("go-play-again-btn");
  const homeBtn = document.getElementById("go-home-btn");

  if (playAgainBtn) {
    playAgainBtn.addEventListener("click", () => {
      window.location.href = "../Page/game.html";
    });
  }

  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
  }
});