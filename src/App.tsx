import {  useEffect, useLayoutEffect, useState } from 'react'
 import  type {polltye} from "./eletron/utils/types"
import './App.css'
 declare global {
    
    interface Window { adhil: polltye  }
}



function App() {
  const [count, setCount] = useState(0)
  const [data, setdata] = useState<unknown>()
  const [chargingstatus, setchargingstatus] = useState({
    charging:"not",
    percentage:0

  })  ;


// Source - https://stackoverflow.com/a
// Posted by Anwar, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-20, License - CC BY-SA 4.0
useLayoutEffect(() => {
  if ('getBattery' in navigator) {

   (navigator as any).getBattery().then(function(battery:any

    ) {
      console.log(battery,"is battery")
        function updateBatteryStatus() {
            // Get the battery percentage (value between 0.0 and 1.0)
            const percentage = battery.level * 100;
            console.log(`Battery Level: ${percentage.toFixed(0)}%`);
      
            // Check charging status
            const charging = battery.charging ? 'Charging' : 'Not Charging';
            console.log(`Status: ${charging}`);
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
    console.log("Battery Status API not supported in this browser.");
}



  

}, [])



useEffect(() => {
// console.log("data", data)
}, [data])


  return (
    <>
      

      <div className="card"> 
         Battery percentage      {chargingstatus.percentage} <br/>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}

    


        </button>
        <button>

   {chargingstatus.charging}

        </button>
        <p>jjjj
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
