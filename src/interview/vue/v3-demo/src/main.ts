import {createApp} from 'vue'
import App from './App.vue'
import {router} from '@/router/index'
import CopyPlugin from '@/plugins/copy'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import '@/styles/index.scss'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(CopyPlugin)

app.mount('#app')
