import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class OpenOrdersList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is an Open Table Payment Tab.</Text>
      </View>
    )
  }
}

export default OpenOrdersList;
