import React, { useContext, useMemo, useState, useTransition } from 'react'
import { Button } from './components/ui/button';
import { NavContext } from './App';
import { createhtml, createViewDesignHtml, mobileik } from './utils/vierw';

 function Designviewer({mobref,lapref}:{
  
 mobref:React.RefObject< Map<string, any>>
 lapref:React.RefObject< Map<string, any>>
}) {
  let[pending,starttransition]=useTransition()
let  context=useContext(NavContext)
if (!context) {
  throw Error("soem thing error")
  
}
let {mode}=context


let html=useMemo( ()=>{

 return  createViewDesignHtml(mobref.current,lapref.current,mode) 

},[mode])
console.log(  html,"is html")
  return (
    <div className='w-full h-[90vh] min-h-["90vw"] bg-amber-300'>
   <div
  style={{
   width: mode === "mobile" ? "375px" : "100%",
    margin: "auto",
 
  }}
>
  <iframe  style={{ width: mode === "mobile" ? "375px" : "100vw",minHeight: mode === "mobile" ? mobileik.y+"px" : "100vh",border:"1px solid black"}} srcDoc={ html} />
</div>
    </div>
  )
}

export default Designviewer