import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class ActivityOpenOrder extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is Activity Open Order Tab View.</Text>
      </View>
    );
  }
}

export default ActivityOpenOrder;
