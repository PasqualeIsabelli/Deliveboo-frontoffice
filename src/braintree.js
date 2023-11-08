// import paymentSuccess from '/src/pages/Cart.vue';

var button = document.querySelector('#submit-button');
var $errBox = $('#error-box');
var $successBox = $('#success-box');

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
}, function (createErr, instance) {
        if (createErr) {
            displayMessage($errBox, createErr.message);
            return;
        }
    button.addEventListener('click', function () {
    clearMessage($errBox);
    clearMessage($successBox);
    
        instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
            if (requestPaymentMethodErr) {
                // paymentSuccess = false;
                displayMessage($errBox, requestPaymentMethodErr.message);
                return;
            }

            // paymentSuccess = true;
            displayMessage($successBox, 'Send Payment Method Nonce (' + payload.nonce + ') to your server.');
        });
    });
});