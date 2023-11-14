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

    removeAllItem(product) {
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
  <div class="container-spazio"></div>
  <div class="container-fluid">
    <div class="container restaurant-c d-lg-flex d-md-block d-sm-block justify-content-center gap-4">
      <div class="">
        <img class="restaurant-img" :src="getImg(restaurant)" alt="" />
      </div>
      <div class="card restaurant-card text-color">
        <div class="card-body">
          <h1 class="card-title">{{ restaurant.activity_name }}</h1>
          <h5 class="card-text"><span class="fw-bold">Telefono:</span> {{ restaurant.phone }}</h5>
          <h5 class="card-text"><span class="fw-bold">Indirizzo:</span> {{ restaurant.address }}</h5>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-12">
        <h2 class="py-3 text-color">I nostri piatti</h2>
        <div class="row row-cols-md-2 g-3 pb-5">
          <div class="col-12" v-for="product in restaurant.products" v-show="product.visible == 1">
            <div class="my-card">
              <img :src="getImg(product)" class="my-card-img" alt="Img prodotto" />
              <div class="my-text d-flex flex-column justify-content-between">
                <h5>{{ product.name }}</h5>
                <p>{{ product.description }}</p>
                <div class="text-">{{ product.price }}</div>
                <div>
                  <button v-if="items.length > 0 && items[0]?.restaurant_id != $route.params.id"
                    class="btn btn-light me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Aggiungi al carrello
                  </button>
                  <button v-else @click="addItem(product)" class="btn btn-light me-2">
                    Aggiungi al carrello
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Conferma reset del carrello</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-danger">
              Sei sicuro di voler cancellare il tuo carrello e crearne uno nuovo per questo ristorante?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success" data-bs-dismiss="modal">Indietro</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="removeAllItem(product)">
                Accetta
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4 col-md-12">
        <div v-if="items.length > 0">
          <h2 class="py-3 text-color">Il tuo carrello</h2>
          <div v-if="this.items[0].restaurant_id != this.$route.params.id"
            class="alert alert-danger d-flex align-items-center" role="alert">
            <div>
              <i class="fa-solid fa-triangle-exclamation"></i>
              Attenzione! Se aggiungi prodotti di questo ristorante il tuo carrello verra` cancellato.
            </div>
          </div>
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
              <button class="btn btn-light">Vai al carrello</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-color {
  color: #dbd5af;
}

.container-spazio {
  height: 120px;
}

.restaurant-c {
  padding: 15px 0;

  .restaurant-card {
    background-color: transparent !important;
    border: 0;
  }
}

.my-card {
  min-width: 200px;
  max-height: 100%;
  border: 0;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(29, 61, 29, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  background-color: #B92026 !important;
  border-radius: 10px;
  font-size: 16px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  line-height: 15px;

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
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(29, 61, 29, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border-radius: 10px;
  background-color: #F4BA3C;

  .table-borderless {
    --bs-table-bg: transparent !important;
  }
}

@media screen and (min-width: 576px) and (max-width: 768px) {
  .restaurant-img {
    width: 500px;
    margin: auto;
  }
}

@media screen and (min-width: 0px) and (max-width: 575px) {
  .restaurant-img {
    width: 300px;
    margin: auto;
  }
}
</style>
