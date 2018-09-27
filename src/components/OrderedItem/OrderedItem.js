// @flow
import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import { FontAwesome, Entypo } from '../VectorIcons';

const OrderedItem = props => {
  const { data } = props
  return (
    <View style={styles.container}>
      <Image style={styles.itemImage} source={data.imgUrl} />
      <View style={styles.itemTextContainer}>
        <FontAwesome
          name={data.status === 2 ? 'circle' : 'circle-o'}
          size={data.status === 2 ? 11 : 12}
          style={styles.dot}
        />
        <Text style={styles.itemName}>{data.itemName}</Text>
      </View>
      <Text style={styles.quantity}>x{data.quantity}</Text>
    </View>
  );
};

export default OrderedItem;
