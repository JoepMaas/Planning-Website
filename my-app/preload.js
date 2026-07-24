const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    saveBoards: (data) => ipcRenderer.invoke("saveBoards", data)
});