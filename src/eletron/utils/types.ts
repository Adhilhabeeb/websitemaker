import   Electron from "electron"
import  type { IpcMainInvokeEvent, WebFrameMain } from "electron";
import { Checkdev } from "../checkdev.js";
import url from "url";
import { getapppath } from "../pathresolver.js";
import  type { systemdetatype } from "../poll.js";
export type subscribestatics = (staic: systemdetatype) => void;
export type staticdatafunreturen = { ram: number; cpu: string; os: string };
export type ostype = typeof process.platform;

export type polltye = {
  subscribestatics: (callback: subscribestatics) => void;
  getstaticdata: () => Promise<staticdatafunreturen>;
  sendsystemmodel: () => Promise<ostype>;
};
export type functionnames = keyof polltye;
export type renderrpassnames = "statsdata";

export function sendhandlefunction<objreturn>(
  name: functionnames,
  handler: (event: IpcMainInvokeEvent) => objreturn
) {
  Electron.ipcMain.handle(name, handler);
}
// Source - https://stackoverflow.com/a/42724170
// Posted by Lucas
// Retrieved 2026-01-28, License - CC BY-SA 3.0

function foo<T extends { baz: number }>(bar: T): void {
  console.log(bar.baz);
}

foo({ baz: 8, hh: "lo" });
export function sendwebcontentsrenderer(
  name: renderrpassnames,
  brwserwebcontext: Electron.WebContents,
  systemdetails: string | object
) {
  brwserwebcontext.send(name, systemdetails);
}
export function validateurl(frame: WebFrameMain | null) {
  //. us3ed to check the malvrous acytivitte. and perotectfrom. hackers

  console.log("kk");
  if (!frame?.url) return;
  console.log(frame?.url, "isd frame ", new URL(frame?.url).host); //http://localhost:5123/ isd frame  localhost:5123
  console.log("jj");

  if (Checkdev() && new URL(frame?.url).host == "localhost:5123") {
    console.log(url.pathToFileURL(getapppath()).toString(), "is path to uerl "); //file:///Users/adhilhabeebi/Downloads/eletronapp/distreactele/index.html is path to uerl

    return;
  } else {
    if (frame.url !== url.pathToFileURL(getapppath()).toString()) {
      throw Error("");
    }
    console.log(url.pathToFileURL(getapppath()), "is path to uerl ");
  }
  // Use url.pathToFileURL to convert it
}
