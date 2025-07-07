import {createApp} from 'vue'
import App from './App.vue'
import {router} from '@/router/index'
import CopyPlugin from '@/plugins/copy'
// import ElementPlus from 'element-plus'
import VueVirtualScroller from 'vue-virtual-scroller'

import 'element-plus/dist/index.css'
import 'normalize.css'
import '@/styles/index.scss'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const app = createApp(App)
// app.use(ElementPlus)
app.use(router)
app.use(CopyPlugin)
app.use(VueVirtualScroller)

app.mount('#app')
