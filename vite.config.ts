import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
// https://vite.dev/config/
export default defineConfig({
  
  plugins: [react(),tailwindcss()],
  build:{
    outDir:"distreactele" //. it is used to make the  default name of the build directort. dist to distreactele
  },
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base:"./",
  server:{
    port:5123,strictPort:true
  }
})
