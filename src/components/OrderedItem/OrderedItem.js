// @flow
import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import { FontAwesome } from '../VectorIcons';

const OrderedItem = props => (
  <View style={styles.container}>
    <Image
      style={styles.itemImage}
      source={require('../../../assets/images/item2.png')}
    />
    <View style={{ flexDirection: 'row' }}>
      <FontAwesome name="circle" size={10} style={styles.dot} />
      <Text style={styles.itemName}>Mac and Cheese</Text>
    </View>
    <Text style={styles.quantity}>x2</Text>
  </View>
);

export default OrderedItem;
