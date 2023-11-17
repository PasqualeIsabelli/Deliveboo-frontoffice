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

  computed: {
    itemsFromLocalStorage() {
      // Recupera gli elementi dal localStorage e analizza il JSON, se presente
      return JSON.parse(localStorage.getItem("selectedTypes") || "[]");
    },
  },
  methods: {
    localStorage() {
      localStorage.setItem("selectedTypes", JSON.stringify(this.selectedTypes));
    },
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
          this.showMessage =
            this.selectedTypes.length > 0 && this.restaurants.length === 0;
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
    // sendData gestisce la selezione e deselezione dei types
    sendData(type) {
      // Attraverso il findIndex, cerca l'oggetto type all'interno dell'array selectedType e lo assegna alla variabile index
      const index = this.selectedTypes.findIndex(
        (selectedType) => selectedType.id === type.id
      );
      // Se l'oggetto non è presente all'interno dell'array allora lo aggiunge con push altrimenti lo rimuove con splice
      if (index === -1) {
        this.selectedTypes.push(type);
      } else {
        this.selectedTypes.splice(index, 1);
      }
      this.localStorage();

      // Aggiorna la lista dei ristoranti in base ai tipi selezionati
      this.fetchData();
    },
  },
  mounted() {
    // Se ci sono tipi selezionati nel localStorage, assegnali all'array selectedTypes
    this.selectedTypes = this.itemsFromLocalStorage;
    this.fetchData();
  },
};
</script>

<template>
  <section class="types-section">
    <h1 class="text-center text-color p-3">
      Scegli, ordina e gusta Food Delivery!
    </h1>
    <div class="d-flex justify-content-center">
      <div class="my-container px-5">
        <div class="d-flex gap-size">
          <div v-for="(type, id) in types" :key="type.id">
            <div
              class="card card-type border-0"
              :data-id="type.id"
              @click="sendData(type)"
            >
              <div class="size">
                <img :src="getImg(type)" class="card-img-top" />
                <div class="d-flex align-items-center justify-content-center">
                  <span
                    class="overlay text-warning me-2"
                    v-if="checkedType(type)"
                    ><i class="fa-solid fa-check"></i
                  ></span>
                  <h3 class="card-text text-color text-center fs-5">
                    {{ type.name }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container mt-5 pb-5">
      <div class="row gy-5">
        <div
          class="col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center"
          v-for="restaurant in restaurants"
        >
          <router-link
            :to="{ name: 'restaurants.show', params: { id: restaurant.id } }"
          >
            <div class="card my-card h-100">
              <img :src="getImg(restaurant)" class="card-img-top" />
              <div class="card-body text-center d-flex flex-column justify-content-between">
                <h5 class="card-title text-color mb-3">
                  {{ restaurant.activity_name }}
                </h5>
                <div class="d-flex gap-3 justify-content-center">
                  <div class="type-icon" v-for="(type, i) in typestrings">
                    <img class="image" :src="getImg(type)" />
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="showMessage && restaurants.length === 0">
        <h1 class="fw-bold text-center text-color bg-danger p-5">
          Ci dispiace ma nessun ristorante soddisfa i requisiti inseriti!
        </h1>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.my-container {
  overflow-x: auto;
  display: flex;
  height: 100px;
  overflow-y: hidden;
  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  & {
    scrollbar-width: auto;
    scrollbar-color: #fbbf08 #41642e;
  }

  /* Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background: #41642e;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #fbbf08;
    border-radius: 10px;
    border: 5px solid #41642e;
  }
  .card-type {
    background-color: transparent !important;
  }
}
.container-fluid {
  padding: 0 100px;
  .card {
    border: 0;
    text-decoration: none;
    background-color: transparent !important;

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
}
.container {
  .my-card {
    border: 0;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(29, 61, 29, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    background-color: #b92026 !important;
  }
}

.image {
  height: 25px;
  width: 25px;
}

.size {
  height: 60px;
  width: 60px;
}

.types-section {
  height: 200px;
}

.gap-size {
  gap: 50px;
}

.text-color {
  color: #dbd5af;
}

@media screen {
}

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
