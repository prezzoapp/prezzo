import React, { Component } from 'react';
import { View } from 'react-native';

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

  render() {
    return <View style={{ flex: 1, backgroundColor: 'orange' }} />;
  }
}

export default PaymentMenu;
