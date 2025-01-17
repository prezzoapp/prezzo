import RNMessageChannel from 'react-native-webview-messaging';

const createClient = require('braintree-web/client').create;

RNMessageChannel.on('json', text => {
  console.log('Fired!');
  createClient({
      authorization: text.payload.token
    }, (createErr, clientInstance) => {
      if(createErr) {
        console.log(createErr);
        RNMessageChannel.emit('isError', {
          message: createErr
        });
      }
      const data = {
        creditCard: {
          number: text.payload.number,
          cvv: text.payload.cvv,
          expirationDate: text.payload.expirationDate,
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
              message: requestErr
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
