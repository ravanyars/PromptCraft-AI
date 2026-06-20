/* ==========================================
   PROMPTCRAFT AI - APP.JS
   Common Functions
   ========================================== */

// ==========================================
// PAGE NAVIGATION
// ==========================================

// Go to Home Page
function goToHome() {
    window.location.href = "../index.html";
}

// Go to How To Play Page
function goToHowToPlay() {
    window.location.href = "../Game Screen/how-to-play.html";
}

// Go to Game Page
function goToGame() {
    window.location.href = "../Page/game.html";
}

// Go to Leaderboard Page
function goToLeaderboard() {
    window.location.href = "../leaderboard.html";
}

// Go to Game Over Page
function goToGameOver() {
    window.location.href = "../game-over.html";
}

// ==========================================
// SCROLL TO TOP
// ==========================================

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ==========================================
// LOADING ANIMATION
// ==========================================

function showLoading() {
    const loader = document.getElementById("loader");

    if (loader) {
        loader.style.display = "flex";
    }
}

function hideLoading() {
    const loader = document.getElementById("loader");

    if (loader) {
        loader.style.display = "none";
    }
}

// ==========================================
// BUTTON CLICK EFFECT
// ==========================================

function buttonClickEffect(button) {
    button.style.transform = "scale(0.95)";

    setTimeout(() => {
        button.style.transform = "scale(1)";
    }, 150);
}

// ==========================================
// PAGE INITIALIZATION
// ==========================================

function initializePage() {
    console.log("PROMPTCRAFT AI Loaded Successfully");

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ==========================================
// RUN WHEN PAGE LOADS
// ==========================================

window.addEventListener("DOMContentLoaded", () => {
    initializePage();
});