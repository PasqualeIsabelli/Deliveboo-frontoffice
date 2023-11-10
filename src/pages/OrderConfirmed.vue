<script>
import Loader from '../components/Loader.vue';

export default {
    components: {
        Loader
    },
    data() {
        return {
            isLoading: true,
            code: false,
        };
    },

    methods: {
    },

    mounted() {
        setTimeout(() => {
            this.isLoading = false;
            setTimeout(() => {
                this.code = true;
            });
        }, 2000);
    },

    created() {
    },
};
</script>

<template>
    <div class="container mt-5">
        <Loader v-if="isLoading"></Loader>
        <div v-else="code">
            <h1>Pagina di avvenuto pagamento</h1>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
