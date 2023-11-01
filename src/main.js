import "bootstrap/dist/js/bootstrap.js"
import { createApp } from 'vue'
import './scss/general.scss'
import App from './App.vue'

import { router } from './router.js'

createApp(App).use(router).mount('#app')
