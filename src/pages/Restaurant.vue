<script>

import axios from 'axios';

export default {
    components: {

    },
    data() {
        return {
            restaurant: [],
        };
    },
    methods: {
        fetchData() {
            axios.get('http://127.0.0.1:8000/api/restaurants/' + this.$route.params.id)
                .then((response) => {
                    this.restaurant = response.data;
                    console.log(this.restaurant);
                })
        }
    },
    mounted() { 
        this.fetchData();
    },
};
</script>

<template>

</template>

<style lang="scss" scoped></style>