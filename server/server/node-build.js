"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
electron_1.app.whenReady().then(() => {
    const win = new electron_1.BrowserWindow({
        title: "My App",
        webPreferences: {
            preload: path_1.default.resolve(__dirname, "../preload/index.js"),
        },
    });
    win.loadFile("dist/client/index.html"); // Adjust based on your renderer output
});
