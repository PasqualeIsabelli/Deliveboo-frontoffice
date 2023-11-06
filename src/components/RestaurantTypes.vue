<script>
import axios from 'axios';

export default {
    data() {
        return {
            types: [],
            selectedTypes: [],  // Array per i tipi selezionati
            selectedRestaurants: []
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
        },
        isSelectedType(type) {
            return this.selectedTypes.some(selectedType => selectedType.id === type.id);
        },
        sendData(type) {
            // Verifica se il tipo è già selezionato
            const index = this.selectedTypes.findIndex(selectedType => selectedType.id === type.id);

            if (index === -1) {
                // Se il tipo non è già selezionato, aggiungilo
                this.selectedTypes.push(type);
            } else {
                // Se il tipo è già selezionato, rimuovilo
                this.selectedTypes.splice(index, 1);
            }

            // Aggiorna la lista dei ristoranti in base ai tipi selezionati
            this.selectedRestaurants = this.selectedTypes.length > 0 ? this.selectedTypes[0].restaurants.filter(restaurant => {
                return this.selectedTypes.every(selectedType => {
                    return selectedType.restaurants.some(typeRestaurant => typeRestaurant.id === restaurant.id);
                });
            })
                : [];

            // Verifica se ci sono almeno due tipi selezionati
            const twoOrMoreSelected = this.selectedTypes.length >= 2;

            // Se ci sono almeno due tipi selezionati, verifica la mancata corrispondenza
            if (twoOrMoreSelected) {
                const missingMatch = this.selectedTypes.some(selectedType => {
                    return this.selectedTypes.every(otherType => {
                        if (selectedType.id !== otherType.id) {
                            return !selectedType.restaurants.some(typeRestaurant => {
                                return otherType.restaurants.some(otherTypeRestaurant => typeRestaurant.id === otherTypeRestaurant.id);
                            });
                        }
                        return true;
                    });
                });

                // Imposta la variabile di dati per mostrare o nascondere il messaggio
                this.showMissingMatchMessage = missingMatch;
            } else {
                // Se ci sono meno di due tipi selezionati, nascondi il messaggio
                this.showMissingMatchMessage = false;
            }
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
                    <div class="card" :data-id="type.id" @click="sendData(type)">
                        <img :src=getImg(type) class="card-img-top" alt="">
                        <div class="card-body d-flex align-items-center justify-content-center">
                            <h3 class="card-text text-center">{{ type.name }}</h3>
                        </div>
                        <div class="overlay" v-if="isSelectedType(type)">Selected</div>
                    </div>
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
        <div class="row g-3 justify-content-center">
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
            <div v-for="(type, id) in types" :key="type.id">
                <div class="card" :data-id="type.id" @click="sendData(type)">
                    <img :src=getImg(type) class="card-img-top" alt="">
                    <div class="card-body d-flex align-items-center justify-content-center">
                        <h3 class="card-text text-center">{{ type.name }}</h3>
                    </div>
                    <div class="overlay" v-if="isSelectedType(type)">Selected</div>
                </div>
            </div>
        </div>

        <div class="card" style="width: 18rem;" v-for="restaurant in this.selectedRestaurants">
            <div class="card-body">
                <h5 class="card-title">{{ restaurant.activity_name }}</h5>
            </div>
        </div>
        <div v-if="showMissingMatchMessage" >
            <h1 class="fw-bold text-center text-danger">Nessun ristorante trovato!</h1>
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

