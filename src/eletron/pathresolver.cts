import { app } from "electron";
import path from "path";
import { Checkdev } from "./checkdev";



export   function getpathresolver() {

    console.log("preload path:", path.join(__dirname, "preload.cjs")
)
    return path.join(app.getAppPath(),Checkdev()?'.':'..' ,'/disteletron/preload.cjs');
}