"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __importDefault(require("electron"));
electron_1.default.contextBridge.exposeInMainWorld("electron", {
    subscribestatics: (callback) => {
        electron_1.default.ipcRenderer.on("statsdata", (event, statics) => {
            // console.log("sending data to callback ",statics)
            callback(statics);
        });
    },
    getstaticdata: () => electron_1.default.ipcRenderer.invoke("getstaticdata"),
    sendsystemmodel: () => electron_1.default.ipcRenderer.invoke("sendsystemmodel")
});
