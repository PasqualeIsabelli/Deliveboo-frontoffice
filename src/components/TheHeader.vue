<script>
import { router } from '../router';

export default {
    components: {
        router
    }
}
</script>

<template>
    <div class="container-fluid py-2">
        <div class="container">
            <div class="nav d-flex justify-content-between align-items-center">
                <div>
                    <router-link to="/"><img src="../assets/images/Logo.png" alt=""></router-link>
                </div>
                <div>
                    <!-- rotta che porta al login del back-office -->
                    <a class="px-3" href="http://127.0.0.1:8000/login" target="_blank">Login</a>
                    <a class="px-3" href="#0">Home</a>
                    <a class="px-3" href="#0">Contact</a>
                    <a class="px-3" href="#0"><i class="fa-solid fa-cart-shopping" style="color: #de1212;"></i></a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container-fluid {
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