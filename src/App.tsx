import {   useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
 import  type {polltye} from "./eletron/utils/types"
import './App.css'

import Chartt from './Chart';
import type { systemdetatype } from './eletron/poll';

import DragableBox from './Dragable';
 declare global {
    
    interface Window { adhil: polltye  }
}


// function add(pa: Function) {
//   let i = 0;
//   return (b: any) => {
//     i = b;
//     return pa((z: any) => {
//       return i * z;
//     });
//   };
// }
let lengh=10

function App() {

  let vedioref=useRef<HTMLVideoElement >(null)
  let video=vedioref.current
  // console.log("app renered")
  const [value, setvalue] = useState("")
  let valuesent=useRef<systemdetatype >(null)
  const [system, setsystem] = useState<systemdetatype[]>([])
  // const [dounceva, setdounceva] = useState<any>("")
  const [count, setCount] = useState<number>(0)
  // const [data, setdata] = useState<unknown>()
  const [chargingstatus, setchargingstatus] = useState({
    charging:"not",
    percentage:0

  })  ;
  let  lastalue=useRef(0)

let handleclick=useCallback(()=>{
  setCount(count+1)
        // console.log("clidked",count)
      },[])

 useEffect(() => {
   let datenw=Date.now()

let check=datenw-lastalue.current
if (check >800) {
  // console.log("chek",check)
  lastalue.current=datenw;
  
}




 
 }, [value])
 
// Source - https://stackoverflow.com/a
// Posted by Anwar, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-20, License - CC BY-SA 4.0
useLayoutEffect(() => {
  if ('getBattery' in navigator) {

   (navigator as any).getBattery().then(function(battery:any

    ) {
      // console.log(battery,"is battery") 
        function updateBatteryStatus() {
            // Get the battery percentage (value between 0.0 and 1.0)
            const percentage = battery.level * 100;
            // console.log(`Battery Level: ${percentage.toFixed(0)}%`);
      
            // Check charging status
            const charging = battery.charging ? 'Charging' : 'Not Charging';
            // console.log(`Status: ${charging}`);
            setchargingstatus({
              percentage,charging
            })
        }

        // Initial update
        updateBatteryStatus();

        // Add event listeners to monitor changes
        battery.addEventListener('levelchange', updateBatteryStatus);
        battery.addEventListener('chargingchange', updateBatteryStatus);
    });
} else {
    // console.log("Battery Status API not supported in this browser.");
}

// function add(pa: Function) {
//   let i = 0;
//   return (b: any) => {
//     i = b;
//     return pa((z: any) => {
//       return i * z;
//     });
//   };
// }
// console.log("is called")

return  window.adhil.subscribestatics((f)=>{

  valuesent.current=f
setsystem((prev)=>{
  let da=[...prev,f]
  
  if (da.length>lengh) {
  da.splice(0, 1);
  }

return da

})
 

})
}, [])






  return (
    <>
      

      <div className="card"> 
    <DragableBox/>
         Battery percentage      {chargingstatus.percentage} <br/>
        <button onClick={() => {
handleclick()
           navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: {
      width: 320,
      height: 240,
      frameRate: 30
    }
  }).then(stream => {
   if (video) {
     video.srcObject = stream
    video.onloadedmetadata = () => video.play()
   }
  }).catch(e => console.log(e))

        }

        }>
          count is {count}

    


        </button>
        <button >

   {chargingstatus.charging}

        </button>
         <video ref={vedioref} width="320" height="240" autoPlay></video>
        <p>jjjj
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <input  value={value} onChange={(e)=>{
        setvalue(e.target.value)
      }} />
      <p className="read-the-docs">
        {/* {dounceva} */}
        Click on the Vite and React logos to learn more
      </p>
      <Chartt data={system} />
    </>
  )
}

export default App
