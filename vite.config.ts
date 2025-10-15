import { defineConfig, type PluginOption} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from "rollup-plugin-visualizer";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react() as PluginOption, visualizer() as PluginOption],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),

    },
  },
  build:{
    chunkSizeWarningLimit:800
  }
})
