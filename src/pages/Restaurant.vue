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
    //se l'array items ha almeno un elemento allora esegui l'altro if
    if (this.items.length > 0) {
      // Accedi al primo elemento e confronta il restaurant_id
      if (this.items[0].restaurant_id != this.$route.params.id) {
        this.items = [];
        this.localStorage();
      }
    }
    this.fetchData();
  },
  created() {
    this.items = this.itemsFromLocalStorage;
  },
};
</script>

<template>
  <img class="jumbo" :src="getImg(restaurant)" alt="" />
  <div class="container">
    <div class="row">
      <div class="col-8">
        <h2 class="p-3">{{ restaurant.activity_name }}</h2>
        <div class="row row-cols-2 g-3">
          <div class="col" v-for="product in restaurant.products" v-show="product.visible == 1">
            <div class="my-card">
              <img :src="getImg(product)" class="my-card-img" alt="Img prodotto" />
              <div class="my-text d-flex flex-column justify-content-between">
                <h5>{{ product.name }}</h5>
                <p>{{ product.description }}</p>
                <div class="">
                  <button @click="addItem(product)" class="btn btn-light me-2">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-4">
        <div>
          <h2 class="p-3">Il tuo carrello</h2>
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

.my-card {
  min-width: 299px;
  max-height: 100%;
  background-color: rgb(27, 167, 167);
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.24);
  font-size: 16px;
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
}

.my-card .my-text {
  width: 80%;
  margin: 10px auto;
  font-size: 15px;
  text-align: center;
  color: white;
  font-weight: 200;
  letter-spacing: 2px;
  height: 180px;
}
</style>
