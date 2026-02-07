import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { checkisvwandconverttomobilescerrrnwidth, checkitisinwidth, mobileik } from "./utils/vierw";

type Styles = Record<string, string | number>;

export default function ButtonEditor({
  csscustem,slecetdelemnt,elenttype,checkedasmobile
}: {
  csscustem: Styles | null;
  slecetdelemnt:string |null;
  elenttype:string |null;
  checkedasmobile:Boolean;
}) {
  const [styles, setStyles] = useState<Styles>({});

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
  
      let maindiv=document.querySelector(`#${slecetdelemnt}`)

let elemet =maindiv?.querySelector(`#${slecetdelemnt}`) as HTMLElement

console.log(elemet,"is the elemt and maindiv:",maindiv)




Object.entries(styles).forEach((el:[string,string|number])=>{
let [name,value]=el 

 let mobilescreenelementvalue=checkisvwandconverttomobilescerrrnwidth(name,value as string,maximumwidth,checkedasmobile)
if (elemet) {

 (elemet.style as any)[name] = mobilescreenelementvalue
}
})

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
