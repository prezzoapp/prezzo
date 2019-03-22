// @flow
import React from 'react';
import { View, Text, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import styles from './styles';
import { FontAwesome, Entypo } from '../VectorIcons';

const OrderedItem = props => {
  return (
    <View style={styles.container}>
      <View style={styles.itemImageContainer}>
        <Image style={styles.itemImage} source={{ uri: props.data.imageURLs[0] }} />
      </View>
      <View style={styles.itemTextContainer}>
        <FontAwesome
          name={props.data.status === 2 ? 'circle' : 'circle-o'}
          size={props.data.status === 2 ? wp('2.93%') : wp('3.2%')}
          style={styles.dot}
        />
        <Text style={styles.itemName} numberOfLines={2}>{props.data.title}</Text>
      </View>
    </View>
  );
};

OrderedItem.propTypes = {
  data: PropTypes.object.isRequired
};

export default OrderedItem;
