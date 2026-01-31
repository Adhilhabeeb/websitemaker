"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __importDefault(require("electron"));
let functionpass = {
    subscribestatics: (callback) => {
        let fun = (event, statics) => {
            // console.log("sending data to callback ",statics)
            // console.log(callback,"kk",statics)
            callback(statics);
        };
        // sendreltime  i renderer
        electron_1.default.ipcRenderer.on("statsdata", fun); //. send realtie. data to r
        return () => electron_1.default.ipcRenderer.off("statsdata", fun);
    },
    getstaticdata: () => ipcrendererinvoke("getstaticdata"),
    sendsystemmodel: () => ipcrendererinvoke("sendsystemmodel")
};
electron_1.default.contextBridge.exposeInMainWorld("adhil", functionpass);
function ipcrendererinvoke(params) {
    return electron_1.default.ipcRenderer.invoke(params);
}
