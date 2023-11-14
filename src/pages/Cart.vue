<script>
import axios from "axios";
// import Loader from "../components/Loader.vue"

export default {
    components: {
        // Loader
    },
    data() {
        return {
            items: [],
            restaurant: [],
            totalPrice: [],
            cart: {},
            sum: 0,
            confDeleteCart: false,

            orderData: {
                customer_name: "",
                customer_surname: "",
                customer_email: "",
                customer_phone: "",
                products: [],
                quantities: [],
                customer_address: "",
                total_price: 0,
                status: true,
                notes: "",
            },

            errors: {
                customer_name: null,
                customer_surname: null,
                customer_email: null,
                customer_phone: null,
                customer_address: null,
            },
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
            this.orderData.total_price = this.sum;
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

        sendData() {
            this.errors = {};

            if (!this.orderData.customer_name) {
                this.errors.customer_name = "Nome obbligatorio";
            }

            if (!this.orderData.customer_surname) {
                this.errors.customer_surname = "Cognome obbligatorio";
            }

            if (!this.orderData.customer_address) {
                this.errors.customer_address = "Indirizzo obbligatorio";
            }

            if (!this.orderData.customer_email) {
                this.errors.customer_email = "Email obbligatoria";
            }

            if (!this.orderData.customer_phone) {
                this.errors.customer_phone = "Numero di telefono obbligatorio";
            } else if (isNaN(this.errors.customer_phone)) {
                this.errors.customer_phone = "Numero di telefono non valido";
            } else if (this.orderData.customer_phone.length < 10) {
                this.errors.customer_phone =
                    "Il numero di telefono deve avere 10 cifre";
            }

            if (
                this.orderData.customer_name &&
                this.orderData.customer_surname &&
                this.orderData.customer_email &&
                this.orderData.customer_address &&
                this.orderData.customer_phone
            ) {
                this.localStorage();
                this.orderData.total_price = this.sum;
                this.items.forEach((item) => {
                    this.orderData.products.push(item.id);
                    this.orderData.quantities.push(this.cart[item.id])
                });
                axios.post("http://127.0.0.1:8000/api/orders", this.orderData);
                console.log(this.orderData);
                console.log(this.cart);
                this.$router.push({ name: "order_confirmed" });
            }
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

        setTimeout(() => {
            const button = document.querySelector('#submit-button');
            const $errBox = $('#error-box');
            const $successBox = $('#success-box');

            function displayMessage(box, message) {

                box.html(message);
                box.removeClass('hidden');

            }

            function clearMessage(box) {

                box.html('');
                box.addClass('hidden');

            }

            braintree.dropin.create({
                authorization: 'sandbox_fw2yzmcx_8g9hfnsjn3sxvt5r',
                selector: '#dropin-container',
                card: {
                    overrides: {
                        fields: {
                            number: {
                                supportedCardBrands: {
                                },
                            }
                        }
                    }
                },
            }, (createErr, instance) => {
                    if (createErr) {
                        displayMessage($errBox, createErr.message);
                        return;
                    }
                button.addEventListener('click', () => {
                clearMessage($errBox);
                clearMessage($successBox);
                
                    instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
                        if (requestPaymentMethodErr) {
                            displayMessage($errBox, requestPaymentMethodErr.message);


                            this.errors = {};

                            if (!this.orderData.customer_name) {
                                this.errors.customer_name = "Nome obbligatorio";
                            }

                            if (!this.orderData.customer_surname) {
                                this.errors.customer_surname = "Cognome obbligatorio";
                            }

                            if (!this.orderData.customer_address) {
                                this.errors.customer_address = "Indirizzo obbligatorio";
                            }

                            if (!this.orderData.customer_email) {
                                this.errors.customer_email = "Email obbligatoria";
                            }

                            if (!this.orderData.customer_phone) {
                                this.errors.customer_phone = "Numero di telefono obbligatorio";
                            } else if (isNaN(this.errors.customer_phone)) {
                                this.errors.customer_phone = "Numero di telefono non valido";
                            } else if (this.orderData.customer_phone.length < 10) {
                                this.errors.customer_phone =
                                    "Il numero di telefono deve avere 10 cifre";
                            }

                            return;
                        }

                        this.errors = {};

                        if (!this.orderData.customer_name) {
                            this.errors.customer_name = "Nome obbligatorio";
                        }

                        if (!this.orderData.customer_surname) {
                            this.errors.customer_surname = "Cognome obbligatorio";
                        }

                        if (!this.orderData.customer_address) {
                            this.errors.customer_address = "Indirizzo obbligatorio";
                        }

                        if (!this.orderData.customer_email) {
                            this.errors.customer_email = "Email obbligatoria";
                        }

                        if (!this.orderData.customer_phone) {
                            this.errors.customer_phone = "Numero di telefono obbligatorio";
                        } else if (isNaN(this.errors.customer_phone)) {
                            this.errors.customer_phone = "Numero di telefono non valido";
                        } else if (this.orderData.customer_phone.length < 10) {
                            this.errors.customer_phone =
                                "Il numero di telefono deve avere 10 cifre";
                        }

                        if (
                            this.orderData.customer_name &&
                            this.orderData.customer_surname &&
                            this.orderData.customer_email &&
                            this.orderData.customer_address &&
                            this.orderData.customer_phone
                        ) {
                            displayMessage($successBox, 'Send Payment Method Nonce (' + payload.nonce + ') to your server.');
                            this.sendData();
                        } else {
                            displayMessage($successBox, 'Card data correct, please insert your info');
                        }


                    });
                });
            });
        }, 750);

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
    <div class="container my-container">
        <!-- <Loader v-if="isLoading"></Loader> -->
        <!-- <div v-else="code"> -->
        <div class="row">
            <div class="container main col-6">
                <h2 class="py-3">Inserisci i tuoi dati</h2>

                <form class="row g-3" @submit.prevent="">
                    <div class="col-md-6">
                        <label for="inputName" class="form-label">Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="inputName" v-model="orderData.customer_name"/>
                        <div class="text-danger">
                            {{ this.errors.customer_name }}
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="inputSurname" class="form-label">Surname <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="inputSurname" v-model="orderData.customer_surname" />
                        <div class="text-danger">
                            {{ this.errors.customer_surname }}
                        </div>
                    </div>
                    <div class="col-12">
                        <label for="inputEmail" class="form-label">Email <span class="text-danger">*</span></label>
                        <input type="email" class="form-control" id="inputEmail" v-model="orderData.customer_email" />
                        <div class="text-danger">
                            {{ this.errors.customer_email }}
                        </div>
                    </div>
                    <div class="col-12">
                        <label for="inputPhone" class="form-label">Phone <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="inputPhone" v-model="orderData.customer_phone" />
                        <div class="text-danger">
                            {{ this.errors.customer_phone }}
                        </div>
                    </div>
                    <div class="col-12">
                        <label for="inputAddress" class="form-label">Address <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="Via Brombeis 23"
                            v-model="orderData.customer_address" />
                        <div class="text-danger">
                            {{ this.errors.customer_address }}
                        </div>
                    </div>
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave order notes here" id="inputNotes"
                            style="height: 100px" v-model="orderData.notes"></textarea>
                        <label for="floatingTextarea2">Notes</label>
                    </div>

                    <div class="page-header"></div>

                    <div id="error-box" class="alert alert-danger hidden" role="alert"></div>
                    <div id="success-box" class="alert alert-success hidden" role="alert"></div>

                    <div id="dropin-container"></div>

                    <!-- <router-link :to="{ name: 'order_confirmed' }"> -->
                    <button class="btn btn-lg btn-primary" id="submit-button">
                        Procedi all'ordine
                    </button>
                    <!-- </router-link> -->
                </form>
            </div>
            <div class="col-6">
                <div class="container">
                    <h2 class="py-3">Il tuo carrello</h2>

                    <div class="my-table-container rounded-3 p-3">
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
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>

<style lang="scss" scoped>
.my-container {
    padding: 130px 0 50px 0;

    .my-table-container {
        background-color: #F4BA3C !important;

        .table-borderless {
            --bs-table-bg: transparent !important;
        }
    }
}

.hidden {
    display: none;
}
</style>
