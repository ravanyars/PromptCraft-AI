class ScoreEngine {

    calculatePoints(
        similarity,
        timerPercentage
    ) {

        let points = 0;

        if (similarity >= 90) {

            points = 100;

        } else if (similarity >= 70) {

            points = 75;

        } else if (similarity >= 50) {

            points = 50;

        } else if (similarity >= 30) {

            points = 25;

        } else {

            points = 10;

        }

        if (timerPercentage > 50) {

            points += 20;

        }

        return points;

    }

}