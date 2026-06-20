class LevelManager {

    constructor() {

        this.currentDifficulty = "easy";

        this.currentLevelIndex = 0;

        this.levels = [];

        this.completedLevels = 0;

    }

    async loadLevels(difficulty = "easy") {

        this.currentDifficulty = difficulty;

        const response = await fetch(
            `data/${difficulty}-levels.json`
        );

        this.levels = await response.json();

        this.shuffleLevels();

        this.currentLevelIndex = 0;

        return this.levels;

    }

    shuffleLevels() {

        for (
            let i = this.levels.length - 1;
            i > 0;
            i--
        ) {

            const j = Math.floor(
                Math.random() * (i + 1)
            );

            [
                this.levels[i],
                this.levels[j]
            ] = [
                this.levels[j],
                this.levels[i]
            ];

        }

    }

    getCurrentLevel() {

        return this.levels[
            this.currentLevelIndex
        ];

    }

    nextLevel() {

        this.completedLevels++;

        this.currentLevelIndex++;

        if (
            this.currentLevelIndex >=
            this.levels.length
        ) {

            return null;

        }

        return this.getCurrentLevel();

    }

    getDifficultyTimer() {

        switch (
            this.currentDifficulty
        ) {

            case "easy":
                return 60;

            case "medium":
                return 45;

            case "hard":
                return 30;

            default:
                return 60;

        }

    }

    unlockNextDifficulty() {

        if (
            this.currentDifficulty ===
            "easy"
        ) {

            return "medium";

        }

        if (
            this.currentDifficulty ===
            "medium"
        ) {

            return "hard";

        }

        return null;

    }

}