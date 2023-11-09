<script>

export default {

    data() {
        return {
            button : document.querySelector('#submit-button'),
            $errBox : ('#error-box'),
            $successBox : ('#success-box'),

            // braintreeContainer : document.getElementById('dropin-container'),
            // paymentSucces : false,
        }
    },

    methods : {
        // checkElement(element) {
        //     if (!this.braintreeContainer.textContent.trim() !== '') {
        //         setTimeout(() => {
        //             location.reload()
        //         }, 500);
        //     }
        // }
    },

    mounted() {

        let jqueryScript = document.createElement('script')
        jqueryScript.setAttribute('src', 'https://code.jquery.com/jquery-3.6.0.min.js')
        document.head.appendChild(jqueryScript)

        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', 'https://js.braintreegateway.com/web/dropin/1.40.2/js/dropin.min.js')
        document.head.appendChild(recaptchaScript)

        let braintreeScript = document.createElement('script')
        braintreeScript.setAttribute('src', '/src/braintree.js')
        setTimeout(() => {
            document.head.appendChild(braintreeScript)
            }, 500);

    },

};

</script>

<template>
    <h1>Welcome to the cart page</h1>

    <div class="container main">
        <div class="page-header">
            <h1>Braintree Example</h1>
        </div>

        <div id="error-box" class="alert alert-danger hidden" role="alert"></div>
        <div id="success-box" class="alert alert-success hidden" role="alert"></div>

        <div id="dropin-container"></div>

        <button class="btn btn-lg btn-primary" id="submit-button">Request payment method</button>
        </div>

</template>

<style lang="scss" scoped>

.hidden {
    display: none;
}

</style>