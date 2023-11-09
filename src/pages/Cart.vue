<script>
export default {
  data() {
    return {
      button: document.querySelector("#submit-button"),
      $errBox: "#error-box",
      $successBox: "#success-box",
      // paymentSucces : false,
    };
  },

  methods: {},

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
      </div>
      <div class="col-6">
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
                <td class="text-end"></td>
                <td class="text-center">
                  {{ (item.price * cart[item.id]).toFixed(2) }}€
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
</template>

<style lang="scss" scoped>
.hidden {
  display: none;
}
</style>
