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
                    navbar.querySelectorAll("a").forEach((link) => {link.style.color = "#dbd5af"})
                } else {
                    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.3)"; // Ripristina il colore di sfondo trasparenteù
                    navbar.querySelectorAll("a").forEach((link) => {link.style.color = "black"})
                }
            }
        },
    },
}
</script>

<template>
    <nav id="myNavbar">
        <div class="container-fluid py-3">
            <div class="container">
                <div class="nav d-flex justify-content-between align-items-center">
                    <div>
                        <router-link to="/"><img src="../assets/images/Logo.png" alt=""></router-link>
                    </div>
                    <div>
                        <!-- rotta che porta al login del back-office -->
                        <router-link class="px-3 fs-3" to="/">Home</router-link>
                        <a class="px-3 fs-3" href="#0">Contact</a>
                        <a class="px-3 fs-3" href="http://127.0.0.1:8000/login" target="_blank">Login</a>
                        <router-link class="px-3 fs-3" to="/cart"><i class="fa-solid fa-cart-shopping" style="color: #de1212;"></i></router-link>
                    </div>
                </div>
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
    .nav {
        img {
            width: 210px;
        }

        a {
            color: rgb(0, 0, 0);
            text-decoration: none;
            font-size: 1.2rem;
        }
    }
}
</style>