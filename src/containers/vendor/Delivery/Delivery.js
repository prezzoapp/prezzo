import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styles from './styles';

export default class Delivery extends Component {
  static displayName = 'Delivery';

  static navigationOptions = {
    title: 'Delivery',
    tabBarIcon: props => (
      <Image
        style={{ height: 24, width: 24, tintColor: props.tintColor }}
        source={require('../../../../assets/images/icons/Delivery.png')}
      />
    ),
    headerTintColor: 'white',
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0
    }
  };

  render() {
    return <View style={styles.container} />;
  }
}
