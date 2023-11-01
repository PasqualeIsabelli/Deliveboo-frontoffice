import {createRouter, createWebHistory} from "vue-router"

//import delle pagine
import Home from "./pages/Home.vue"

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
]

const router = createRouter ({
    history: createWebHistory(),
    routes,
})

export {router}