import { app, BrowserWindow } from "electron";
import path from "path";

app.whenReady().then(() => {
  const win = new BrowserWindow({
    title: "My App",
    webPreferences: {
      preload: path.resolve(__dirname, "../preload/index.js"),
    },
  });
  win.loadFile("dist/client/index.html"); // Adjust based on your renderer output
});