<script>
import axios from "axios";

export default {
  data() {
    return {
      restaurants: [], // Array contenente tutti i restaurants del DB
      types: [], // Array contenente tutti i types del DB
      selectedTypes: [], // Array per i types selezionati
      typestrings: [], // Array contenente le icone dei types
      showMessage: false, // Messaggio di mancata corrispondenza
    };
  },
  methods: {
    fetchData() {
      axios
        .get("http://127.0.0.1:8000/api/types", {
          params: {
            // Estrai gli id da ciascun type dell'array selectedTypes e li utilizza per effettuare le chiamate
            selectedTypes: this.selectedTypes.map((type) => type.id),
          },
        })
        .then((response) => {
          // Prende i dati relativi ai types e li mette nella variabile this.types
          this.types = response.data.results;
          // Prende le icone dei types e li mette nella variabile this.typestring
          this.typestrings = response.data.typestring;
          // Prende i dati relativi ai restaurants e li mette nella variabile this.restaurants
          this.restaurants = response.data.restaurants;

          // Imposta showMessage a true se non ci sono ristoranti corrispondenti
          this.showMessage = this.selectedTypes.length > 0 && this.restaurants.length === 0;
        });
    },
    // getImg ci dà la possibilità di visualizzare le immagini del DB
    getImg(type) {
      return `http://127.0.0.1:8000/storage/${type.img}`;
    },
    // Verifichiamo se un type è stato selezionato confrontanto il suo id con gli id dei types presenti nell'array selectedTypes
    // Se trova una corrispondenza restituirà true altrimenti false
    checkedType(type) {
      return this.selectedTypes.some(
        (selectedType) => selectedType.id === type.id
      );
    },
    sendData(type) {
      const index = this.selectedTypes.findIndex(
        (selectedType) => selectedType.id === type.id
      );
      if (index === -1) {
        this.selectedTypes.push(type);
      } else {
        this.selectedTypes.splice(index, 1);
      }
      // Aggiorna la lista dei ristoranti in base ai tipi selezionati
      this.fetchData();
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<template>
  <!-- slider sm -->
  <div class="container-fluid container-p-s py-5 d-md-none d-lg-none">
    <div id="carouselExampleAutoplaying" class="carousel slide d-block d-md-none d-lg-none" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active" v-for="(type, id) in types" :key="type.id">
          <div class="card" :data-id="type.id" @click="sendData(type)">
            <img :src="getImg(type)" class="card-img-top" alt="" />
            <div class="card-body d-flex align-items-center justify-content-center">
              <span class="overlay text-success" v-if="checkedType(type)"><i class="fa-solid fa-check me-2"></i></span>
              <h3 class="card-text text-center">{{ type.name }}</h3>
            </div>
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
        <div class="card" :data-id="type.id" @click="sendData(type)">
          <img :src="getImg(type)" class="card-img-top" alt="" />
          <div class="card-body d-flex align-items-center justify-content-center">
            <span class="overlay text-success me-2" v-if="checkedType(type)"><i class="fa-solid fa-check"></i></span>
            <h3 class="card-text text-center">{{ type.name }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- card in lg -->
  <div class="container-fluid">
    <div class="container d-none d-md-none d-lg-flex py-5 gap-5 justify-content-center">
      <div v-for="(type, id) in types" :key="type.id">
        <div class="card" :data-id="type.id" @click="sendData(type)">
          <img :src="getImg(type)" class="card-img-top" alt="" />
          <div class="card-body d-flex align-items-center justify-content-center">
            <span class="overlay text-success me-2" v-if="checkedType(type)"><i class="fa-solid fa-check"></i></span>
            <h3 class="card-text text-center">{{ type.name }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container pb-5">
    <div class="row gy-5">
      <div class="col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center" v-for="restaurant in restaurants">
        <router-link :to="{ name: 'restaurants.show', params: { id: restaurant.id } }">
          <div class="my-card">
            <img :src="getImg(restaurant)" class="my-card-img" />
            <div class="my-text">{{ restaurant.activity_name }}
              <div class="type-icon" v-for="(type) in typestrings">
                <img class="image" :src="getImg(type)" /> <!--INSERIRE DELLE ICON? OPPURE FARE DEI BADGE? VEDERE COME FARE PER ASSEGNARE DIRETTAMENTE TUTTE LE ICON DI APPARTENENZA DI QUEL RISTORANTE-->
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div v-if="showMessage && restaurants.length === 0">
      <h1 class="fw-bold text-center text-danger p-5">Nessun ristorante trovato!</h1>
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
    min-width: 299px;
    background-color: #02ccbc;
    border-radius: 10px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.24);
    font-size: 16px;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    font-family: "Poppins", sans-serif;

    .my-card-img {
      max-height: 168px;
      min-width: 100%;
      object-fit: cover;
      border-radius: 10px;
    }

    .type-icon {
      height: 50px;
      width: 50px;
    }
  }

  .my-card .my-text {
    width: 80%;
    margin: 0 auto;
    font-size: 15px;
    text-align: center;
    color: white;
    font-weight: 200;
    letter-spacing: 2px;
    opacity: 0;
    max-height: 0;
    transition: all 0.3s ease;
  }

  .my-card:hover .my-text {
    transition: all 0.5s ease;
    opacity: 1;
    max-height: 40px;
    margin: 10px;
  }
}

.image {
  height: 25px;
  width: 25px;
}

@media screen {}

/* Media query per breakpoint 'sm' (576px a 767px) */
@media screen and (min-width: 0) and (max-width: 767px) {
  .container .my-card .my-text {
    opacity: 1;
    max-height: 40px;
    margin: 10px;
  }
}

/* Media query per breakpoint 'md' (768px a 1400px) */
@media screen and (min-width: 768px) and (max-width: 1400px) {
  .container .my-card .my-text {
    opacity: 1;
    max-height: 40px;
    margin: 10px;
  }
}
</style>
