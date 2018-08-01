import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './styles';

export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#2B2C2C'
    }
  };

  render() {
    return <View style={styles.container} />;
  }
}
