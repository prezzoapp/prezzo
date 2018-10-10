// @flow
import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import { FontAwesome, Entypo } from '../VectorIcons';

const OrderedItem = props => {
  console.log(props.data);
  return (
    <View style={styles.container}>
      <Image style={styles.itemImage} source={props.data.imgUrl} />
      <View style={styles.itemTextContainer}>
        <FontAwesome
          name={props.data.status === 2 ? 'circle' : 'circle-o'}
          size={props.data.status === 2 ? 11 : 12}
          style={styles.dot}
        />
        <Text style={styles.itemName}>{props.data.itemName}</Text>
      </View>
      <Text style={styles.quantity}>x{props.data.quantity}</Text>
    </View>
  );
};

export default OrderedItem;
