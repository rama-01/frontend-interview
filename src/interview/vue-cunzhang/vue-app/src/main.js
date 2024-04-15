import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()


/* global directive */
// app.directive('focus', {
//     mounted: el => el.focus()
// })

app.use(pinia)
app.mount('#app')
