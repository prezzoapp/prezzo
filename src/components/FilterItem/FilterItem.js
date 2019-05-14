import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';

import PropTypes from 'prop-types';
import CacheImage from '../CacheImage';
import styles from './styles';

const FilterItems = props => {
  const activeFilterStyle = {
    backgroundColor: '#2ed573',
    shadowColor: '#2ED573',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.6
  };
  const inactiveFilterStyle = {
    backgroundColor: '#757575'
  };

  return (
    <View style={styles.filterItem}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[
          styles.item,
          props.on ? activeFilterStyle : inactiveFilterStyle
        ]}
        onPress={props.toggleFilter}
      >
        <CacheImage
          source={props.image}
          type='image'
          style={styles.itemImage}
        />
      </TouchableOpacity>
      <Text style={styles.itemName}>{props.name}</Text>
    </View>
  );
};

FilterItems.propTypes = {
  toggleFilter: PropTypes.func.isRequired,
  on: PropTypes.bool,
  image: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

FilterItems.defaultProps = {
  on: false
};

export default FilterItems;
