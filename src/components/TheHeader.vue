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
                <router-link to="/"><img src="../assets/images/Logo.png" alt=""></router-link>
                <!-- rotta che porta al login del back-office -->
                <a class="px-3" href="http://127.0.0.1:8000/login" target="_blank">Accedi</a>
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