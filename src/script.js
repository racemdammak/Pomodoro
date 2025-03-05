const { ipcRenderer } = require("electron");

document.querySelector("#minimize").addEventListener("click", () => {
    ipcRenderer.send("manualMinimize");
});

document.querySelector("#close").addEventListener("click", () => {
    ipcRenderer.send("manualClose");
});

let timer = document.getElementById("timer-display").querySelector("h1");
let start = document.getElementById("start-btn");
let pause = document.getElementById("pause-btn");
let reset = document.getElementById("reset-btn");

const startSound = new Audio("audio\\minecraft_click.mp3");
const endSound = new Audio("audio\\hotel_bell.mp3");

const updateTimer = (timeLeft) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

start.addEventListener("click", () => {
    startSound.play();
    ipcRenderer.send("startTimer");
});

pause.addEventListener("click", () => {
    startSound.play();
    ipcRenderer.send("stopTimer");
});

reset.addEventListener("click", () => {
    startSound.play();
    ipcRenderer.send("resetTimer");
});

// Update the UI when receiving a timer update
ipcRenderer.on("updateTimer", (event, timeLeft) => {
    updateTimer(timeLeft);
});

// Play the end sound when the timer finishes
ipcRenderer.on("timerFinished", () => {
    endSound.play();
    endSound.play();
});
