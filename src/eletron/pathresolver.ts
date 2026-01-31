import { app } from "electron";
import path from "path";
import { Checkdev } from "./checkdev.js";



export   function getpathresolver() {

    console.log("preload path:", path.join(app.getAppPath(), "preload.cjs"))
    return path.join(app.getAppPath(),Checkdev()?'.':'..' ,'/disteletron/preload.cjs');
}

export function getapppath() {
    return path.join(app.getAppPath(), "/distreactele/index.html")
    
}

export function getassets() {

    console.log(path.join(app.getAppPath(),Checkdev()?'.':'..' ,'/disteletron/preload.cjs'),"is apppppp path")
    return path.join(app.getAppPath(),Checkdev()?'.':'..' ,'src/assets');
    
}