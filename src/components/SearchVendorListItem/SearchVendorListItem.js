import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import RatingBar from '../RatingBar';
import styles from './styles';

const SearchVendorListItem = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.listItem}
      onPress={() =>
        props.navigate({
          routeName: 'RestaurantDetails',
          params: { item: props.item }
        })
      }
    >
      <Image
        source={{ uri: props.item.avatarURL }}
        style={styles.vendorImage}
      />
      <View style={styles.infoHolder}>
        <Text style={styles.name}>{props.item.name}</Text>
        <Text style={styles.address} numberOfLines={2}>
          {props.item.location.address}, {props.item.location.regionShort},{' '}
          {props.item.location.postalCode}
        </Text>
        <View style={styles.ratingHolder}>
          <RatingBar disable itemRating={3}/>
          <Text style={styles.ratingText}>47 Ratings</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

SearchVendorListItem.propTypes = {
  navigate: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

export default SearchVendorListItem;
