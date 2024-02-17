
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "./assets/tailwind-css/index.css"
import './assets/main.css'

import DashboardLayout from './components/include/DashboardLayout.vue'
import EmptyLayout from './components/include/EmptyLayout.vue'

const app = createApp(App)

app.component('DefaultLayout', DashboardLayout)
app.component('EmptyLayout', EmptyLayout)


app.use(createPinia())
app.use(router)
app.mount('#app')
