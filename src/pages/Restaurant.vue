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
                    this.restaurant = response.data.restaurant;
                    console.log(this.restaurant);
                })
        },

        getImg(type) {
            return `http://127.0.0.1:8000/storage/${type.img}`;
        }

    },
    mounted() { 
        this.fetchData();
    },
};
</script>

<template>

    <div class="container">

        <h3>{{ restaurant.activity_name }}</h3>

        <img :src="getImg(restaurant)" alt="">

        <ul v-for="product in restaurant.products">
        
            <li class="card" style="width: 18rem;">
                <img :src="getImg(product)" class="card-img-top" alt="Img prodotto">
                <div class="card-body">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text">{{ product.description }}</p>
                </div>
            </li>
        
        </ul>

    </div>

</template>

<style lang="scss" scoped></style>