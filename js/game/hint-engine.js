class HintEngine {

    constructor() {

        this.currentHintIndex = 0;

    }

    reset() {

        this.currentHintIndex = 0;

    }

    getHint(levelData) {

        if (
            this.currentHintIndex >=
            levelData.hints.length
        ) {

            return "No more hints available.";

        }

        const hint =
            levelData.hints[
                this.currentHintIndex
            ];

        this.currentHintIndex++;

        return hint;

    }

}