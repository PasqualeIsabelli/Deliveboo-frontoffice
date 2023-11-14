<script>
import { router } from '../router';

export default {
    components: {
        router
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    methods: {
        handleScroll() {
            const navbar = document.getElementById("myNavbar");
            if (navbar) {
                const scrollY = window.scrollY;
                if (scrollY > 0) {
                    navbar.style.backgroundColor = "rgba(65, 100, 46, 0.6)"; // Cambia il colore di sfondo quando si scorre
                    navbar.querySelectorAll("a").forEach((link) => { link.style.color = "#dbd5af" })
                } else {
                    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.3)"; // Ripristina il colore di sfondo trasparente
                    navbar.querySelectorAll("a").forEach((link) => { link.style.color = "black" })
                }
            }
        },
    },
}
</script>

<template>
    <nav class="navbar navbar-expand-lg" id="myNavbar">
        <div class="container">
            <div>
                <router-link to="/"><img style="width: 210px;" src="../assets/images/Logo.png" alt=""></router-link>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="px-3 fs-3" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="px-3 fs-3" href="#0">Chi siamo</a>
                    </li>
                    <li class="nav-item">
                        <a class="px-3 fs-3" href="http://127.0.0.1:8000/login" target="_blank">Login</a>
                    </li>
                    <li class="nav-item">
                        <router-link class="px-3 fs-3" to="/cart"><i class="fa-solid fa-cart-shopping"
                                style="color: #de1212;"></i></router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
nav {
    background-color: rgba($color: #ffffff, $alpha: 0.3);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    position: fixed;
    width: 100%;
    z-index: 1;
    transition: 0.5s;

    .nav-item {
        a {
            color: rgb(0, 0, 0);
            text-decoration: none;
            font-size: 1.2rem;
        }
    }
}
</style>