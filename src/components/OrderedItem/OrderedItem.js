// @flow
import React from 'react';
import { View, Text, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styles from './styles';
import { FontAwesome, Entypo } from '../VectorIcons';
import CacheImage from '../CacheImage';

const OrderedItem = props => {
  itemSeparatorComponent = () => {
    return <View style={styles.separator} />;
  };

  const data = props.data;

  return (
    <View style={styles.container}>
      <View style={styles.itemImageContainer}>
        <CacheImage
          style={styles.itemImage}
          type='image'
          source={props.data.imageURLs[0]}
        />
      </View>
      <View style={styles.itemTextContainer}>
        <FontAwesome
          name={data.status === 2 ? 'circle' : 'circle-o'}
          size={data.status === 2 ? wp('2.93%') : wp('3.2%')}
          style={styles.dot}
        />
        <Text style={styles.itemName} numberOfLines={2}>{data.title} x{data.quantity}</Text>
      </View>
    </View>
  );
};

export default OrderedItem;
