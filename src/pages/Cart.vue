<script>
export default {
  data() {
    return {
      button: document.querySelector("#submit-button"),
      $errBox: "#error-box",
      $successBox: "#success-box",
      // paymentSucces : false,
      items: [],
      restaurant: [],
      totalPrice: [],
      cart: {},
      sum: 0,
      confDeleteCart: false,
    };
  },

  methods: {
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
  },

  mounted() {
    let jqueryScript = document.createElement("script");
    jqueryScript.setAttribute(
      "src",
      "https://code.jquery.com/jquery-3.6.0.min.js"
    );
    document.head.appendChild(jqueryScript);

    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://js.braintreegateway.com/web/dropin/1.40.2/js/dropin.min.js"
    );
    document.head.appendChild(recaptchaScript);

    let braintreeScript = document.createElement("script");
    braintreeScript.setAttribute("src", "/src/braintree.js");
    setTimeout(() => {
      document.head.appendChild(braintreeScript);
    }, 500);

    document.head.appendChild(braintreeScript);
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
  <div class="container pt-5">
    <div class="row">
      <div class="container main col-6">
        <form class="row g-3">
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">Nome</label>
            <input type="email" class="form-control" id="inputEmail4" />
          </div>
          <div class="col-md-6">
            <label for="inputPassword4" class="form-label">Cognome</label>
            <input type="password" class="form-control" id="inputPassword4" />
          </div>
          <div class="col-12">
            <label for="inputEmail4" class="form-label">Email</label>
            <input type="email" class="form-control" id="inputEmail4" />
          </div>
          <div class="col-12">
            <label for="inputAddress" class="form-label"
              >Numero di cellulare</label
            >
            <input type="text" class="form-control" id="inputAddress" />
          </div>
          <div class="col-12">
            <label for="inputAddress" class="form-label">Address</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
            />
          </div>
          <div class="page-header"></div>

          <div
            id="error-box"
            class="alert alert-danger hidden"
            role="alert"
          ></div>
          <div
            id="success-box"
            class="alert alert-success hidden"
            role="alert"
          ></div>

          <div id="dropin-container"></div>

          <button class="btn btn-lg btn-primary" id="submit-button">
            Request payment method
          </button>
        </form>
      </div>
      <div class="col-6">
        <div class="my-table-container p-3">
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
                    <button
                      class="btn text-danger p-0"
                      @click="removeItem(index)"
                    >
                      <i class="fa-solid fa-minus"></i>
                    </button>
                  </td>
                  <td class="text-center">
                    {{ (item.price * cart[item.id]).toFixed(2) }}€
                  </td>
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hidden {
  display: none;
}
</style>
