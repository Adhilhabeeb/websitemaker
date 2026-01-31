"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getpathresolver = getpathresolver;
exports.getapppath = getapppath;
exports.getassets = getassets;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const checkdev_1 = require("./checkdev");
function getpathresolver() {
    console.log("preload path:", path_1.default.join(__dirname, "preload.cjs"));
    return path_1.default.join(electron_1.app.getAppPath(), (0, checkdev_1.Checkdev)() ? '.' : '..', '/disteletron/preload.cjs');
}
function getapppath() {
    return path_1.default.join(electron_1.app.getAppPath(), "/distreactele/index.html");
}
function getassets() {
    console.log(path_1.default.join(electron_1.app.getAppPath(), (0, checkdev_1.Checkdev)() ? '.' : '..', '/disteletron/preload.cjs'), "is apppppp path");
    return path_1.default.join(electron_1.app.getAppPath(), (0, checkdev_1.Checkdev)() ? '.' : '..', 'src/assets');
}
