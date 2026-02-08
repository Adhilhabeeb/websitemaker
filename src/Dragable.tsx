import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { usemouse } from './mousemove'
import { isStringInteger, mobileik } from './utils/vierw'
import { cssdefalult , type eleent} from './utils/cssdefault'
import Rightchangingoption from './Rightchangingoption'

interface dragboxprop{
  checkedasmobile:boolean
}


function DragableBox(props:any) {
const [slecetdelemnt, setslecetdelemnt] = useState<string |null>(null)
const [elenttype, setelenttype] = useState<string|null>(null)
const [showsidemenu, setshowsidemenu] = useState(false)
const [va, setva] = useState("")

const mobMapRef = useRef<Map<string,any>>(new Map())
let mapref=mobMapRef.current
  let mobileviewleft=useMemo(()=>{


    
return (window.innerWidth/2)-(mobileik.x/2)

  },[])
useEffect(() => {
  if (slecetdelemnt) {

   let elemt:string=slecetdelemnt?.split("").filter(el =>!isStringInteger(el)).join("") 
   setelenttype(elemt)
  }
  return()=>{
    setshowsidemenu(false)
  }
}, [slecetdelemnt])



  const [rectvaluesofdivmob, setrectvaluesofdivmob] = useState<object>();


let  divmobilebg=useRef<HTMLDivElement |null >(null) 
let {checkedasmobile}=props
// console.log(props,"is yyyy")
  let countref=useRef(0)
  const [setaray, setsetaray] = useState(new Set())
  // const [setmobarr, setsetmobarr] = useState(new Set())
  let setmobarr=useRef<Set<any>>(new Set())
  let ref=useRef<HTMLDivElement >(null)
  
let {buttonlap,buttonmob}=useMemo(()=>{
  let buttonmob=document.createElement("button")
  buttonmob.style.width="100px"
  buttonmob.style.height="40px"
buttonmob.innerText="btnmob"
buttonmob.style.border="1px solid black"
  buttonmob.style.position="absolute"
  buttonmob.style.left="3%"
  buttonmob.style.top="0%"
document.body.appendChild(buttonmob)
  let buttonlap=document.createElement("button")
  buttonlap.style.width="393px"
  buttonlap.style.height="30px"
buttonlap.innerText="btnlapp"
buttonlap.style.border="1px solid black"
  buttonlap.style.position="absolute"
  buttonlap.style.left="0%"
  buttonlap.style.top="4%"
document.body.appendChild(buttonlap)
return {buttonlap,buttonmob}
},[])

let move=usemouse({buttonlap,buttonmob,checkedasmobile,divmobilebg})
  


useEffect(() => {
  

}, [slecetdelemnt])


useEffect(()=>{
 
let rect =divmobilebg.current?.getBoundingClientRect()
console.log(rect,"isrect in drrr")


},[checkedasmobile])

// console.log(move,"is move")

  function addbbutton(ele:eleent="button") {
    countref.current++
    // setaray.add(JSON.stringify({name:"adhil"}))
    // setaray.add({name:"alfin"})

    // console.log(setaray,
    //   "is setarray",setaray.has(JSON.stringify({name:"aby"}))
    // )

let button=document.createElement(ele)
console.log(ele,"is elemeyt")



button.id=ele+countref.current.toString()
let elemntydefauly=cssdefalult[ele]

button.innerText=ele+countref.current.toString()
// console.log(button,"is el;eem t")
// button.style.width = "100px";
// button.style.height = "30px";
//setting fdefalut values to element
Object.entries(elemntydefauly).forEach((el:any)=>{
  let [name,value]=el
button.style[name]=value

})




// console.log(countref.current,"ius refcount")
// button.id=ele+countref.current.toString()
// button.dataset.name=ele+countref.current.toString()

// button.style.backgroundColor = "#2563eb"; // blue

// button.style.fontSize = "16px";
// button.style.cursor = "pointer";


//

let keys=Object.entries(elemntydefauly).map((el:any)=>{
  let [name,value]=el
return [name,button.style[name]]

})
let objectcustempro=Object.fromEntries(keys)

let objset={
  name:button.dataset.name,
  left:button.style.left,
  right:button.style.right,
  top:button.style.top,
  bottom:button.style.bottom,
...objectcustempro
}
console.log(objset,"is object custem proo")
setaray.add(JSON.stringify(objset))

console.log(objset,"is the objeset")

//
// document.body.appendChild(button)

let hr=document.createElement("div")
hr.style.backgroundColor="red"
hr.style.width="1000px"
hr.style.height="1px"
hr.style.display="none"
hr.style.position = "absolute";
hr.style.left = "0px";
hr.style.top = "0px";
hr.id="hrids  hrtop"
let hr2=document.createElement("div")
hr2.style.backgroundColor="blue"
hr2.style.width="1000px"
hr2.style.height="1px"
hr2.style.display="none"
hr2.style.position = "absolute";
hr2.style.left = "0px";
hr2.style.top = "0px";
hr2.id="hrids hrbottom"

let hr3=document.createElement("div")
hr3.style.backgroundColor="green"
hr3.style.width="1px"
hr3.style.height=(window.innerHeight/3)+"px"
hr3.style.display="none"
hr3.style.position = "absolute";
hr3.style.left = "0px";
hr3.style.top = "0px";
hr3.id="hrids hrleft"

let hr4=document.createElement("div")
hr4.style.backgroundColor="violet"
hr4.style.width="1px"
hr4.style.height=(window.innerHeight/3)+"px"
hr4.style.display="none"
hr4.style.position = "absolute";
hr4.style.left = "0px";
hr4.style.top = "0px";
hr4.id="hrids hrright"

let div=document.createElement("div")
div.id=ele+countref.current.toString()
div.dataset.name=ele+countref.current.toString()
div.style.position = "absolute";
div.style.left = "0px";
div.style.top = "0px";
div.append(hr,hr2,hr3,hr4,button)
document.body.appendChild(div)
setslecetdelemnt(div.dataset.name)
move(div,div,hr,hr2,hr3,hr4,setaray,button,checkedasmobile,setslecetdelemnt,setmobarr.current,mapref)

  }
  function DraggableEventHandler(e:any,data:any) {
    console.log(e,
      "isn eeeeee",data
    )
  }
  return (
< >


<div className='w-full  flex justify-around'>
   <button onClick={addbbutton.bind(null,"button")} className=" underline bg-cyan-100 ">button</button>
        <button onClick={addbbutton.bind(null,"div")} className=" underline  bg-pink-500 ">div</button>
</div>
     

      <button className=' bg-amber-800' onClick={()=>setshowsidemenu(!showsidemenu)} >showsidemenu</button>     <div  style={{
      display:checkedasmobile?"block":"none",
     position:"absolute",
     width:`${mobileik.x}px`,
  minHeight:`${mobileik.y}px`,
  left:`${mobileviewleft}px`,
     background:"red",top:"10%"
     }} ref={ divmobilebg}>kjlkj</div>
    
              
        
    { showsidemenu &&<Rightchangingoption mapref={mapref}   setmobarr={setmobarr.current}  checkedasmobile={checkedasmobile}   slecetdelemnt={slecetdelemnt}  elenttype={elenttype} />}
    

      </>
  )
}



export default  memo(DragableBox)