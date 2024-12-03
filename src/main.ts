import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

//引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
//引入i18n
import i18n from './locales'

import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

// 向下兼容
import 'core-js/stable'
import 'regenerator-runtime/runtime'

const app = createApp(App)
// 注册全局elementplus icon组件
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key])
})
app.config.globalProperties.axios = axios
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(i18n)
app.use(VueAxios, axios)
app.mount('#app')
