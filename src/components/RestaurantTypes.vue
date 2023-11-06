<script>
import axios from 'axios';

export default {
    data() {
        return {
            types: [], // Array contenente tutti i types del DB
            selectedTypes: [],  // Array per i types selezionati
            selectedRestaurants: [] // Array per i restaurants selezionati
        }
    },
    methods: {
        fetchData() {
            axios.get('http://127.0.0.1:8000/api/types')
                .then((response) => {
                    // Salviamo la lista delle tipologie dei ristoranti
                    this.types = response.data.results;
                    console.log(this.types);
                })
        },
        getImg(type) {
            return `http://127.0.0.1:8000/storage/${type.img}`;
        },
        // Verifichiamo se un type è stato selezionato confrontanto il suo id con gli id dei types presenti nell'array selectedTypes
        // Se trova una corrispondenza restituirà true altrimenti false
        checkedType(type) {
            return this.selectedTypes.some(selectedType => selectedType.id === type.id);
        },
        sendData(type) {
            // Verifichiamo se il type è già selezionato
            const index = this.selectedTypes.findIndex(selectedType => selectedType.id === type.id);

            if (index === -1) {
                // Se il type non è già selezionato, lo aggiunge nell'array selectedTypes
                this.selectedTypes.push(type);
            } else {
                // Se il type è già selezionato, lo rimuove dall'array selectedTypes
                this.selectedTypes.splice(index, 1);
            }

            // Aggiorniamo la lista dei ristoranti in base ai type selezionati utilizzando l'array selectedRestaurants
            // Verifichiamo se almeno un type è stato selezionato con la condizione: this.selectedTypes.length > 0 
            // Filtriamo tutti i ristoranti in base al primo type selezionato con la funzione: this.selectedTypes[0].restaurants.filter
            this.selectedRestaurants = this.selectedTypes.length > 0 ? this.selectedTypes[0].restaurants.filter(restaurant => {
                // Con la funzione every() passiamo all'array selectedTypes tutti i type selezionati uno alla volta
                return this.selectedTypes.every(selectedType => {
                    // Con la funzione some() verifichiamo se ogni type selezionato ha almeno un ristorante in comune con il primo ristorante in esame
                    return selectedType.restaurants.some(typeRestaurant => typeRestaurant.id === restaurant.id);
                    // Se la condizione è vera per tutti i tipi selezionati, il ristorante viene incluso nell'array selectedRestaurant altrimenti viene escluso
                });
            })
                : [];

            // Verifichiamo se almeno due types sono selezionati con la condizione: this.selectedTypes.length >= 2
            const verifyingTypesSelected = this.selectedTypes.length >= 2;

            // Verifica se ci sono almeno due types selezionati
            if (verifyingTypesSelected) {
                // Se ci sono, verifica le corrispondenze tra i due types
                const missingMatch = this.selectedTypes.some(selectedType => {
                    // Viene effettuato un doppio ciclo dove grazie alle funzioni every() e some(), si confrontano tutti i ristoranti appartenenti ai types selezionati
                    // Se tra i ristoranti appartenenti a questi types non c'è alcuna corrispondenza, la funzione missingMatch verrà impostata su true e i ristoranti in questione verranno esclusi
                    // Altrimenti resterà su false e verranno mostrati i ristoranti appartenenti a tutti i types selezionati
                    return this.selectedTypes.every(otherType => {
                        if (selectedType.id !== otherType.id) {
                            return !selectedType.restaurants.some(typeRestaurant => {
                                return otherType.restaurants.some(otherTypeRestaurant => typeRestaurant.id === otherTypeRestaurant.id);
                            });
                        }
                        return true;
                    });
                });

                // Impostiamo la variabile che ci permette di mostrare o nascondere il messaggio in base al risultato ricevuto dalle corrispondenze tra i ristoranti
                // Se non c'è alcuna corrispondenza, allora il messaggio verrà mostrato
                this.showMessage = missingMatch;
            } else {
                // Altrimenti il messaggio verrà nascosto
                this.showMessage = false;
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
                        <div class="overlay" v-if="checkedType(type)">Selected</div>
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
                    <div class="overlay" v-if="checkedType(type)">Selected</div>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row g-3">
            <div class="col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center" v-for="restaurant in this.selectedRestaurants">
                <!-- <div class="card">
                    <img :src="getImg(restaurant)" class="card-img-top" alt="">
                    <div class="card-body">
                        <router-link :to="{ name: 'restaurants.show', params: { id: restaurant.id } }">
                            <h5 class="card-title">{{ restaurant.activity_name }}</h5>
                        </router-link>
                    </div>
                </div> -->
                <router-link :to="{ name: 'restaurants.show', params: { id: restaurant.id } }">
                    <!-- <div class="card my-card text-bg-dark">
                        <img :src="getImg(restaurant)" class="card-img my-card-img" alt="...">
                        <div class="card-img-overlay d-flex align-items-center justify-content-center">
                            <h5 class="card-title text-uppercase fw-bold">{{ restaurant.activity_name }}</h5>
                        </div>
                    </div> -->
                    <div class="my-card">
                        <div class="card-details">
                            <img :src="getImg(restaurant)" class="card-img" alt="...">
                        </div>
                        <div class="card-button" href="#link">{{ restaurant.activity_name }}</div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>

    <div v-if="showMessage">
        <h1 class="fw-bold text-center text-danger">Nessun ristorante trovato!</h1>
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

.container {
    .my-card {
        width: 100%;
        border-radius: 20px;
        background: #f5f5f5;
        position: relative;
        border: 2px solid #c3c6ce;
        -webkit-transition: 0.5s ease-out;
        transition: 0.5s ease-out;
        overflow: visible;
    }

    .card-details {
        color: rgb(0, 0, 0);
        height: 100%;
        gap: .5em;
        display: grid;
        place-content: center;
        font-family: 'Courier New', Courier, monospace;
    }

    .card-button {
        text-decoration: none;
        text-align: center;
        -webkit-transform: translate(-50%, 125%);
        -ms-transform: translate(-50%, 125%);
        transform: translate(-50%, 125%);
        width: 70%;
        border-radius: 1rem;
        border: none;
        background-color: rgb(0, 128, 248);
        color: #fff;
        font-size: 1rem;
        padding: .5rem 1rem;
        position: absolute;
        left: 50%;
        bottom: 0;
        opacity: 0;
        -webkit-transition: 0.3s ease-out;
        transition: 0.3s ease-out;
        cursor: pointer;
        font-family: 'Courier New', Courier, monospace;
    }

    .text-body {
        color: rgb(134, 134, 134);
    }

    /*Text*/
    .text-title {
        font-size: 1.5em;
        font-weight: bold;
    }

    /*Hover*/
    .my-card:hover {
        border-color: #00f0f8;
        -webkit-box-shadow: 10px 5px 18px 0 rgba(255, 255, 255, 0.877);
        box-shadow: 10px 5px 18px 0 rgba(255, 255, 255, 0.877);
    }

    .my-card:hover .card-button {
        -webkit-transform: translate(-50%, 50%);
        -ms-transform: translate(-50%, 50%);
        transform: translate(-50%, 50%);
        opacity: 1;
    }

    .card-img {
        overflow: hidden;
    }
}
</style>

