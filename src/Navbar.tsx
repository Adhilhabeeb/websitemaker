import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/react-router'
import { Link } from "react-router"
import { ThemeToggle } from "./components/ui/theme"

const navitems: string[][] = [
  ["Home", "/"],
  ["Pricing", "/pricing"]
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b dark:bg-black light:bg-amber-50">
      <div className="w-full mx-auto  px-10 md: py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">SiteCraft</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navitems.map(([name, link]) => (
            <a
              key={name}
              href={link}
              className="text-sm font-medium hover:text-blue-600 transition"
            >
              {name}
            </a>
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

          <SignedIn >
            <UserButton />
          </SignedIn>
           <ThemeToggle/>
        </div>

        {/* Mobile Menu Button */}
       <div className="md:hidden w-fit flex gap-2.5">
         <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
 <ThemeToggle className="md:hidden"/>
        
       </div>
          
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-4 z-100 absolute to-0% w-full">
          {navitems.map(([name, link]) => (
            <a
              key={name}
              href={link}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium hover:text-blue-600 transition"
            >
              {name}
            </a>
          ))}

          <div className="pt-4 border-t">
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

          <SignedIn >
            <UserButton />
          </SignedIn>
          </div>
     
        </div>
      )}
     
    </nav>
  )
}
