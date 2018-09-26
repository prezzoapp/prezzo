import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { PropTypes } from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BTClient from 'react-native-braintree-xplat';
import MenuButton from '../../../components/MenuButton';
import styles from './styles';
import { get, post } from '../../../utils/api';

class PaymentMenu extends Component {
  static navigationOptions = {
    title: 'Payment Methods',
    headerStyle: {
      backgroundColor: '#2B2C2C',
      shadowColor: 'transparent',
      borderBottomWidth: 0
    },
    headerTintColor: '#fff'
  };

  static displayName = 'Payment Methods';

  addCreditCard() {
    try {
      get(`/v1/self/payment-token`).then(response => {
        BTClient.setup(response.token);

        BTClient.showPaymentViewController().then(nonce => {
          console.log(nonce);
          post(`/v1/payment-methods`, {
            nonce
          }).then(res => {
            console.log(res);
          });
        });
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  render() {
    return (
      <View style={styles.parent}>
        <View style={[styles.container, { marginTop: hp('7.389%') }]}>
          <MenuButton
            onPress={() => this.addCreditCard()}
            title="Add Credit Card"
            icon="add"
            leftIcon={
              <Image
                source={require('../../../../assets/images/Credit-Card.png')}
                style={{
                  width: 28,
                  resizeMode: 'contain'
                }}
              />
            }
          />

          <MenuButton
            onPress={() => {}}
            title="Add Bitcoin"
            icon="add"
            leftIcon={
              <Image
                source={require('../../../../assets/images/bitcoin.png')}
                style={{
                  width: 20,
                  resizeMode: 'contain'
                }}
              />
            }
          />

          <MenuButton
            onPress={() => {}}
            title="Add Paypal"
            icon="add"
            leftIcon={
              <Image
                source={require('../../../../assets/images/Paypal-icon.png')}
                style={{
                  width: 25,
                  resizeMode: 'contain'
                }}
              />
            }
          />
        </View>
      </View>
    );
  }
}

PaymentMenu.propTypes = {
  navigate: PropTypes.func.isRequired
};

export default PaymentMenu;
