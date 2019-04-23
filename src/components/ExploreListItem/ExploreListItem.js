// @flow
import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import CacheImage from '../CacheImage';
import styles from './styles';

export default class ExploreListItem extends Component {
  constructor() {
    super();

    this.moveToDetails = this.moveToDetails.bind(this);
  }

  // shouldComponentUpdate(nextProps) {
  //   const item = this.props.item;
  //   const next = nextProps.item;
  //   if(
  //     item.get('_id') !== next.get('_id') ||
  //     item.get('avatarURL') !== next.get('avatarURL') ||
  //     item.get('items') !== next.get('items')
  //   ) return true;
  //   return false;
  // }

  componentWillUnmount() {
    console.log('WillUnmount called!');
  }

  moveToDetails(item) {
    this.props.navigate({ routeName: 'RestaurantDetails', params: { item } });
  }

  render() {
    console.log('Explore list item render called!');
    const item = this.props.item;
    const avatarURL = item.get('avatarURL');
    const name = item.get('name');
    const location = item.get('location');

    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => this.moveToDetails(item)}
        >
          <CacheImage
            source={avatarURL}
            style={styles.image}
            type='backgroundImage'
            imageStyle={styles.imageStyle}
          />
        </TouchableOpacity>

        <Text style={styles.restaurantName}>{name}</Text>
        <Text style={styles.cityName}>
          {`${location.get('address')} ${location.get('city')} ${location.get('regionShort')}`}
        </Text>
      </View>
    );
  }
}

ExploreListItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired
};
