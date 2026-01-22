

import eletron from "electron";
import {polltye,functionnames} from "./utils/types"
   type subscribestatics=(staic:any)=>void


let functionpass: polltye={
  subscribestatics: (callback) => {

    // sendreltime  i renderer
    eletron.ipcRenderer.on("statsdata", (event: any, statics: any) => {
      // console.log("sending data to callback ",statics)

      callback(statics);
    });
        //. send realtie. data to r

  }, 

  getstaticdata: () =>ipcrendererinvoke("getstaticdata"),
  sendsystemmodel: () =>  ipcrendererinvoke("sendsystemmodel")
  
  
}

eletron.contextBridge.exposeInMainWorld("adhil", functionpass);





function ipcrendererinvoke(params:functionnames) {
  return    eletron.ipcRenderer.invoke(params)
}