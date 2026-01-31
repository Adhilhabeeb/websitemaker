import { app, BrowserWindow, desktopCapturer, ipcMain, IpcMainEvent, session, shell, systemPreferences, WebFrameMain } from "electron";
import path from "path";
import { Checkdev } from "./checkdev.js";
import { poll } from "./poll.js";
import { getassets, getpathresolver } from "./pathresolver.js";
import { ostype, sendhandlefunction, staticdatafunreturen, validateurl } from "./utils/types.js";

app.on("ready", async () => {
    let mainwidth = new BrowserWindow({
        webPreferences: {
            preload: getpathresolver()
        }
    });
session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    desktopCapturer.getSources({ types: ['screen'] }).then((sources) => {
      // Grant access to the first screen found.
      console.log(callback,)
      console.log(sources)
      callback({ video: sources[0], audio: 'loopback' })
    })
    // If true, use the system picker if available.
    // Note: this is currently experimental. If the system picker
    // is available, it will be used and the media request handler
    // will not be invoked.
  }, { useSystemPicker: true })
    poll(mainwidth);



const checkMicrophonePermission = async () => {
  const hasMicrophonePermission =
    systemPreferences.getMediaAccessStatus("microphone") === "granted";
  if (hasMicrophonePermission) return;
  if (process.platform === "darwin") {
    const microPhoneGranted = await systemPreferences.askForMediaAccess(
      "microphone"
    );
    if (!microPhoneGranted) {
      shell.openExternal(
        "x-apple.systempreferences:com.apple.preference.security?Privacy_Microphone"
      );
    }
  } else if (process.platform === "win32") {
    shell.openExternal("ms-settings:privacy-microphone");
  }
};

const checkCameraPermission = async () => {
  const hasCameraPermission =
    systemPreferences.getMediaAccessStatus("camera") === "granted";
  if (hasCameraPermission) return;
  if (process.platform === "darwin") {
    const cameraGranted = await systemPreferences.askForMediaAccess("camera");
    if (!cameraGranted) {
      shell.openExternal(
        "x-apple.systempreferences:com.apple.preference.security?Privacy_Camera"
      );
    }
  } else if (process.platform === "win32") {
    shell.openExternal("ms-settings:privacy-webcam");
  }
};



    sendhandlefunction<staticdatafunreturen>("getstaticdata", (event) => {
        console.log(event.senderFrame, "is senbet ")
        validateurl(event.senderFrame)
        return { ram: 8, cpu: "applesilicon", os: "mac" };

    })


    sendhandlefunction<ostype>("sendsystemmodel", () => {
        return process.platform

    })
console.log(getassets(),"is asets")



    if (Checkdev()) {
        // if itis production mode we need t. show   hotreloads. when we are updating

        mainwidth.loadURL("http://localhost:5123/");
    } else {
        mainwidth.loadFile(path.join(app.getAppPath(), "/distreactele/index.html"));
    }
});
app.on("quit", () => {
    console.log("quict");
});
