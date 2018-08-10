import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/dist/Feather';

import styles from './styles';

const RestaurantItem = props => (
  <View style={styles.item}>
    <View style={styles.leftSideContainer}>
      <Text style={styles.itemTitle}>
        {props.item.name} - ${props.item.price}
      </Text>
      <Text style={styles.itemIngradients}>{props.item.ingradients}</Text>
    </View>
    <View style={styles.rightSideContainer}>
      {props.item.quantity === 0 ? (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => props.changeQuantity(props.item.id, 'add')}
        >
          <Icon name="plus" size={22} color="white" />
        </TouchableOpacity>
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.changeQuantity(props.item.id, 'add')}
          >
            <Icon name="plus" size={22} color="green" />
          </TouchableOpacity>

          <Text style={[styles.itemTitle, { top: -3 }]}>
            {props.item.quantity}
          </Text>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.changeQuantity(props.item.id, 'remove')}
          >
            <Icon name="minus" size={22} color="green" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  </View>
);

RestaurantItem.propTypes = {
  item: PropTypes.object.isRequired,
  changeQuantity: PropTypes.func.isRequired
};

export default RestaurantItem;
