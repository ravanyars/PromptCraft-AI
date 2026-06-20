/**
 * leaderboard-storage.js
 * -----------------------------------------------------------------------
 * Single source of truth for reading/writing leaderboard data.
 * Pure localStorage — no database.
 *
 * Two ways data gets in here:
 *  1. seedSampleData()  -> adds Ravi/John/Alex test rows, ONLY if the
 *                          leaderboard is empty. Safe to call anytime;
 *                          it never overwrites real scores.
 *  2. addResult()       -> called from the real game (score-engine.js)
 *                          when a round finishes. This is the live path —
 *                          every score that comes through here is real,
 *                          and it gets added/merged alongside whatever
 *                          is already stored (including the sample rows).
 * -----------------------------------------------------------------------
 */

const LEADERBOARD_KEY = "promptcraft_leaderboard";

const LeaderboardStorage = (() => {

  /**
   * Returns the raw array of score entries from localStorage.
   * Each entry: { name: string, score: number, levelsCleared: number, date: ISOString }
   * Returns [] if nothing has been played yet — never fake data.
   */
  function getAll() {
    try {
      const raw = localStorage.getItem(LEADERBOARD_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error("LeaderboardStorage: failed to read data", err);
      return [];
    }
  }

  /**
   * Persists the full entries array back to localStorage.
   */
  function saveAll(entries) {
    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
      return true;
    } catch (err) {
      console.error("LeaderboardStorage: failed to save data", err);
      return false;
    }
  }

  /**
   * Fills the leaderboard with sample/test rows (Ravi, John, Alex) so you
   * can see the UI working before playing a real game.
   *
   * Safe by design:
   *  - Only runs if the leaderboard is currently EMPTY.
   *  - If you've already played and have real scores saved, this does
   *    nothing (won't overwrite or duplicate anything).
   *  - Once real scores come in via addResult(), they sit alongside these
   *    sample rows and get ranked together by score — a real score higher
   *    than 1200 will show above "Ravi" automatically.
   */
  function seedSampleData() {
    const existing = getAll();
    if (existing.length > 0) {
      console.log("LeaderboardStorage: data already present, skipping seed.");
      return existing;
    }

    const sample = [
      { name: "Ravi", score: 1200, levelsCleared: 10, date: new Date().toISOString() },
      { name: "John", score: 1100, levelsCleared: 9, date: new Date().toISOString() },
      { name: "Alex", score: 950, levelsCleared: 8, date: new Date().toISOString() },
    ];

    saveAll(sample);
    return sample;
  }

  /**
   * Adds a real result coming from an actual finished game (Game Over screen).
   * If the same player already has a score, we only keep their best one —
   * standard "personal best" leaderboard behaviour.
   * This is the LIVE path — every call here comes from real gameplay,
   * and merges right alongside any sample data already sitting in storage.
   */
  function addResult({ name, score, levelsCleared }) {
    if (!name || typeof score !== "number") {
      console.error("LeaderboardStorage: invalid result, name/score required");
      return getAll();
    }

    const entries = getAll();
    const cleanName = name.trim().slice(0, 20) || "Player";
    const existing = entries.find(
      (e) => e.name.toLowerCase() === cleanName.toLowerCase()
    );

    if (existing) {
      // Keep only the best score for that player
      if (score > existing.score) {
        existing.score = score;
        existing.levelsCleared = levelsCleared ?? existing.levelsCleared;
        existing.date = new Date().toISOString();
      }
    } else {
      entries.push({
        name: cleanName,
        score,
        levelsCleared: levelsCleared ?? 0,
        date: new Date().toISOString(),
      });
    }

    saveAll(entries);
    return entries;
  }

  /**
   * Returns entries sorted by score (desc), limited to `limit`.
   */
  function getTopScores(limit = 5) {
    return getAll()
      .slice()
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  /**
   * Returns the rank (1-based) of a given score against all stored entries.
   * Used by the Game Over screen to show "Rank #3" for the live result.
   */
  function getRankForScore(score) {
    const all = getAll();
    const higherCount = all.filter((e) => e.score > score).length;
    return higherCount + 1;
  }

  /**
   * Wipes the leaderboard completely.
   */
  function reset() {
    localStorage.removeItem(LEADERBOARD_KEY);
    return [];
  }

  return {
    getAll,
    seedSampleData,
    addResult,
    getTopScores,
    getRankForScore,
    reset,
  };
})();