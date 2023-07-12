import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Vue from '@vitejs/plugin-vue'
import Unplugin from '../src/vite'

export default defineConfig({
  plugins: [
    Vue(),
    Inspect(),
    Unplugin({
      colorMap: [
        { color: '#409eff', name: 'theme-color', range: [90, 80, 70] },
        { color: '#ff0000', name: 'red-color' },
        { color: '#409eff', name: 'test-color' },
        { color: '#ffffff', name: 'hancode-menu-active-color' },
      ],
      exclude: [/home2/, /index\.html/],
    }),
  ],
})
