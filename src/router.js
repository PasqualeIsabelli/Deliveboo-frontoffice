import {createRouter, createWebHistory} from "vue-router"

//import delle pagine
import Home from "./pages/Home.vue"
import Restaurant from "./pages/Restaurant.vue"
import Cart from "./pages/Cart.vue"
import OrderConfirmed from "./pages/OrderConfirmed.vue"

// rotte
const routes = [
    {
        path: '/', // uri da scrivere nel browser
        name: 'home', // nome della rotta da usare per creare un link
        component: Home, // componente che ritorna l'html della pagina
    },
    {
        path: "/restaurants/:id", //Uri to write in browser's searchbar
        name: "restaurants.show", //Name of route for creating links
        component: Restaurant //Component to return page's html
    },
    {
        path: '/cart', // uri da scrivere nel browser
        name: 'cart', // nome della rotta da usare per creare un link
        component: Cart, // componente che ritorna l'html della pagina
    },
    {
        path: '/order_confirmed', // uri da scrivere nel browser
        name: 'order_confirmed', // nome della rotta da usare per creare un link
        component: OrderConfirmed, // componente che ritorna l'html della pagina
    }
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