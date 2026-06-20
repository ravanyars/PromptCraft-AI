class GameTimer {

    constructor(displayElement) {

        this.displayElement = displayElement;

        this.timeLeft = 60;

        this.interval = null;

        this.onTimeUp = null;

    }

    start() {

        this.stop();

        this.interval = setInterval(() => {

            this.timeLeft--;

            this.updateDisplay();

            if (this.timeLeft <= 10) {
                this.displayElement.classList.add(
                    "timer-warning"
                );
            }

            if (this.timeLeft <= 0) {

                this.stop();

                if (this.onTimeUp) {
                    this.onTimeUp();
                }

            }

        }, 1000);

    }

    stop() {

        clearInterval(this.interval);

    }

    reset(seconds) {

        this.stop();

        this.timeLeft = seconds;

        this.updateDisplay();

        this.displayElement.classList.remove(
            "timer-warning"
        );

    }

    pause() {

        this.stop();

    }

    updateDisplay() {

        this.displayElement.textContent =
            this.timeLeft;

    }

    getRemainingTime() {

        return this.timeLeft;

    }

}