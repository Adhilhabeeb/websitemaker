import React, { useEffect, useState } from 'react'
import { cssdefalult, type eleent } from './utils/cssdefault'
import ButtonEditor from './custemmenu'

type propsva={
    slecetdelemnt:string |null,
    elenttype:string |null,
    checkedasmobile:Boolean,
    setmobarr:Set<any>,
     mapref:Map<string,any>,
    
}
function Rightchangingoption({slecetdelemnt,elenttype,checkedasmobile,setmobarr,mapref}:propsva) {
const [csscustem, setcsscustem] = useState<Record<string,string|number>|null>(null)
  const [va, setva] = useState("")

    useEffect(() => {

      
  if (slecetdelemnt &&elenttype ) {
    
console.log(slecetdelemnt,"is slett current")

let maindiv=document.querySelector(`#${slecetdelemnt}`)


let elemet =maindiv?.querySelector(`#${slecetdelemnt}`) as HTMLElement

console.log(elemet,"us teh elemy ",maindiv)
let value=Object.entries(cssdefalult[elenttype]).map(([name,value]:any)=>[name,elemet?.style[name]])
let objectwithvalues=Object.fromEntries(value)
setcsscustem(objectwithvalues)
  }
    }, [slecetdelemnt,elenttype])
    
  return (
    <div>
      
        <div className=' w-1/3  absolute top-15  right-0   fixed bg-amber-50  z-30 '> 
          
        <ButtonEditor  mapref={mapref} setmobarr={setmobarr} checkedasmobile={checkedasmobile} csscustem={csscustem} elenttype={elenttype}  slecetdelemnt={slecetdelemnt} />
        </div>
    </div>
  )
}

export default Rightchangingoption
