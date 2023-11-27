//統一入口
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//Bootstrap的JS
import 'bootstrap'

import './assets/main.scss'

//Pinia
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

app.use(router)

app.mount('#app')


