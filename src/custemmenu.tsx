import { useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { checkisvwandconverttomobilescerrrnwidth, checkitisinwidth, cssproper, mobileik } from "./utils/vierw";
import { cssValueOptions } from "./utils/cssdefault";
import { NavContext } from "./App";

type Styles = Record<string, string | number>;

export default function ButtonEditor({
  csscustem,slecetdelemnt,elenttype,checkedasmobile,setmobarr,mapref,lapref,oldmobmap
}: {


  csscustem: Styles | null;
  slecetdelemnt:string |null;
  elenttype:string |null;
  checkedasmobile:Boolean;
  setmobarr:Set<any>;
     mapref:Map<string,any>,
     lapref:Map<string,any>,
     oldmobmap:Map<string,any>,

}) {
    let contextr=useContext(NavContext)
    if (!contextr) {
      throw Error("context ius niot getteds ")
    }

    let {lapMapRef,mobMapRef,historytmapref,mobileoldmapstoreing}=contextr
    console.log(lapMapRef,mobMapRef,historytmapref,mobileoldmapstoreing,"is mps")
  const [styles, setStyles] = useState<Styles>({});
let oldstyles:any;
  // sync parent → child
  useLayoutEffect(() => {
   
    if (csscustem) {
     
      setStyles(csscustem);
    }
  }, [csscustem]);


let maximumwidth=useMemo(()=>{

  if (checkedasmobile) {
    
    return mobileik.x;
  }

  return window.innerWidth;


},[checkedasmobile])

  useEffect(() => {
      
    if (slecetdelemnt&& elenttype) {

      // console.log(setmobarr,"is te mobile areray ")
  
      let maindiv=document.querySelector(`#${slecetdelemnt}`)

let elemet =maindiv?.querySelector(`#${slecetdelemnt}`) as HTMLElement
let oldmobmapobj=mobileoldmapstoreing.current.get(slecetdelemnt)

let elementfrommap=mobMapRef.current.get(slecetdelemnt)
console.log(elementfrommap,"is te lement from mapmopbilr and oldmobikle:",oldmobmapobj)

let lapelementmap=lapMapRef.current.get(slecetdelemnt)



// console.log(newparesdfilterobj,"is the currentelemet obj  in the mobilearray ")

  let parseobj:any;
// if (setovjarrparsed.length>0) {
// parseobj=JSON.parse(setovjarrparsed[0])

// }
  

Object.entries(styles).forEach((el:[string,string|number])=>{
let [name,value]=el 

if (name=="text") {
  elemet.innerHTML=value as string
  
}



if (lapelementmap) {
  lapelementmap[name]=value
}

 let mobilescreenelementvalue=checkisvwandconverttomobilescerrrnwidth(name,value as string,maximumwidth,checkedasmobile)

// if (parseobj) {
//   parseobj[name]=value
 
// }
if (elementfrommap) {
  elementfrommap[name]=value
}
if (name=="width"&& checkedasmobile) {
  console.log(name,value,"is teh width ",elementfrommap?.width,"is width in elemet map")
  if (!elementfrommap?.width?.includes("vw")) {
    let valueinvw=(parseInt(value as string)/mobileik.x)*100+"vw"
   console.log(value,"is the value",name,"and",parseInt(value as string),"annn",mobileik.x,valueinvw)
    elementfrommap.width=valueinvw
  }else{
 elementfrommap.width=value
  }
  


  }
if (oldmobmapobj) {
  oldmobmapobj[name]=mobilescreenelementvalue
 
}
 (elemet.style as any)[name] = mobilescreenelementvalue




})


if (oldmobmapobj) {
  mobileoldmapstoreing.current.set(slecetdelemnt,oldmobmapobj)
  console.log(oldmobmap,"isd the oldmobilemapaftercss after thecss update ")
}
// console.log(newparesdfilterobj,"is the newfilterobject")

if (checkedasmobile && elementfrommap) {

  console.log(elementfrommap,"is the elemnt from map")
mobMapRef.current.set(slecetdelemnt,elementfrommap)
console.log(mapref,"is new map")
}

if (!checkedasmobile &&lapelementmap) {
  lapMapRef.current.set(slecetdelemnt,lapelementmap)
  console.log(lapref,"is teh lapref after css update")
}

    }


  }, [styles])
  
  // ✅ CORRECT EVENT TYPE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    // console.log(e,"eee")

    const { name, value } = e.target;
    let {status,valueas}=checkitisinwidth(name,value,maximumwidth,checkedasmobile)
    
if (!status) {
  console.log("is greter that the device width")
  return;
}


    setStyles((prev) => ({
      ...prev,
      [name]: valueas,
    }));
  };

  return (
    <div className="flex h-screen z-40">
      <div className="w-full max-w-md  bg-white rounded-2xl shadow-xl p-6  overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 sticky top-0 bg-white  z-10">
          🎨 Button Editor
        </h2>

        <div className="space-y-4 pb-12">
        
          { styles && Object.entries(styles).map(([name, value]) => 
          
        { 
            
            
            
            
            return (
            
            <Field checklfunction={checkisvwandconverttomobilescerrrnwidth}
              key={name}
              label={name}
              name={name}
              value={value}
              onChange={handleChange}
            />


          
          )
          }
          )}
        </div>
   
      </div>
    </div>


  );
}

/* ---------------- FIELD ---------------- */

 

function Field({ checklfunction,
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checklfunction:typeof checkisvwandconverttomobilescerrrnwidth
}) {

  const options = cssValueOptions[name];
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (optionValue: string) => {
    const fakeEvent = {
      target: {
        name,
        value: optionValue,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(fakeEvent);
    setShowOptions(false);
  };

  return (
    <div className="mb-4 relative">
      <label className="text-sm font-medium text-slate-600">
        {label}
      </label>

      <input
        name={name}
        value={value ?? ""}
        onChange={onChange}
        onFocus={() => setShowOptions(true)}
        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Suggestion Values */}
      {options && showOptions && (
        <div className="mt-2 flex flex-wrap gap-2 bg-white p-2 rounded-lg border shadow-md max-h-40 overflow-auto">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => handleOptionClick(opt)}
              className="px-3 py-1 text-xs bg-slate-100 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white transition"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
