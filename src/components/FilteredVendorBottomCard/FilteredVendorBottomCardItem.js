import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import styles from './styles';

const FilteredVendorBottomCardItem = props => {
  return (
    <TouchableOpacity
      disabled={props.item.disable}
      activeOpacity={0.6}
      style={styles.listItemBtn}
      onPress={() =>
        !props.item.disable &&
        props.moveToPosition(props.item.location.coordinates)
      }
    >
      <View style={styles.titleHolder}>
        <Text style={styles.name}>{props.item.name}</Text>
        <Text style={styles.distance}>{
          props.getDistanceFromCurrentLocation(
            props.item.location.coordinates)}
        </Text>
      </View>

      <View style={styles.statusHolder}>
        <Image
          source={require("../../../assets/images/open_restaurant_status.png")}
          style={styles.statusImage}
        />
        <Text style={styles.status}>{props.item.status}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default FilteredVendorBottomCardItem;
