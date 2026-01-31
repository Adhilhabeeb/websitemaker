

import eletron from "electron";
import {polltye,functionnames} from "./utils/types.js"
import { systemdetatype } from "./poll.js";
   type subscribestatics=(staic:any)=>void


let functionpass: polltye={
  subscribestatics: (callback) => {
let fun=(event: any, statics: systemdetatype) => {
      // console.log("sending data to callback ",statics)
// console.log(callback,"kk",statics)
      callback(statics);
    }
    // sendreltime  i renderer
     eletron.ipcRenderer.on("statsdata",fun);   //. send realtie. data to r
     
return ()=>  eletron.ipcRenderer.off("statsdata",fun );
  }, 

  getstaticdata: () =>ipcrendererinvoke("getstaticdata"),
  sendsystemmodel: () =>  ipcrendererinvoke("sendsystemmodel")
  
  
}

eletron.contextBridge.exposeInMainWorld("adhil", functionpass);






 function ipcrendererinvoke(params:functionnames) {

  return    eletron.ipcRenderer.invoke(params)
} 