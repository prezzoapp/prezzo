// @flow
import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import CacheImage from '../CacheImage';
import styles from './styles';

const ExploreListItem = props => {
  moveToDetails = item => {
    props.navigate({ routeName: 'RestaurantDetails', params: { item } });
  }

  const { avatarURL, name, location } = props.item;

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => this.moveToDetails(this.props.item)}
      >
        <CacheImage
          source={avatarURL}
          type='backgroundImage'
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

ExploreListItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired
};

export default ExploreListItem;
