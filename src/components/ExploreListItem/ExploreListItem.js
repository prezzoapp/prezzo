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

  moveToDetails(item) {
    this.props.navigate({ routeName: 'RestaurantDetails', params: { item } });
  }

  render() {
    const { avatarURL, name, location } = this.props.item;

    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => this.moveToDetails(this.props.item)}
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
          {`${location.address} ${location.city} ${location.regionShort}`}
        </Text>
      </View>
    );
  }
}

ExploreListItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired
};
