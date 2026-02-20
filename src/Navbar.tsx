import React, { useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/react-router'
import { Link, useLocation } from "react-router"
import { ThemeToggle } from "./components/ui/theme"
import { NavContext, type Contextapptype } from "./App"
import { createhtml } from "./utils/vierw"


const navitems: string[][] = [
  ["Home", "/"],
  ["Pricing", "/pricing"]
]

type navprops={
  navref:React.RefObject<HTMLElement |null>
}
export default function Navbar({navref}:navprops) {
const [projpage, setprojpage] = useState(false)
 const context = useContext<Contextapptype |undefined  >(NavContext  );
if (!context) {
  return;
}

 let {checkedasmobile,setcheckedasmobile,showpanel,setshowpanel,currenthistoryref,handleecentfunction,recentscountref,slecetdelemnt,setshowsidemenu,showsidemenu,mobMapRef,mobileoldmapstoreing,lapMapRef,historytmapref}=context



 let oldmobmap=mobileoldmapstoreing.current
let mapref=mobMapRef.current
let lapref=lapMapRef.current
let historymap=historytmapref.current
  const location = useLocation()

  function handlerecentsfunc(e:React.MouseEvent<SVGSVGElement>) {
    handleecentfunction?.(e.currentTarget.id);
  }



console.log(location.pathname,"is useloaction")
console.log(handleecentfunction,"is handle")
useEffect(() => {
  
if (location.pathname.includes("project")) {
  setprojpage(true)
}else{
  setprojpage(false)
}


}, [location])



  const [isOpen, setIsOpen] = useState(false)

return (
  <nav
    ref={navref}
    className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-lg dark:bg-black/60 shadow-sm"
  >
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-tight">
        <span className="text-blue-600">Site</span>
        <span className="dark:text-white">Craft</span>
      </Link>

      {/* Project Controls */}
      {projpage && (
        <div className="hidden md:flex items-center gap-4 bg-gray-100 dark:bg-neutral-800 px-4 py-2 rounded-xl shadow-inner">
          
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              onChange={() => setcheckedasmobile(!checkedasmobile)}
              className="accent-blue-600"
            />
            Mobile
          </label>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => setshowpanel(!showpanel)}
          >
            Panel
          </Button>
        {slecetdelemnt&& <button className=' bg-amber-800' onClick={()=>setshowsidemenu(!showsidemenu)} >showsidemenu</button>  }  
  {mapref.size>0&&lapref.size>0&& <button onClick={createhtml.bind(null,mapref,lapref)}>create html</button>}

          {currenthistoryref.current > 0 && (
            <div className="flex items-center gap-3 bg-white dark:bg-neutral-900 px-3 py-1.5 rounded-lg shadow">
              
              <svg
                onClick={handlerecentsfunc}
                id="-"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer hover:text-blue-600 transition"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
              </svg>

              <span className="text-sm font-medium">
                {recentscountref.current}
              </span>

              <svg
                onClick={handlerecentsfunc}
                id="+"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer hover:text-blue-600 transition"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
              </svg>

            </div>
          )}
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        {navitems.map(([name, link]) => (
          <Link
            key={name}
            to={link}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
          >
            {name}
          </Link>
        ))}

        <SignedOut>
          <div className="flex gap-4">
            <Link to="/signin">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Sign Up
              </Button>
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>

        <ThemeToggle />
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden flex items-center gap-3">
        <ThemeToggle />
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </div>

    {/* Mobile Dropdown */}
    {isOpen && (
      <div className="md:hidden border-t bg-white dark:bg-black px-6 py-6 space-y-6 shadow-lg">
        
        {navitems.map(([name, link]) => (
          <Link
            key={name}
            to={link}
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium hover:text-blue-600 transition"
          >
            {name}
          </Link>
        ))}

        <div className="pt-4 border-t">
          <SignedOut>
            <div className="flex flex-col gap-4">
              <Link to="/signin">
                <Button variant="ghost" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    )}
  </nav>
)
}
