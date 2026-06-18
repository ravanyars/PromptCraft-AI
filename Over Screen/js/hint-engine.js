class HintEngine {
    constructor() {
        this.currentHint = 0;
    }

    reset() {
        this.currentHint = 0;
    }

    getHint(levelData) {

        if (!levelData.hints || levelData.hints.length === 0) {
            return "No hints available";
        }

        if (this.currentHint < levelData.hints.length) {
            return levelData.hints[this.currentHint++];
        }

        return "No more hints available";
    }
}

const hintEngine = new HintEngine();