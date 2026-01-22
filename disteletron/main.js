import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { Checkdev } from "./checkdev.js";
import { poll } from "./poll.js";
import { getpathresolver } from "./pathresolver.cjs";
app.on("ready", async () => {
    let mainwidth = new BrowserWindow({
        webPreferences: {
            preload: getpathresolver()
        }
    });
    poll(mainwidth);
    ipcMain.handle("getstaticdata", () => {
        return { ram: 8, cpu: "applesilicon", os: "mac" };
    });
    ipcMain.handle("sendsystemmodel", () => {
        return process.platform;
    });
    if (Checkdev()) {
        // if itis production mode we need t. show   hotreloads. when we are updating
        mainwidth.loadURL("http://localhost:5123/");
    }
    else {
        mainwidth.loadFile(path.join(app.getAppPath(), "/distreactele/index.html"));
    }
});
app.on("quit", () => {
    console.log("quict");
});
