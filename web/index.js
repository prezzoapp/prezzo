import RNMessageChannel from 'react-native-webview-messaging';

const createClient = require('braintree-web/client').create;

RNMessageChannel.on('json', text => {
  createClient({
    authorization: text.payload.token
    }, (createErr, clientInstance) => {
      const data = {
        creditCard: {
          number: text.payload.number,
          cvv: text.payload.cvv,
          expirationDate: text.payload.expirationDate,
          billingAddress: {
            postalCode: text.payload.postalCode
          },
          options: {
            validate: true
          }
        }
      };

      // Warning: For a merchant to be eligible for the easiest level of PCI compliance (SAQ A),
      // payment fields cannot be hosted on your checkout page.
      // For an alternative to the following, use Hosted Fields.
      clientInstance.request({
          endpoint: 'payment_methods/credit_cards',
          method: 'post',
          data
        }, (requestErr, response) => {
          // More detailed example of handling API errors: https://codepen.io/braintree/pen/MbwjdM
          if (requestErr) {
            throw new Error(requestErr);
          }

          RNMessageChannel.emit('isTokenizationComplete', {
            payload: response.creditCards[0].nonce
          });
        }
      );
    }
  );
});
