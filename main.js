const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;
let timerInterval;
let timeLeft = 50 * 60; // 50 minutes
let isRunning = false;
let startTime;

function createWindow() {
    win = new BrowserWindow({
        width: 450,
        height: 520,
        frame: false,
        resizable: false,
        maximizable: false,
        icon: path.join(__dirname, 'pomodoro.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('src/index.html');
    win.setMenuBarVisibility(false);
    win.on('maximize', () => {
        win.unmaximize();
    });
}

ipcMain.on("manualMinimize", () => {
    if (win) win.minimize();
});

ipcMain.on("manualClose", () => {
    if (win) win.close();
});

ipcMain.on("startTimer", (event) => {
    if (isRunning) return;
    isRunning = true;
    startTime = Date.now() - (50 * 60 - timeLeft) * 1000;

    timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timeLeft = Math.max(0, 50 * 60 - elapsedTime);

        if (win) win.webContents.send("updateTimer", timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            timeLeft = 50 * 60;
            if (win) win.webContents.send("timerFinished");
        }
    }, 1000);
});

ipcMain.on("stopTimer", () => {
    isRunning = false;
    clearInterval(timerInterval);
});

ipcMain.on("resetTimer", (event) => {
    isRunning = false;
    clearInterval(timerInterval);
    timeLeft = 50 * 60;
    if (win) win.webContents.send("updateTimer", timeLeft);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
