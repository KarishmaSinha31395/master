import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define:{
  //   'process.env.AUTH_USERNAME':JSON.stringify(process.env.AUTH_USERNAME)
  // }
})
