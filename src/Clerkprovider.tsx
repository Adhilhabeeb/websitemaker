import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import React, { type ReactNode } from 'react'

function Clerkprovider({children,...props}:{
    children:ReactNode
}) {
 const { resolvedTheme } = useTheme()

 console.log(resolvedTheme,"is rtesoivevdde")
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  return (
    <ClerkProvider 
    
     appearance={{
    baseTheme: resolvedTheme === "dark" ? dark : undefined,
    elements: {
      card: "shadow-2xl rounded-2xl",
      formButtonPrimary:
        "bg-blue-600 hover:bg-blue-700 text-white rounded-xl",
    },
  }}
    
    publishableKey={PUBLISHABLE_KEY}>


{children}
    
  </ClerkProvider>
  )
}

export default Clerkprovider