<<<<<<< HEAD
const {ipcRenderer} = require('electron');
const ipc = ipcRenderer;

document.querySelector("#minimize").addEventListener("click", () => {
    ipc.send("manualMinimize");
});

document.querySelector("#close").addEventListener("click", () => {
    ipc.send("manualClose");
});


let timer = document.getElementById('timer-display').querySelector('h1');
let start = document.getElementById('start-btn');
let pause = document.getElementById('pause-btn');
let reset = document.getElementById('reset-btn');
=======
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
>>>>>>> 22f48d6 (new updates)

const startSound = new Audio("audio\\minecraft_click.mp3");
const endSound = new Audio("audio\\hotel_bell.mp3");

<<<<<<< HEAD
let timeleft = 50 * 60;
let interval;

const updateTimer = () => {
    const minutes = Math.floor(timeleft / 60);
    const seconds = timeleft%60;

    timer.innerHTML = `${minutes.toString().padStart(2,"0")}
    :
    ${seconds.toString().padStart(2,"0")}`;
};

const startTimer = () =>{
    startSound.play();
    interval = setInterval(()=>{
        timeleft--;
        updateTimer();
        if(timeleft === 0){
            endSound.play();
            clearInterval(interval);
            timeleft = 50 * 60;
            updateTimer();
        }
    }, 1000);
};

const stopTimer = () => {
    startSound.play();
    clearInterval(interval);
};

const resetTimer = () => {
    startSound.play();
    clearInterval(interval);
    interval = null;
    timeleft = 50 * 60;
    updateTimer();
};

start.addEventListener("click", startTimer);
pause.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);
=======
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
>>>>>>> 22f48d6 (new updates)
