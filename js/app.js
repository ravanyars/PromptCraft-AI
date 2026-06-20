document.addEventListener("DOMContentLoaded", () => {

    const startGameBtn =
        document.getElementById("startGameBtn");

    const startGameBtnBottom =
        document.getElementById("startGameBtnBottom");

    const howToPlayBtn =
        document.getElementById("howToPlayBtn");

    const backHomeBtn =
        document.getElementById("backHomeBtn");

    if(startGameBtn){
        startGameBtn.addEventListener(
            "click",
            () => {
                window.location.href =
                    "game.html";
            }
        );
    }

    if(startGameBtnBottom){
        startGameBtnBottom.addEventListener(
            "click",
            () => {
                window.location.href =
                    "game.html";
            }
        );
    }

    if(howToPlayBtn){
        howToPlayBtn.addEventListener(
            "click",
            () => {
                window.location.href =
                    "how-to-play.html";
            }
        );
    }

    if(backHomeBtn){
        backHomeBtn.addEventListener(
            "click",
            () => {
                window.location.href =
                    "index.html";
            }
        );
    }

});