import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir:"distreactele" //. it is used to make the  default name of the build directort. dist to distreactele
  },
  base:"./",
  server:{
    port:5123,strictPort:true
  }
})
