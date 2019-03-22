import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const FilteredVendorBottomCardItem = props => {
  return (
    <TouchableOpacity
      disabled={props.item.disable}
      activeOpacity={0.6}
      style={styles.listItemBtn}
      onPress={() => !props.item.disable && props.moveToPosition()}
    >
      <View style={styles.titleHolder}>
        <Text style={styles.name}>{props.item.name}</Text>
        <Text style={styles.distance}>{
          props.getDistanceFromCurrentLocation(
            props.item.location.coordinates)}
        </Text>
      </View>

      <View style={styles.statusHolder}>
        <CacheImage
          source={require("../../../assets/images/open_restaurant_status.png")}
          type='image'
          style={styles.statusImage}
        />
        <Text style={styles.status}>{props.item.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

FilteredVendorBottomCardItem.propTypes = {
  item: PropTypes.object.isRequired,
  moveToPosition: PropTypes.func.isRequired,
  getDistanceFromCurrentLocation: PropTypes.func.isRequired
};

export default FilteredVendorBottomCardItem;
