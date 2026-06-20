class StorageManager {

    static saveScore(scoreData) {

        const scores =
            StorageManager.getScores();

        scores.push(scoreData);

        scores.sort(
            (a, b) => b.score - a.score
        );

        localStorage.setItem(
            "leaderboard",
            JSON.stringify(
                scores.slice(0, 10)
            )
        );

    }

    static getScores() {

        return JSON.parse(
            localStorage.getItem(
                "leaderboard"
            )
        ) || [];

    }

    static clearLeaderboard() {

        localStorage.removeItem(
            "leaderboard"
        );

    }

    static saveProgress(progress) {

        localStorage.setItem(
            "gameProgress",
            JSON.stringify(progress)
        );

    }

    static getProgress() {

        return JSON.parse(
            localStorage.getItem(
                "gameProgress"
            )
        );

    }

}