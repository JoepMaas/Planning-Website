const { ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

ipcMain.handle("saveBoards", (event, boards) => {
    const filePath = path.join(__dirname, "BoardSaving.json");

    const data = {
        boards: boards
    };

    fs.writeFileSync(
        filePath,
        JSON.stringify(data, null, 4)
    );

    return true;
});