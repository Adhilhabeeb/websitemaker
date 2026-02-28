
import { SignIn } from "@clerk/clerk-react";





function Cusatemsignin() {
  return (
   <div className='flex justify-center  pt-30 h-screen'>

        <SignIn  routing="virtual"
  fallbackRedirectUrl="/"/>
    </div>
  )
}

export default Cusatemsignin