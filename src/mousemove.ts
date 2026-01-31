import { useRef } from "react";

 export function usemouse() {
    // Source - https://stackoverflow.com/a
// Posted by slebetman, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-29, License - CC BY-SA 3.0
// Source - https://stackoverflow.com/a
// Posted by slebetman, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-29, License - CC BY-SA 3.0
// Source - https://stackoverflow.com/a
// Posted by slebetman, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-29, License - CC BY-SA 3.0
let oldhrs=useRef< NodeListOf<HTMLDivElement> | undefined>(null)
function get (el:any) {
  if (typeof el == 'string') return document.getElementById(el);

  // console.log("is el",el)
  return el;
}

function mouseX (e:MouseEvent) {
  if (e.pageX) {
    return e.pageX;
  }
  if (e.clientX) {
    return e.clientX + (document.documentElement.scrollLeft ?
      document.documentElement.scrollLeft :
      document.body.scrollLeft);
  }
  return null;
}

function mouseY (e:MouseEvent) {
  if (e.pageY) {
    return e.pageY;
  }
  if (e.clientY) {
    return e.clientY + (document.documentElement.scrollTop ?
      document.documentElement.scrollTop :
      document.body.scrollTop);
  }
  return null;
}

function dragable (clickEl:HTMLElement,dragEl:HTMLElement,hr:HTMLElement,hr2:HTMLElement,hr3:HTMLElement,hr4:HTMLElement,setar:Set<any>) {
  var p:HTMLElement = get(clickEl);
  var t :HTMLElement= get(dragEl);
  var hr:HTMLElement=get(hr)
  var hr2:HTMLElement=get(hr2)
  var drag = false;
  let offsetX:any = 0;
 let offsetY :any= 0;
  var mousemoveTemp:any = null;
  if (t) {
    let oldobj:any;
    var move = function (x:any,y:any) {
    let objset={
  name:p.dataset.name,
  left:p.style.left,
  right:p.style.right,
  top:p.style.top,
  bottom:p.style.bottom
}

if (setar.has(JSON.stringify(objset))) {

// console.log("ond")
setar.delete(JSON.stringify(objset))
oldobj=objset
}else{
 
// console.log("beforeii",setar)
setar.delete(JSON.stringify(oldobj))
// console.log("older:",oldobj)
oldobj=objset
// console.log("neww:",objset)
// console.log("afterchange olderr:",oldobj)
setar.add(JSON.stringify(objset))



// console.log("afterrii",setar)

}

if (setar.size>0) {
 setar.forEach((el,i)=>{
let parsed=JSON.parse(el)
let left=parseInt(parsed.left)
let top=parseInt(parsed.top)
let objleft=parseInt(objset.left)
let objtop=parseInt(objset.top)


let leftdiffeernce=left-objleft

let topdiffeernce=top-objtop

console.log("/////////////////////////////////////////////////////////////////////////////////",i,"///////////////////////////////////////////////////////////////////")
if (  objset.name!=parsed.name  && Math.abs(leftdiffeernce) <10 ) {
  // console.log(parsed.name,"is main elem:")
  const parele = document.getElementById(parsed.name);
 let borel= parele?.querySelectorAll(`div`)
if (!borel)  return;
let leftlines=[borel[2],borel[3]]


if (drag) {
oldhrs.current?.forEach(el=>{
  el.style.display="none"
})
 console.log("recalled,",borel,parsed.name,"is nmain",oldhrs)
 leftlines.forEach(el=>el.style.display="block")
  oldhrs.current= borel
}else{

  // console.log("illllllllll;l;;lllklklkklklklklkllklklklklklkllalakaa")
 borel?.forEach(el=>el.style.display="none")

}

//  console.log(drag,"is draggg")
//   console.log(parele,"is parent",borel)
//   console.log(objset.name,"is child")

}else{

}


  // console.log("left:",left,"top",top,"is teh objectleft",objleft,"objtop",objtop,"andd.  left =dioference",Math.abs(leftdiffeernce),"and topdiffrenee:",Math.abs(topdiffeernce))
  console.log("*******************************************************************************************************************************************************************************")
 })
}
        // console.log("moving",t,"pos",x,
        //     "ammd",y
        // )
    //  console.log(t.style.left,"is left",(parseInt(t.style.left)+x))

    //    t.style.left = (parseInt(t.style.left)+x) + "px";
    //   t.style.top  = (parseInt(t.style.top) +y) + "px";
    //  console.log(t.style.left,"is left",x + "px","inn",document.documentElement.clientWidth)
// console.log(window.innerWidth)
// let lefgtmove= x>document.documentElement.clientWidth-parseInt(t.style.width)?x-(parseInt(t.style.width))+"px":x+"px"
   
     if (x<document.documentElement.clientWidth-parseInt(t.style.width)&& y<document.documentElement.clientHeight) {
          t.style.left =x+"px"
          t.style.top =y+"px"

        //  hr1
hr.style.top="-4px"
hr.style.left=-(parseInt(hr.style.width)/2)+"px"
//hr2
hr2.style.top=parseInt(t.style.height)+"px"
hr2.style.left=-(parseInt(hr.style.width)/2)+"px"

hr3.style.top=-(parseInt(hr3.style.height)/2)+"px"
hr4.style.top=-(parseInt(hr4.style.height)/2)+"px"
hr4.style.left=(parseInt(t.style.width)+3)+"px"


     }
    }
    var mouseMoveHandler = function (e:MouseEvent) {
      e = e || window.event;
// console.log("mousehandlemovecallede ")
      if(!drag){return true};

      var x:any = mouseX(e);
    
      var y:any = mouseY(e); 
     
      if (x != offsetX || y != offsetY) {
          // console.log("calllllleddd","x",x,"y",y,"annnddd",offsetX,"y:",offsetY)
        move(x,y);
        offsetX = x;
        offsetY = y;
      }
      return false;
    }
    var start_drag = function (e:any) {
      hr.style.display="block"
        hr2.style.display="block"
        hr3.style.display="block"
        hr4.style.display="block"

        // console.log("onmousedown")
      e = e || window.event;

      offsetX=mouseX(e);
      offsetY=mouseY(e);

      // console.log("offsetxx",offsetX,"offsety",offsetY)
      drag=true; // basically we're using this to detect dragging

      // save any previous mousemove event handler:
      if (document.body.onmousemove) {
       
        mousemoveTemp = document.body.onmousemove;
      }
      document.body.onmousemove = mouseMoveHandler;
      return false;
    }
    var stop_drag = function () {
        //  console.log("onmouseuppp")
         hr.style.display="none"
           hr2.style.display="none"
        hr3.style.display="none"
        hr4.style.display="none"

        console.log(oldhrs,"is solldlhrsss")
     
oldhrs.current?.forEach(el=>{
console.log(el,"iisisisiisellkll")
el.style.display="none"
})



      drag=false;      

      // restore previous mousemove event handler if necessary:
      if (mousemoveTemp) {
        document.body.onmousemove = mousemoveTemp;
        mousemoveTemp = null;
      }
      return false;
    }
    p.onmousedown = start_drag;
    p.onmouseup = stop_drag;
    document.addEventListener("keydown",   (event)=>{
    
 event.preventDefault();
    if (event.key === 'Enter') {
  if (drag) {
    // alert("ooo")
    stop_drag()
  }
    }
    })

 
  }

  return {drag}
}
return dragable
    
}