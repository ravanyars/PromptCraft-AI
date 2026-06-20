const levelImage =
    document.getElementById(
        "levelImage"
    );

const promptInput =
    document.getElementById(
        "promptInput"
    );

const submitBtn =
    document.getElementById(
        "submitBtn"
    );

const hintBtn =
    document.getElementById(
        "hintBtn"
    );

const similarityScore =
    document.getElementById(
        "similarityScore"
    );

const matchedWordsList =
    document.getElementById(
        "matchedWords"
    );

const missingWordsList =
    document.getElementById(
        "missingWords"
    );

const hintText =
    document.getElementById(
        "hintText"
    );

const timerElement =
    document.getElementById(
        "timer"
    );

const scoreElement =
    document.getElementById(
        "totalScore"
    );

const levelElement =
    document.getElementById(
        "currentLevel"
    );

const difficultyBadge =
    document.getElementById(
        "difficultyBadge"
    );

const charCount =
    document.getElementById(
        "charCount"
    );

const originalPromptElement =
    document.getElementById(
        "originalPrompt"
    );

const timeUpModal =
    document.getElementById(
        "timeUpModal"
    );

const levelCompleteModal =
    document.getElementById(
        "levelCompleteModal"
    );

const earnedPointsElement =
    document.getElementById(
        "earnedPoints"
    );

const nextLevelBtn =
    document.getElementById(
        "nextLevelBtn"
    );

const gameOverBtn =
    document.getElementById(
        "gameOverBtn"
    );

/* ENGINES */

const levelManager =
    new LevelManager();

const matcher =
    new PromptMatcher();

const scoreEngine =
    new ScoreEngine();

const hintEngine =
    new HintEngine();

const timer =
    new GameTimer(
        timerElement
    );

/* GAME STATE */

let totalScore = 0;

let currentLevel = null;

let accuracyHistory = [];

/* INITIALIZE */

window.addEventListener(
    "DOMContentLoaded",
    initGame
);

async function initGame() {

    await levelManager.loadLevels(
        "easy"
    );

    loadCurrentLevel();

}

/* LOAD LEVEL */

function loadCurrentLevel() {

    currentLevel =
        levelManager.getCurrentLevel();

    if (!currentLevel) {

        finishGame();

        return;

    }

    levelImage.src =
        currentLevel.image;

    levelElement.textContent =
        `${levelManager.currentDifficulty.toUpperCase()}
         ${levelManager.currentLevelIndex + 1}`;

    difficultyBadge.textContent =
        levelManager.currentDifficulty.toUpperCase();

    difficultyBadge.className =
        `difficulty ${levelManager.currentDifficulty}`;

    promptInput.value = "";

    similarityScore.textContent =
        "0%";

    matchedWordsList.innerHTML = "";

    missingWordsList.innerHTML = "";

    hintText.textContent =
        "No hints used yet.";

    hintEngine.reset();

    timer.reset(
        levelManager.getDifficultyTimer()
    );

    timer.onTimeUp =
        handleTimeUp;

    timer.start();

}

/* CHARACTER COUNT */

promptInput.addEventListener(
    "input",
    () => {

        charCount.textContent =
            `${promptInput.value.length} / 250`;

    }
);

/* ENTER SUBMIT */

promptInput.addEventListener(
    "keypress",
    event => {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            submitPrompt();

        }

    }
);

/* BUTTON EVENTS */

submitBtn.addEventListener(
    "click",
    submitPrompt
);

hintBtn.addEventListener(
    "click",
    showHint
);

nextLevelBtn.addEventListener(
    "click",
    moveNextLevel
);

gameOverBtn.addEventListener(
    "click",
    () => {

        window.location.href =
            "game-over.html";

    }
);

/* SUBMIT */

function submitPrompt() {

    const userPrompt =
        promptInput.value.trim();

    if (!userPrompt) {

        alert(
            "Please enter a prompt."
        );

        return;

    }

    const result =
        matcher.compare(
            currentLevel.prompt,
            userPrompt
        );

    renderMatchResults(
        result
    );

    const timerPercent =
        (
            timer.getRemainingTime() /
            levelManager.getDifficultyTimer()
        ) * 100;

    const earnedPoints =
        scoreEngine.calculatePoints(
            result.similarity,
            timerPercent
        );

    similarityScore.textContent =
        `${result.similarity}%`;

    totalScore += earnedPoints;

    scoreElement.textContent =
        totalScore;

    accuracyHistory.push(
        result.similarity
    );
console.log("Similarity:", result.similarity);
    if (
        result.similarity >= 40
    ) {

        timer.stop();

        earnedPointsElement.textContent =
            `+${earnedPoints} Points`;

        levelCompleteModal.classList.remove(
            "hidden"
        );

        NotificationManager.success("Level Cleared!");
        AnimationManager.triggerConfetti(); 

    }

}

/* MATCH RESULTS */

function renderMatchResults(
    result
) {

    matchedWordsList.innerHTML = "";

    missingWordsList.innerHTML = "";

    result.matchedWords.forEach(
        word => {

            const li =
                document.createElement(
                    "li"
                );

            li.textContent = word;

            li.style.background =
                "#22C55E";

            matchedWordsList.appendChild(
                li
            );

        }
    );

    result.missingWords.forEach(
        word => {

            const li =
                document.createElement(
                    "li"
                );

            li.textContent = word;

            li.style.background =
                "#EF4444";

            missingWordsList.appendChild(
                li
            );

        }
    );

}

/* HINT */

function showHint() {

    const hint =
        hintEngine.getHint(
            currentLevel
        );

    hintText.textContent =
        hint;

}

/* NEXT LEVEL */

async function moveNextLevel() {

    levelCompleteModal.classList.add(
        "hidden"
    );

    const next =
        levelManager.nextLevel();

    if (next) {

        loadCurrentLevel();

        return;

    }

    const nextDifficulty =
        levelManager.unlockNextDifficulty();

    if (!nextDifficulty) {

        finishGame();

        return;

    }

    await levelManager.loadLevels(
        nextDifficulty
    );

    loadCurrentLevel();

}

/* TIME UP */

function handleTimeUp() {

    promptInput.disabled = true;

    submitBtn.disabled = true;

    NotificationManager.error("Time Up!");
    AnimationManager.shake(timerElement);
    originalPromptElement.textContent =
        currentLevel.prompt;

    timeUpModal.classList.remove(
        "hidden"
    );

}

/* GAME COMPLETE */

function finishGame() {

    const averageAccuracy =
        Math.round(

            accuracyHistory.reduce(
                (sum, value) =>
                    sum + value,
                0
            ) /

            accuracyHistory.length

        );

    localStorage.setItem(
        "finalScore",
        totalScore
    );

    localStorage.setItem(
        "accuracy",
        averageAccuracy
    );

    localStorage.setItem(
        "levelsCompleted",
        levelManager.completedLevels
    );

    window.location.href =
        "game-over.html";

}