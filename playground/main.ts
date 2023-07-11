// document.getElementById('app')!.innerHTML = '__UNPLUGIN__'
import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:theme'

// console.log('%c Line:5 🍺 msg', 'color:#2eafb0', msg())

createApp(App).mount('#app')
