// @flow
import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import { FontAwesome, Entypo } from '../VectorIcons';

const OrderedItem = props => {
  console.log(props.data.imageURLs[0]);
  return (
    <View style={styles.container}>
      <Image style={styles.itemImage} source={{ uri: props.data.imageURLs[0] }} />
      <View style={styles.itemTextContainer}>
        <FontAwesome
          name={props.data.status === 2 ? 'circle' : 'circle-o'}
          size={props.data.status === 2 ? 11 : 12}
          style={styles.dot}
        />
        <Text style={styles.itemName} numberOfLines={3}>{props.data.title}</Text>
      </View>
    </View>
  );
};

export default OrderedItem;
