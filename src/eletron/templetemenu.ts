import { app, Menu, shell } from "electron";
import Electron from "electron";
import { sendhandlefunction, sendingmenu, sendwebcontentsrenderer } from "./utils/types.js";
const isMac = process.platform === "darwin";
 
let value:sendingmenu ="ram"



function createapplicationmenu(mainwidth: Electron.BrowserWindow) {

  sendhandlefunction<sendingmenu>("sendsystemmodel", () => {
        return value

    })

function createsubmenu(e:sendingmenu):any[] {

  if (e=="Account Options") {
    return[  {
          label: "logout ",
          
          click: () => {
            mainwidth.webContents.send("logout-user");
          },
        },]
  }



  return[]
  
}
let send: sendingmenu[] = ["ram", "cpu","Account Options"];
let ma: Electron.MenuItemConstructorOptions[] = send.map(
  (e) => {
    return {
      label: e,
      click: () => {
        console.log("clicked")
        value=e;
        sendwebcontentsrenderer("menuselected",mainwidth.webContents,e)
        


      },
      submenu:createsubmenu(e)
    };
  }
) 


  const template: Electron.MenuItem | Electron.MenuItemConstructorOptions[] = [
...ma,
    {
      label: isMac ? " " : "websitemakerapp",
      submenu: [
        {
          label: "close ",
          role: "hide",
          click: () => {
            mainwidth.hide();
          },
        },
        {
          label: "open",
          click: () => {
            mainwidth.show();
            // Optional: Bring the window to the front
            mainwidth.focus();
          },
        },
      ],
    },

    {
      role: "help",
      type: "submenu",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal("https://electronjs.org");
          },
          submenu: [
            {
              label: "contact developer",
              click: async () => {
                await shell.openExternal("");
              },
            },
          ],
        },
      ],
    },
  ];

  const appmeutemplete = Menu.buildFromTemplate(template);

  return appmeutemplete;
}

export { createapplicationmenu };
