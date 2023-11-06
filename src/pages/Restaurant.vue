<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      items: [],
      restaurant: [],
    };
  },
  computed: {
    itemsFromLocalStorage() {
      // Recupera gli elementi dal localStorage e analizza il JSON, se presente
      return JSON.parse(localStorage.getItem("items") || "[]");
    },
  },

  methods: {
    localStorage() {
      // Salva gli elementi nel localStorage
      return localStorage.setItem("items", JSON.stringify(this.items));
    },
    fetchData() {
      // Effettua la chiamata API per ottenere i dati del ristorante
      axios
        .get("http://127.0.0.1:8000/api/restaurants/" + this.$route.params.id)
        .then((response) => {
          this.restaurant = response.data.restaurant;
        });
    },
    addItem(product) {
      //Aggiungi un prodotto al carrello e salva nel localStorage
      this.items.push(product);
      this.localStorage();
    },

    removeItem(index) {
      // Rimuovi un prodotto dal carrello e salva nel localStorage
      this.items.splice(index, 1);
      this.localStorage();
    },

    getImg(type) {
      return `http://127.0.0.1:8000/storage/${type.img}`;
    },
  },

  mounted() {
    this.fetchData();
  },
  created() {
    // Carica gli elementi del carrello dal localStorage al momento della creazione del componente
    this.items = this.itemsFromLocalStorage;
  },
};
</script>

<template>
  <img class="jumbo" :src="getImg(restaurant)" alt="" />
  <div class="container">
    <div class="row">
      <div class="col-6">
        <h1>{{ restaurant.activity_name }}</h1>
        <ul v-for="product in restaurant.products">
          <li class="card" style="width: 18rem">
            <img
              :src="getImg(product)"
              class="card-img-top"
              alt="Img prodotto"
            />
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">{{ product.description }}</p>
              <button @click="addItem(product)" class="btn btn-primary me-2">
                Add
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-6">
        <div>
          <h1>Il tuo ordine</h1>
          <div v-for="(item, index) in items" :key="index">
            <div class="d-flex align-items-center">
              <h5 class="card-title">{{ item.name }}</h5>
              <button class="btn text-danger" @click="removeItem(index)">
                <i class="fa-solid fa-trash"></i>
              </button>
              <div>{{ item.price }}€</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.jumbo {
  width: 100%;
  height: 450px;
  object-fit: cover;
}
</style>
