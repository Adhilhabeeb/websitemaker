import osutils from "os-utils"
// import fs from "node:fs"
import os from "node:os"
import { BrowserWindow } from "electron"

import  {sendwebcontentsrenderer} from'./utils/types.js'
let int=500
let systemdetails={
    cpuusegae :0,
    cpuufree:0,
  os:"",ram:1
}
export type systemdetatype=typeof systemdetails

   export  async function poll(browserw:BrowserWindow) {


//  systemdetails["storagdetails"]= await getdatadetsails()
    

   

    
    systemdetails["cpuufree"] =  getfree();

  let systemspeci= staticdata()
  systemdetails={...systemdetails,...systemspeci}
// type  jj=typeof systemdetails

  setInterval(async ()=>{ 
  
    systemdetails["cpuusegae"] =await  gpuuseage();
 
    //. send realtie. data to renderer
// browserw.webContents.send("statsdata",systemdetails)
sendwebcontentsrenderer("statsdata",browserw.webContents,systemdetails)

 //. send realtie. data to r
  },int)

    return systemdetails;
}



function staticdata() {
    let ooss=os.cpus()[0].model
    return {os:ooss,ram:osutils.totalmem()/1024};
    console.log(ooss,"andd",osutils.totalmem()/1024)
}

  function gpuuseage() :Promise<any>{
    


    return  new Promise((res)=>{
    osutils.cpuUsage(res)
// console.log(`Current CPU usage: ${process.getCPUUsage()}%`);
    })
}

// function getcpufree() {
    
//     return new Promise((res,rej)=>{

//         osutils.cpuFree(res)
//     })
    
// }
function getfree() {
return osutils.freememPercentage()
}

//  async function getdatadetsails() {
    

// // 1 kilobyte = 1024 bytes, 1 megabyte = 1024 kilobytes, 1 gigabyte = 1024 megabytes,
// //  let { available , free, total } =await disk.check(process.platform=="win32"?'C://':'/')
// //    console.log(Math.floor(total/1_000_000_000),"is totao",free /1_000_000_000,"ava:",available /1_000_000_000)
// // return  {available,free,total}
// }