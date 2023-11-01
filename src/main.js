import "bootstrap/dist/js/bootstrap.js"
import { createApp } from 'vue'
import './scss/general.scss'
import App from './App.vue'

// import del router
import { router } from './router.js'

createApp(App)
    // informa vuew che vogliamo usare il router
    .use(router)
    .mount('#app')
