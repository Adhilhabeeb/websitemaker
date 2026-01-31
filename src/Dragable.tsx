import { useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { usemouse } from './mousemove'

function DragableBox() {
  let countref=useRef(0)
  const [setaray, setsetaray] = useState(new Set())
  let ref=useRef<HTMLDivElement >(null)
  
let move=usemouse()
console.log("mouse",)
  function addbbutton(ele="input") {
    countref.current++
    // setaray.add(JSON.stringify({name:"adhil"}))
    // setaray.add({name:"alfin"})

    // console.log(setaray,
    //   "is setarray",setaray.has(JSON.stringify({name:"aby"}))
    // )

let button=document.createElement(ele)
console.log(button,"is el;eem t")
button.style.width = "100px";
button.style.height = "30px";
button.style.position = "absolute";
button.style.left = "0px";
button.style.top = "0px";
console.log(countref.current,"ius refcount")
button.id=ele+countref.current.toString()
button.dataset.name=ele+countref.current.toString()

button.style.backgroundColor = "#2563eb"; // blue

// button.style.fontSize = "16px";
// button.style.cursor = "pointer";


//
let objset={
  name:button.dataset.name,
  left:button.style.left,
  right:button.style.right,
  top:button.style.top,
  bottom:button.style.bottom
}

setaray.add(JSON.stringify(objset))


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
hr.id="hrids"
let hr2=document.createElement("div")
hr2.style.backgroundColor="blue"
hr2.style.width="1000px"
hr2.style.height="1px"
hr2.style.display="none"
hr2.style.position = "absolute";
hr2.style.left = "0px";
hr2.style.top = "0px";
hr2.id="hrids"

let hr3=document.createElement("div")
hr3.style.backgroundColor="green"
hr3.style.width="1px"
hr3.style.height=(window.innerHeight/3)+"px"
hr3.style.display="none"
hr3.style.position = "absolute";
hr3.style.left = "0px";
hr3.style.top = "0px";
hr3.id="hrids"

let hr4=document.createElement("div")
hr4.style.backgroundColor="yellow"
hr4.style.width="1px"
hr4.style.height=(window.innerHeight/3)+"px"
hr4.style.display="none"
hr4.style.position = "absolute";
hr4.style.left = "0px";
hr4.style.top = "0px";
hr4.id="hrids"

let div=document.createElement("div").appendChild(button)
button.append(hr,hr2,hr3,hr4)
document.body.appendChild(div)

move(button,button,hr,hr2,hr3,hr4,setaray)

  }
  function DraggableEventHandler(e:any,data:any) {
    console.log(e,
      "isn eeeeee",data
    )
  }
  return (
 <Draggable
        axis="both"
     
    
       cancel="input, button"
defaultClassName='elm'
defaultClassNameDragged='dragged'
defaultClassNameDragging='isdragging'
        grid={[25, 25]}
       nodeRef={ref}
     onStop={ DraggableEventHandler}

        >
        <div ref={ref} className='w-3xs'>
          

    <button onClick={addbbutton.bind(null,"button")} className=" underline bg-amber-400 ">Click me</button>

        </div>
      </Draggable>
  )
}

export default DragableBox