import   electron from "electron"

  export type subscribestatics=(staic:any)=>void

 export type polltye={
    subscribestatics:(callback:subscribestatics)=>void,
    getstaticdata:()=>Promise<any>,
    sendsystemmodel:()=>Promise<any>
}

 export type functionnames=keyof  polltye;
export  type  renderrpassnames="statsdata"


 export function sendwebcontentsrenderer(name:renderrpassnames,brwserwebcontext:Electron.WebContents,systemdetails:string | object) {
brwserwebcontext.send(name,systemdetails)
    
 }