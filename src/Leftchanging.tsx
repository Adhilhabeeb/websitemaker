import React from 'react'
import CustemRight from './CustemRight'

function Leftchanging({addbbutton,setshowpanel}:{

  addbbutton:Function,setshowpanel:Function
}) {
  return (
     <div className=' w-auto  absolute top-15  left-0   fixed bg-amber-50  z-30 '> 
          
<CustemRight setshowpanel={setshowpanel} addbbutton={addbbutton}/>
    </div>
  )
}

export default Leftchanging
