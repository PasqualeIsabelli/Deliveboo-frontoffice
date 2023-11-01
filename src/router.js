import {createRouter, createWebHistory} from "vue-router"

//import delle pagine
import Home from "./pages/Home.vue"

// rotte
const routes = [
    {
        path: '/', // uri da scrivere nel browser
        name: 'home', // nome della rotta da usare per creare un link
        component: Home, // componente che ritorna l'html della pagina
    },
]

// creazione istanza di Router
const router = createRouter ({
    // Serve ad indicare come gestire l'url al cambio pagina
    history: createWebHistory(),
    // passiamo l'array delle rotte
    routes,
})

// esportiamo l'istanta router per poterla usare dentro main.js
export {router}