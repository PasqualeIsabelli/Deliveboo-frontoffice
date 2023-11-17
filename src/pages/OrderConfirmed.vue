<script>
import Loader from "../components/Loader.vue"

export default {
    components: {
        Loader
    },
    data() {
        return {
            isLoading: true,
            code: false,
            totalPrice: [],
            cart: {},
            sum: 0,
        };
    },

    computed: {
        itemsFromLocalStorage() {
            // Recupera gli elementi dal localStorage e analizza il JSON, se presente
            return JSON.parse(localStorage.getItem("items") || "[]");
        },
    },

    methods: {
    },

    mounted() {
        setTimeout(() => {
            this.isLoading = false;
            setTimeout(() => {
                this.code = true;
            });
        }, 2000);
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
    <section class="jumbo"></section>
    <div class="container">
        <Loader v-if="isLoading"></Loader>
        <div v-else="code">
            <h1 class="pb-3"><span class="text-white"><i class="fa-solid fa-circle-check"></i></span> Il tuo ordine è stato confermato, grazie per averci scelto!</h1>

            <div class="row">
                <div class="col-lg-5 col-md-6 col-sm-8">
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
                                    <td></td>
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
    </div>
</template>

<style lang="scss" scoped>
.jumbo {
    width: 100%;
    height: 600px;
    background-image: url(../assets/images/jumbo.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
}
.my-table-container {
        background-color: #F4BA3C !important;

        .table-borderless {
            --bs-table-bg: transparent !important;
        }
    }
</style>
