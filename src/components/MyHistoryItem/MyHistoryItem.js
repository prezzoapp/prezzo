import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { Feather } from '../VectorIcons';
import CacheImage from '../CacheImage';
import { TAX } from '../../services/constants';
import styles from './styles';

const MyHistoryItem = props => {
  const item = props.item;
  const date = new Date(item.get('createdDate'));
  let totalPrice = 0;
  item.get('items').map(item => {
    totalPrice += item.get('price');
  });
  totalPrice += TAX;

  return (
    <View style={styles.item}>
      <View style={styles.leftSide}>
        <View style={styles.statusIconHolder}>
          <CacheImage
            source={require('../../../assets/images/icons/active_status.png')}
            type='image'
            style={styles.statusImage}
          />
        </View>
        <View style={styles.sideBorder} />
      </View>

      <View
        style={styles.rightSide}
      >
        <Text style={styles.status}>
          {date.getDate()} . {date.getMonth()} . {date.getFullYear().toString().substr(-2)}
        </Text>
        <Text style={styles.name} numberOfLines={2}>
          {item.getIn(['vendor', 'name'])}
        </Text>
        <Text style={styles.info} numberOfLines={1}>
          {item.get('type') === 'table' ? 'Dine In' : 'Delivery'} - ${totalPrice}
        </Text>
      </View>
    </View>
  );
};

MyHistoryItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default MyHistoryItem;
