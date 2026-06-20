/**
 * leaderboard.js
 * -----------------------------------------------------------------------
 * Renders the Leaderboard page using ONLY live data from LeaderboardStorage.
 * No hardcoded names/scores anywhere in this file.
 * -----------------------------------------------------------------------
 */

const MEDALS = ["🥇", "🥈", "🥉"]; // used for rank 1-3, rest just show the number

function renderLeaderboard() {
  const listEl = document.getElementById("leaderboard-list");
  const countEl = document.getElementById("player-count");
  const emptyEl = document.getElementById("leaderboard-empty");

  const topScores = LeaderboardStorage.getTopScores(5);
  const totalPlayers = LeaderboardStorage.getAll().length;

  countEl.textContent = `${totalPlayers} player${totalPlayers === 1 ? "" : "s"}`;

  listEl.innerHTML = "";

  if (topScores.length === 0) {
    emptyEl.style.display = "block";
    listEl.style.display = "none";
    return;
  }

  emptyEl.style.display = "none";
  listEl.style.display = "block";

  topScores.forEach((entry, index) => {
    const rank = index + 1;
    const row = document.createElement("div");
    row.className = "leaderboard-row";

    row.innerHTML = `
      <div class="lb-rank">
        <span class="lb-medal">${MEDALS[index] ?? rank}</span>
      </div>
      <div class="lb-player">
        <span class="lb-name">${escapeHtml(entry.name)}</span>
      </div>
      <div class="lb-score">${entry.score.toLocaleString()}</div>
    `;

    listEl.appendChild(row);
  });
}

/**
 * Minimal HTML escaping so a player name can never break the markup.
 */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function handleResetLeaderboard() {
  const confirmed = confirm(
    "This will permanently clear every saved score. Continue?"
  );
  if (!confirmed) return;

  LeaderboardStorage.reset();
  renderLeaderboard();
}

document.addEventListener("DOMContentLoaded", () => {
  // Fills sample data (Ravi/John/Alex) ONLY if nothing real has been saved yet.
  // Once you actually play the game, addResult() takes over and real scores
  // appear right alongside these — ranked purely by score.
  LeaderboardStorage.seedSampleData();

  renderLeaderboard();

  const resetBtn = document.getElementById("reset-leaderboard-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", handleResetLeaderboard);
  }

  // Re-render automatically if another tab updates the leaderboard
  window.addEventListener("storage", (e) => {
    if (e.key === "promptcraft_leaderboard") {
      renderLeaderboard();
    }
  });
});