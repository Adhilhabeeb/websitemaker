import React, { memo, useCallback, useEffect, useEffectEvent, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { usemouse } from './mousemove'
import { createElementsFromMap, createhtml, cssproper, isStringInteger, mobileik } from './utils/vierw'
import { cssdefalult , type eleent} from './utils/cssdefault'
import Rightchangingoption from './Rightchangingoption'
import Leftchanging from './Leftchanging'

interface dragboxprop{
  checkedasmobile:boolean
}


function DragableBox(props:any) {
const [slecetdelemnt, setslecetdelemnt] = useState<string |null>(null)
const [elenttype, setelenttype] = useState<string|null>(null)
const [showsidemenu, setshowsidemenu] = useState(false)
const [va, setva] = useState("")


const [recentbuttonhold, setrecentbuttonhold] = useState(false)














let recentscountref=useRef(0)
let currenthistoryref=useRef(0)
let currenthistory=currenthistoryref.current
let navref=useRef<HTMLDivElement|null>(null)
let mobileoldmapstoreing= useRef <Map<string,any>>(new Map())
let oldmobmap=mobileoldmapstoreing.current
const mobMapRef = useRef<Map<string,any>>(new Map())
let mapref=mobMapRef.current
const lapMapRef = useRef<Map<string,any>>(new Map())
let lapref=lapMapRef.current
let historytmapref=useRef<Map<number,any>>(new Map())
let historymap=historytmapref.current


useEffect(() => {

  let oldmovbva=  Array.from(oldmobmap)
let mobmapva= Array.from(mapref)
let lapva=  Array.from(lapref)
  
  let historyobj={
    mapref:mobmapva,
    lapref:lapva,
    oldmobmap:oldmovbva
  }

  let stringhistroyobj=JSON.stringify(historyobj)
console.log(historyobj,"is obj")
historymap.set(currenthistory,stringhistroyobj)


// console.log(historymap,"is histiiorry")

},[currenthistory])




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
let {checkedasmobile,  children}=props




let timeout;






useEffect(() => {
 let parsedhsitoryu= JSON.parse(  historymap.get(recentscountref.current))



 console.log(historymap,"is history mappp")
console.log(parsedhsitoryu,"ius patrsed ")
if(recentscountref.current !=0 &&recentbuttonhold){
if (parsedhsitoryu.lapref.length>0 && !checkedasmobile
) {


  console.log(parsedhsitoryu.lapref,"qfftettryhriiiiiiiiiiiiiiiiii")

    setslecetdelemnt(null)
    const root = document.getElementById("root");
let divmob=document.getElementById("divrect")
Array.from(document.body.children).forEach(el => {
  if (el !== root &&  el !==divmob) {
    el.remove();
  }
});

  console.log(parsedhsitoryu.lapref,"afterr quuiiiiiii")

console.log(lapref,"is new lapref after changed ")
// console.log(parsedhsitoryu.lapref,"lapppppppppp")

// let laprefar=Array.from(parsedhsitoryu.lapref)

parsedhsitoryu.lapref.map((el:any)=>{
let [name,obj]:[string,Record<string,any>]=el;
let oldobj={...obj}
let navbar=navref.current
let navbarprops=navbar?.getBoundingClientRect().height as number

let topnavinpercentage=(navbarprops/ document.documentElement.clientHeight) * 100 
oldobj.top=parseInt(oldobj.top)+topnavinpercentage+"%"
   let elemt:string=name?.split("").filter(el =>!isStringInteger(el)).join("") 
addbbutton(elemt,oldobj)
// // console.log(obj,"snew and old: ",oldobj, name,navbarprops,"is navbarr",obj.top)
// // console.log(lapref,"is laprefff")
// lapref.set(name,oldobj)
//  console.log(lapref,"is after  laprefff")


})
  

lapref=new Map(parsedhsitoryu.lapref)

console.log(lapref,"is arrrr afterall",recentscountref.current)
}



}

}, [recentscountref.current])





function handlerecent(e:React.MouseEvent<SVGSVGElement>) {

setrecentbuttonhold(true)
timeout=setTimeout(() => {
  setrecentbuttonhold(false)
}, 700);

if (e.currentTarget.id=="+") {
  if (historymap.get(recentscountref.current+1)) {
 recentscountref.current++
  
}
}else{
  if (historymap.get(recentscountref.current-1)) {

 recentscountref.current--
  
}
}

}


// console.log(props,"is yyyy")
  let countref=useRef(0)
  const [setaray, setsetaray] = useState(new Set())
  // const [setmobarr, setsetmobarr] = useState(new Set())
  let setmobarr=useRef<Set<any>>(new Set())
  let ref=useRef<HTMLDivElement >(null)
  


  
let {buttonlap,buttonmobb}=useMemo(()=>{
  let buttonmobb=document.createElement("button")
  buttonmobb.style.width="100px"
  buttonmobb.style.height="40px"
buttonmobb.innerText="btnmob"
buttonmobb.style.border="1px solid black"
  buttonmobb.style.position="absolute"
  buttonmobb.style.left="0%"
  buttonmobb.style.top="0%"
// document.body.appendChild(buttonmobb)
  let buttonlap=document.createElement("button")
  buttonlap.style.width="393px"
  buttonlap.style.height="30px"
buttonlap.innerText="btnlapp"
buttonlap.style.border="1px solid black"
  buttonlap.style.position="absolute"
  buttonlap.style.left="0%"
  buttonlap.style.top="4%"
// document.body.appendChild(buttonlap)
return {buttonlap,buttonmobb}
},[])
let buttonmob:HTMLElement=useRef(buttonmobb).current as HTMLElement
let move=usemouse({buttonlap,buttonmob,checkedasmobile,divmobilebg,currenthistoryref,recentscountref})
  




const [showpanel, setshowpanel] = useState(false)

// console.log(move,"is move")

  function addbbutton(ele:eleent="button",data:Record<string,string> |null,e?:React.MouseEvent<HTMLElement>,) {
console.log(data,"is teh adtatattatata",currenthistoryref,"is ref")

if (data) {
console.log(data,"data return")

 
}
    countref.current++
    // setaray.add(JSON.stringify({name:"adhil"}))
    // setaray.add({name:"alfin"})

    // console.log(setaray,
    //   "is setarray",setaray.has(JSON.stringify({name:"aby"}))
    // )

let button=document.createElement(ele)
// console.log(ele,"is elemeyt")
if (ele=="input") {
let input=button as HTMLInputElement
input.placeholder="Enter value here "
// input.value="adjik"
}



button.id=  data?.name??  ele+countref.current.toString()
let elemntydefauly= data ??  cssdefalult[ele]
if (elemntydefauly?.text&&elemntydefauly?.text.trim()!="") {
  button.innerText=elemntydefauly.text
}
// console.log(button,"is el;eem t")
// button.style.width = "100px";
// button.style.height = "30px";
//setting fdefalut values to element

console.log(elemntydefauly,"is thje elent data")
Object.entries(elemntydefauly).forEach((el:any)=>{
  let [name,value]=el
  // console.log(name,"is ythe name ")
  
button.style[name]=value

})

button.style.position="absolute";



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
  name:data?.name?? button.dataset.name,
  left:button.style.left,
  right:button.style.right,
  top:button.style.top,
  bottom:button.style.bottom,
...objectcustempro
}
// console.log(objset,"is object custem proo")
setaray.add(JSON.stringify(objset))

// console.log(objset,"is the objeset")

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
hr.style.zIndex = "87999";

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
hr2.style.zIndex = "87999";

let hr3=document.createElement("div")
hr3.style.backgroundColor="green"
hr3.style.width="1px"
hr3.style.height=(window.innerHeight/3)+"px"
hr3.style.display="none"
hr3.style.position = "absolute";
hr3.style.left = "0px";
hr3.style.top = "0px";
hr3.id="hrids hrleft"
hr3.style.zIndex = "87999";
let hr4=document.createElement("div")
hr4.style.backgroundColor="violet"
hr4.style.width="1px"
hr4.style.height=(window.innerHeight/3)+"px"
hr4.style.display="none"
hr4.style.position = "absolute";
hr4.style.left = "0px";
hr4.style.top = "0px";
hr4.id="hrids hrright"
hr4.style.zIndex = "87999";


let div=document.createElement("div")
div.id=  data?.name??  ele+countref.current.toString()
div.dataset.name= data?.name??  ele+countref.current.toString()
div.style.position = "absolute";
div.style.width="auto"
div.style.height="auto"


div.style.left = data?.left ?? "0px";
div.style.top = data?.top?? "0px";
div.append(hr,hr2,hr3,hr4,button)
document.body.appendChild(div)
setslecetdelemnt(div.dataset.name)
console.log(currenthistoryref.current,"in histoy")
move(div,div,hr,hr2,hr3,hr4,setaray,button,checkedasmobile,setslecetdelemnt,setmobarr.current,mapref,navref,lapref,oldmobmap)


console.log(lapref,"after adding button ")
  }

useEffect(() => {  
  let navbar=navref.current
let navbarprops=navbar?.getBoundingClientRect().height as number
 setshowsidemenu(false)
 setshowpanel(false)
  if(checkedasmobile){

createElementsFromMap(oldmobmap,addbbutton,navbarprops)
console.log(oldmobmap,"is my ioldmaooo")
  }else{
    createElementsFromMap(lapref,addbbutton,navbarprops)
  }


 

  return () => {
    setslecetdelemnt(null)
    const root = document.getElementById("root");
let divmob=document.getElementById("divrect")
Array.from(document.body.children).forEach(el => {
  if (el !== root &&  el !==divmob) {
    el.remove();
  }
});

console.log(mapref,"is mob",lapref,"is lapppp and oldmaoref",oldmobmap)
console.log(Array.from(mapref),"is mapppppp")
  }
}, [checkedasmobile])



  function DraggableEventHandler(e:any,data:any) {
    console.log(e,
      "isn eeeeee",data
    )
  }
  return (
< >


<div ref={navref} className='w-full absolute to-0%  flex justify-around h-9 bg-amber-100'>
  {children}
  {  showpanel&&  <Leftchanging addbbutton={addbbutton}  setshowpanel={setshowpanel} />}
  {currenthistoryref.current>0 && <button>{currenthistoryref.current}</button>}
{ currenthistoryref.current>0 &&    <div className='w-1/12 h-full bg-amber-700 flex items-center justify-around'>
   <svg onClick={handlerecent}   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  id='-' className="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
  
</svg>

<p> {recentscountref.current}</p>
<svg onClick={handlerecent}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" id='+' className="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
</svg>

   
   </div>}
      <button onClick={()=>setshowpanel(!showpanel)}>show panel</button>
      {mapref.size>0&&lapref.size>0&& <button onClick={createhtml.bind(null,mapref,lapref)}>create html</button>}
        {slecetdelemnt&& <button className=' bg-amber-800' onClick={()=>setshowsidemenu(!showsidemenu)} >showsidemenu</button>  }  
       {/* <input
     
        className="w-2xl rounded-lg border text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      /> */}
</div>


     
       <div  id='divrect' style={{
    
     position:"absolute",
     width:`${mobileik.x}px`,
  minHeight:`${mobileik.y}px`,
  left:`${mobileviewleft}px`,
     background:"red",top:"20%",
     visibility:checkedasmobile?"visible":"hidden",
     }} ref={ divmobilebg}>kjlkj</div>
    
              
        
    { showsidemenu &&<Rightchangingoption mapref={mapref} lapref={lapref}  oldmobmap={oldmobmap}  setmobarr={setmobarr.current}  checkedasmobile={checkedasmobile}   slecetdelemnt={slecetdelemnt}  elenttype={elenttype} />}
    

      </>
  )
}



export default  memo(DragableBox)