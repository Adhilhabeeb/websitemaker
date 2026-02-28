// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider, SignIn, SignUp } from '@clerk/clerk-react'
import { BrowserRouter, Routes, Route } from 'react-router'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes'
import Navbar from './Navbar.tsx'

import Cusatemsignin from './Cusatemsignin.tsx'
import Custemsignup from './custemsignup.tsx'
import AuthGuard from './AuthGuard.tsx'
import Footer from './Footer.tsx'
import { ThemeProvider } from './components/ui/theme-provider.tsx'
import { useTheme } from 'next-themes'
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}
 function Theme() {
   
createRoot(document.getElementById('root')!).render( 
<App/>
)
 

}
Theme()

