import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { checkisvwandconverttomobilescerrrnwidth, checkitisinwidth, mobileik } from "./utils/vierw";

type Styles = Record<string, string | number>;

export default function ButtonEditor({
  csscustem,slecetdelemnt,elenttype,checkedasmobile,setmobarr,mapref
}: {
  csscustem: Styles | null;
  slecetdelemnt:string |null;
  elenttype:string |null;
  checkedasmobile:Boolean;
  setmobarr:Set<any>;
     mapref:Map<string,any>,

}) {
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


let elementfrommap=mapref.get(slecetdelemnt)
console.log(elementfrommap,"is te lement from map")



let oldsetovjarrparsed=[...setmobarr]?.find(el=>{

  let elparsed=JSON.parse(el)
  return elparsed.name==slecetdelemnt

}
)
let newparesdfilterobj=JSON.parse(oldsetovjarrparsed??"null")

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

if (newparesdfilterobj) {
  
  newparesdfilterobj[name]=value
}
if (elementfrommap) {
  elementfrommap[name]=value
}
 let mobilescreenelementvalue=checkisvwandconverttomobilescerrrnwidth(name,value as string,maximumwidth,checkedasmobile)
if (name=="width"&& checkedasmobile) {
console.log(name,value,"is teh width ")
elementfrommap.width=value
  }
// if (parseobj) {
//   parseobj[name]=value
 
// }

 (elemet.style as any)[name] = mobilescreenelementvalue




})



// console.log(newparesdfilterobj,"is the newfilterobject")

if (checkedasmobile && elementfrommap) {
mapref.set(slecetdelemnt,elementfrommap)
console.log(mapref,"is new map")
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
            
            <Field
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

function Field({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-600">
        {label}
      </label>

      <input
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
