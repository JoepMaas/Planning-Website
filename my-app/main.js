const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {   
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: true
        }
    });

    win.loadFile('index.html');
}

ipcMain.handle("saveBoards", async (event, boards) => {
    const filePath = path.join(__dirname, "BoardSaving.json");

    fs.writeFileSync(
        filePath,
        JSON.stringify(boards, null, 4)
    );

    console.log("Boards saved!");

    return true;
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});