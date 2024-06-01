import path from "path"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
export default defineConfig({
  plugins: [react(),
    NodeGlobalsPolyfillPlugin({
      buffer: true,
    }),
  ],


  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
})


