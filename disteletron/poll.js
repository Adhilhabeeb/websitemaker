import osutils from "os-utils";
import os from "node:os";
import { sendwebcontentsrenderer } from './utils/types.js';
let int = 500;
export async function poll(browserw) {
    let systemdetails = {
        cpuusegae: 0,
        cpuufree: 0,
        storagdetails: {
            total: 0, available: 0, free: 0
        }
    };
    //  systemdetails["storagdetails"]= await getdatadetsails()
    systemdetails["cpuusegae"] = await gpuuseage();
    systemdetails["cpuufree"] = getfree();
    let systemspeci = staticdata();
    systemdetails = { ...systemdetails, ...systemspeci };
    setInterval(() => {
        //. send realtie. data to renderer
        // browserw.webContents.send("statsdata",systemdetails)
        sendwebcontentsrenderer("statsdata", browserw.webContents, systemdetails);
        //. send realtie. data to r
    }, int);
    return systemdetails;
}
function staticdata() {
    let ooss = os.cpus()[0].model;
    return { os: ooss, ram: osutils.totalmem() / 1024 };
    console.log(ooss, "andd", osutils.totalmem() / 1024);
}
function gpuuseage() {
    return new Promise((res, rej) => {
        osutils.cpuUsage(res);
    });
}
function getcpufree() {
    return new Promise((res, rej) => {
        osutils.cpuFree(res);
    });
}
function getfree() {
    return osutils.freememPercentage();
}
async function getdatadetsails() {
    // 1 kilobyte = 1024 bytes, 1 megabyte = 1024 kilobytes, 1 gigabyte = 1024 megabytes,
    //  let { available , free, total } =await disk.check(process.platform=="win32"?'C://':'/')
    //    console.log(Math.floor(total/1_000_000_000),"is totao",free /1_000_000_000,"ava:",available /1_000_000_000)
    // return  {available,free,total}
}
