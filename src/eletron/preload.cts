

import eletron from "electron";
   type subscribestatics=(staic:any)=>void
eletron.contextBridge.exposeInMainWorld("electron", {
  subscribestatics: (callback: subscribestatics) => {

    // sendreltime  i renderer
    eletron.ipcRenderer.on("statsdata", (event: any, statics: any) => {
      // console.log("sending data to callback ",statics)

      callback(statics);
    });
        //. send realtie. data to r

  }, 

  getstaticdata: () => eletron.ipcRenderer.invoke("getstaticdata"),
  sendsystemmodel: () => eletron.ipcRenderer.invoke("sendsystemmodel")
});
