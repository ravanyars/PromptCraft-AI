class PromptMatcher {

    constructor() {

        this.stopWords = [

            "a",
            "an",
            "the",
            "is",
            "are",
            "was",
            "were",
            "on",
            "in",
            "at",
            "to",
            "of",
            "for",
            "with",
            "and"

        ];

    }

    cleanText(text) {

        return text
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .split(" ")
            .filter(
                word =>
                    word.trim() !== "" &&
                    !this.stopWords.includes(word)
            );

    }

    compare(originalPrompt, userPrompt) {

        const originalWords =
            this.cleanText(originalPrompt);

        const userWords =
            this.cleanText(userPrompt);

        const matchedWords = [];

        const missingWords = [];

        originalWords.forEach(word => {

            if (userWords.includes(word)) {

                matchedWords.push(word);

            } else {

                missingWords.push(word);

            }

        });

        const similarity =
            Math.round(
                (
                    matchedWords.length /
                    originalWords.length
                ) * 100
            );

        return {

            matchedWords,

            missingWords,

            similarity

        };

    }

}