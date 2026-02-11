export let mobileik = {
  x: 393,
  y: 852,
};

export function isStringInteger(str: any) {
  if (typeof str != "string" || str.trim() === "") return false;
  return Number.isInteger(Number(str));
}

export type checkretur = {
  status: boolean;
  valueas: string;
};
export function checkitisinwidth(
  name: string,
  value: string,
  maxwidth: number,
  checkedasmobile: Boolean,
): checkretur {
  switch (name) {
    case "width":
      

      let parsevalue = parseInt(value);

      if (parsevalue > maxwidth) {
        return { status: false, valueas: value };
      }
      return { status: true, valueas: value };
      break;

    default:
      return { status: true, valueas: value };
      break;
  }
}

export function checkisvwandconverttomobilescerrrnwidth(
  name: string,
  value: string ,
  maxwidth: number,
  checkedasmobile: Boolean,
):string {

switch (name) {
  case "width":
    
  if (value.includes("vw") && checkedasmobile) {
    console.log("has vwwwww")
        let mobilx = mobileik.x;
        let onemob = mobilx / 100;

        let vwvaluepar = parseInt(value);

     
        let newvwforscreenmobile = onemob * vwvaluepar + "px";
        return newvwforscreenmobile;
      }
      return value
    break;

  default:
    return value
    break;
}

}


export function clamp(num:number, min:number, max:number) {
  return Math.min(Math.max(num, min), max);
}

 export function createElementsFromMap(map:Map<string,Record<string,string>>,addbutton:(ele:string,data:Record<string,any>)=>void) {
  let parent=document.body
console.log(addbutton,"is add button")
  map.forEach((data, key) => {

    console.log(data,"isthe data",key)
    let elemt:string=data.name?.split("").filter(el =>!isStringInteger(el)).join("") 
    addbutton(elemt,data)
    console.log(elemt,"is teh lement")
//     const element = document.createElement(elemt);
// Object.entries(data).forEach((el:any)=>{
//   let [name,value]=el
// element.style[name]=value

// })
// element.style.position="absolute"
    // // optional id
    // el.id = key;

    // // text
    // if (data.text) element.innerHTML = data.text;

    // // // styles
    // // if (data.styles) {
    // //   Object.assign(el.style, data.styles);
    // // }

    // parent.appendChild(element);
  });
}



export function createhtml(
  mobilemap: Map<string, any>,
  lapmap: Map<string, any>
) {
  const mobileData = JSON.stringify(Array.from(mobilemap.entries()));
  const lapData = JSON.stringify(Array.from(lapmap.entries()));

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dynamic Elements</title>
</head>

<body>
  <div id="app"></div>

  <script>
    /* ---------------- DATA ---------------- */

    const mobileMap = new Map(${mobileData});
    const lapMap = new Map(${lapData});

    /* ---------------- HELPERS ---------------- */

    function isMobile() {
      return window.innerWidth <= 768;
    }

    function clearUI() {
      const app = document.getElementById("app");
      if (app) app.innerHTML = "";
    }

    const VALID_TAGS = new Set([
      "div", "p", "span", "button", "img",
      "section", "article", "header", "footer"
    ]);

    function buildUIFromMap(map) {
      const app = document.getElementById("app");
      if (!app) return;

      const arrayFromMap = Array.from(map.entries());

      arrayFromMap.forEach(([key, config]) => {
        // Extract tag name from key (div1 → div, p2 → p)
        const rawTag = key.replace(/\\d+/g, "").toLowerCase();
        const tag = VALID_TAGS.has(rawTag) ? rawTag : "div";

        const el = document.createElement(tag);
        el.id = key;

        if (config.text) {
          el.textContent = config.text;
        }

        for (const prop in config) {
          if (prop === "text" || prop === "name") continue;

          // Special handling for img src
          if (prop === "src" && tag === "img") {
            el.src = config[prop];
            continue;
          }


          // Apply only valid style properties
          if (prop in el.style) {
          if(prop === "left"){
          console.log((window.innerWidth/100)*parseInt(config[prop]),"issss",config[prop])

        el.style[prop]=    (window.innerWidth/100)*parseInt(config[prop])+"px";
       continue;
          }
            el.style[prop] = config[prop];
          }
        }

        app.appendChild(el);
      });
    }

    function buildUI() {
      clearUI();
      const activeMap = isMobile() ? mobileMap : lapMap;
      buildUIFromMap(activeMap);
    }

    /* ---------------- LIFECYCLE ---------------- */

    document.addEventListener("DOMContentLoaded", buildUI);

    // Debounced resize (important for performance)
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildUI, 150);
    });
  </script>
</body>
</html>`;
console.log(html,"is html")
  return html;
}
