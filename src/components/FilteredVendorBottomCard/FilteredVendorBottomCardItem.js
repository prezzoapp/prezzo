import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import CacheImage from '../CacheImage';
import styles from './styles';

const FilteredVendorBottomCardItem = props => {
  const data = props.item;
  return (
    <TouchableOpacity
      disabled={data.get('disable')}
      activeOpacity={0.6}
      style={styles.listItemBtn}
      onPress={() => !data.get('disable') && props.moveToPosition()}
    >
      <View style={styles.titleHolder}>
        <Text style={styles.name}>{data.get('name')}</Text>
        <Text style={styles.distance}>{
          props.getDistanceFromCurrentLocation(
            data.getIn(['location', 'coordinates']))}
        </Text>
      </View>

      <View style={styles.statusHolder}>
        <CacheImage
          source={require("../../../assets/images/open_restaurant_status.png")}
          type='image'
          style={styles.statusImage}
        />
        <Text style={styles.status}>{data.get('status')}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default FilteredVendorBottomCardItem;
