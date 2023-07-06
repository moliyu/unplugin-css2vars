import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Vue from '@vitejs/plugin-vue'
import Unplugin from '../src/vite'

export default defineConfig({
  plugins: [
    Vue(),
    Inspect(),
    Unplugin({
      colorMap: {
        '--red-color': 'red',
        '--theme-color': '#409eff',
        '--black': '#333333',
      },
      exclude: [/home2/, /index\.html/],
    }),
  ],
})
