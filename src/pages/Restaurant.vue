<script>
import axios from "axios";

export default {
  components: {},

  data() {
    return {
      items: [],
      restaurant: [],
      totalPrice: [],
      cart: {},
      sum: 0,
      confDeleteCart: false,
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
      const dataToSave = {
        items: this.items,
        sum: this.sum,
        totalPrice: this.totalPrice,
        cart: this.cart
      };

      // Salva gli elementi nel localStorage
      localStorage.setItem("cartData", JSON.stringify(dataToSave));
    },
    removeAllItem(index) {
      // Rimuovi tutti gli elementi dal carrello reimpostando gli array e il totale
      this.items = [];
      this.totalPrice = [];
      this.sum = 0;
      this.cart = {};

      // Salva nel localStorage
      this.localStorage();
    },
    fetchData() {
      // Effettua la chiamata API per ottenere i dati del ristorante
      axios
        .get("http://127.0.0.1:8000/api/restaurants/" + this.$route.params.id)
        .then((response) => {
          this.restaurant = response.data.restaurant;
        });
    },
    // Questo è il metodo che gestisce l'aggiunta di un prodotto al carrello
    addItem(product) {

      //se l'array items ha almeno un elemento allora esegui l'altro if
      if (this.items.length > 0) {
        // Accedi al primo elemento e confronta il restaurant_id
        if (this.items[0].restaurant_id != this.$route.params.id) {
          this.confDeleteCart = true;
          this.items = [];
          this.sum = 0;
          this.cart = [];
          this.totalPrice = [];

          this.localStorage();
        }
      }

      // Trova l'indice del prodotto nel carrello se esiste
      const existingProductIndex = this.items.findIndex(
        (item) => item.id === product.id
      );

      // Verifica se il prodotto esiste già nel carrello
      if (existingProductIndex !== -1) {
        // Se il prodotto esiste già, ottieni il prodotto esistente
        const existingProduct = this.items[existingProductIndex];

        // Verifica se c'è già un contatore associato a questo prodotto nel carrello
        if (this.cart[existingProduct.id]) {
          // Se sì, incrementa il contatore per questo prodotto
          this.cart[existingProduct.id]++;
        } else {
          // Se non esiste un contatore per questo prodotto, inizializza il contatore a 1
          this.cart[existingProduct.id] = 1;
        }
      } else {
        // Se il prodotto non esiste ancora nel carrello, aggiungi il prodotto all'array items
        this.items.push(product);
        // Inizializza un contatore a 1 nell'oggetto cart per questo nuovo prodotto nel carrello
        this.cart[product.id] = 1;
      }

      //array contenente i prezzi
      this.sum += parseFloat(product.price);

      // Salva nel localStorage
      this.localStorage();
    },

    removeItem(index) {
      // Ottieni il prodotto corrente
      const product = this.items[index];

      // Verifica se c'è un contatore associato a questo prodotto nel carrello
      if (this.cart[product.id]) {
        // Decrementa il contatore per questo prodotto
        this.cart[product.id]--;

        // Se il contatore scende a 0 o sotto, rimuovi l'item dal carrello e cancella il contatore
        if (this.cart[product.id] <= 0) {
          this.items.splice(index, 1);
          delete this.cart[product.id];
        }
      } else {
        // Se non esiste un contatore per questo prodotto, rimuovi l'item dal carrello
        this.items.splice(index, 1);
      }
      this.sum -= parseFloat(product.price);

      // Salva nel localStorage
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
    const storedData = JSON.parse(localStorage.getItem("cartData") || "{}");
    this.items = storedData.items || [];
    this.sum = storedData.sum || 0;
    this.totalPrice = storedData.totalPrice || 0;
    this.cart = storedData.cart || {};
  },
};
</script>

<template>
  <img class="jumbo" :src="getImg(restaurant)" alt="" />
  <div class="container">
    <div class="row">
      <div class="col-8">
        <h2 class="py-3">{{ restaurant.activity_name }}</h2>
        <div class="row row-cols-md-2 g-3 pb-5">
          <div class="col" v-for="product in restaurant.products" v-show="product.visible == 1">
            <div class="my-card">
              <img :src="getImg(product)" class="my-card-img" alt="Img prodotto" />
              <div class="my-text d-flex flex-column justify-content-between">
                <h5>{{ product.name }}</h5>
                <p>{{ product.description }}</p>
                <div class="text-">{{ product.price }}</div>

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
        <div v-if="items.length > 0">
          <h2 class="py-3">Il tuo carrello</h2>
          <div class="my-table-container p-3">
            <table class="table table-borderless m-0">
              <tbody v-for="(item, index) in items" :key="index">
                <tr>
                  <td class="text-center">
                    {{ cart[item.id] }}
                  </td>
                  <td>
                    <h5 class="card-title">{{ item.name }}</h5>
                  </td>
                  <td class="text-end">
                    <button class="btn text-danger p-0" @click="removeItem(index)">
                      <i class="fa-solid fa-minus"></i>
                    </button>
                  </td>
                  <td class="text-center">{{ (item.price * cart[item.id]).toFixed(2) }}€</td>
                  <td>
                    <button class="btn text-danger p-0" @click="addItem(item)">
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td></td>
                  <td>
                    <h5>Totale:</h5>
                  </td>
                  <td></td>
                  <td class="text-center">{{ sum.toFixed(2) }}€</td>
                  <td>
                    <button class="btn text-danger p-0 text-center" @click="removeAllItem(index)">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="my-2">
            <router-link :to="{ name: 'cart' }">
              <button class="btn btn-primary">Vai al carrello</button>
            </router-link>
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
  min-width: 200px;
  max-height: 100%;
  background-color: #02ccbc;
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
    max-height: 230px;
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

.my-table-container {
  border: 1px solid lightgrey;
  border-radius: 10px;
}
</style>
