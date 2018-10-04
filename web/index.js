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
          // billingAddress: {
          //   postalCode: text.payload.postalCode
          // },
          options: {
            validate: false
          }
        }
      };

      clientInstance.request({
          endpoint: 'payment_methods/credit_cards',
          method: 'post',
          data
        }, (requestErr, response) => {
          if (requestErr) {
            RNMessageChannel.emit('isError', {
              payload: JSON.stringify(requestErr.details.originalError)
            });
          }

          RNMessageChannel.emit('isTokenizationComplete', {
            payload: response.creditCards[0].nonce
          });
        }
      );
    }
  );
});
