<script>
import axios from 'axios';

export default {
    data() {
        return {
            types: [],
        }
    },
    methods: {
        fetchData() {
            axios.get('http://127.0.0.1:8000/api/types')
                .then((response) => {
                    // salviamo la lista delle tipologie dei ristoranti
                    this.types = response.data.results;
                    console.log(this.types);
                })
        },
        getImg(type) {
            return `http://127.0.0.1:8000/storage/${type.img}`;
        }

    },
    mounted() {
        this.fetchData();
    }
}
</script>

<template>
    <!-- slider sm -->
    <div class="container-fluid container-p-s py-5 d-md-none d-lg-none">
        <div id="carouselExampleAutoplaying" class="carousel slide d-block d-md-none d-lg-none" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active" v-for="(type, id) in types" :key="type.id">
                    <a href="#0" class="card">
                        <img :src=getImg(type) class="card-img-top" alt="">
                        <div class="card-body d-flex align-items-center justify-content-center">
                            <h3 class="card-text text-center">{{ type.name }}</h3>
                        </div>
                    </a>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="prev">
                <span><i class="fa-solid fa-chevron-left"></i></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next">
                <span><i class="fa-solid fa-chevron-right"></i></span>
            </button>
        </div>
        <!-- <div class="row g-3 justify-content-center" >
            <div class="col-2" v-for="(type, i) in types">
                <a href="#0" class="card">
                    <img :src=getImg(type) class="card-img-top" alt="">
                    <div class="card-body d-flex align-items-center justify-content-center">
                        <h3 class="card-text text-center">{{ type.name }}</h3>
                    </div>
                </a>
            </div>
        </div> -->
    </div>

    <!-- slider md -->
    <div class="container-fluid p-5 d-none d-md-block d-lg-none">
        <div class="row g-3 justify-content-center" >
            <div class="col-3" v-for="(type, i) in types">
                <a href="#0" class="card">
                    <img :src=getImg(type) class="card-img-top" alt="">
                    <div class="card-body d-flex align-items-center justify-content-center">
                        <h3 class="card-text text-center">{{ type.name }}</h3>
                    </div>
                </a>
            </div>
        </div>
    </div>


    <!-- card in lg -->
    <div class="container-fluid">
        <div class="container d-none d-md-none d-lg-flex py-5 gap-5 justify-content-center">
            <a href="#0" class="card" v-for="(type, i) in types">
                <img :src=getImg(type) class="card-img-top" alt="">
                <div class="card-body d-flex align-items-center justify-content-center">
                    <h3 class="card-text text-center">{{ type.name }}</h3>
                </div>
            </a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container-fluid {
    padding: 0 100px;

    .card {
        border: 0;
        text-decoration: none;

        img {
            height: 100px;
            object-fit: contain;
            object-position: center;
        }

        .card-img-overlay {
            color: white;
        }

        h3 {
            font-size: 1.2rem;
        }

        .my-width {
            max-width: 71px;
        }
    }

    .carousel-control-next {
        transform: translate(50%, -50%);
    }

    .carousel-control-prev {
        transform: translate(-50%, -50%);
    }

    .carousel-control-next,
    .carousel-control-prev {
        width: 50px;
        border-radius: 50%;
        height: 50px;
        top: 50%;
        background-color: black;
    }
}

.container-p-s {
    padding: 0 50px;
}
</style>

