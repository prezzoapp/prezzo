// @flow
import React from 'react';
import { View, Text, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import styles from './styles';
import CacheImage from '../CacheImage';
import { FontAwesome, Entypo } from '../VectorIcons';

const OrderedItem = props => {
  const data = props.data;
  return (
    <View style={styles.container}>
      <View style={styles.itemImageContainer}>
        <CacheImage
          style={styles.itemImage}
          type='image'
          source={data.get('imageURLs').first()}
        />
      </View>
      <View style={styles.itemTextContainer}>
        <FontAwesome
          name={data.get('status') === 2 ? 'circle' : 'circle-o'}
          size={data.get('status') === 2 ? wp('2.93%') : wp('3.2%')}
          style={styles.dot}
        />
        <Text style={styles.itemName} numberOfLines={2}>{data.get('title')} x{data.get('quantity')}</Text>
      </View>
    </View>
  );
};

OrderedItem.propTypes = {
  data: PropTypes.object.isRequired
};

export default OrderedItem;
