paypal.Button.render({

    // Set your environment

    env: 'sandbox', // sandbox | production

    // Specify the style of the button

    style: {
        label: 'checkout',  // checkout | credit | pay | buynow | generic
        size: 'responsive', // small | medium | large | responsive
        shape: 'pill',   // pill | rect
        color: 'gold'   // gold | blue | silver | black
    },

    // PayPal Client IDs - replace with your own
    // Create a PayPal app: https://developer.paypal.com/developer/applications/create

    client: {
        sandbox: 'process.env.PAYPAL_ID'
    },

    // Wait for the PayPal button to be clicked

    payment: function (data, actions) {
        return actions.payment.create({
            payment: {
                transactions: [
                    {
                        amount: { total: '$1,000,000.01', currency: 'USD' }
                    }
                ]
            }
        });
    },

    // Wait for the payment to be authorized by the customer

    onAuthorize: function (data, actions) {
        return actions.payment.execute().then(function () {
            window.alert('Payment Complete!');
        });
    }

}, '#paypal-button-container');