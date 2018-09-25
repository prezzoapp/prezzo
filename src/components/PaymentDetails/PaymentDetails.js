import React, { Component } from 'react';
import { Image, View } from 'react-native';
import styles from './styles';

class PaymentDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
      headerStyle: {
        backgroundColor: '#2B2C2C',
        shadowColor: 'transparent',
        borderBottomWidth: 0
      },
      headerTintColor: '#fff',
      headerBackTitle: 'Hello'
    }
  };

  static displayName = 'Payment Methods';

  constructor() {
    super();

    this.state = { cardNumber: '', date: '', cvc: '', zip: '' };
  }

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

export default PaymentDetails;
