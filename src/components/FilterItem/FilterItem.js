import React, { Component } from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';

import PropTypes from 'prop-types';
import styles from './styles';

export default class FilterItems extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    toggleFilter: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.item.active !== this.props.item.active) {
      return true;
    }
    return false;
  }

  getSelectedItemIDAndToggleFilter = () => {
    this.props.toggleFilter();
  };

  render() {
    const activeFilterStyle = {
      backgroundColor: '#2ed573',
      shadowColor: '#2ED573',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 3,
      shadowOpacity: 0.6
    }
    const inactiveFilterStyle = {
      backgroundColor: '#757575'
    }
    // console.log('Toggle Rendering Called!');
    return (
      <View style={{ marginRight: 12 }}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.item,
            this.props.item.active ? activeFilterStyle : inactiveFilterStyle
          ]}
          onPress={this.getSelectedItemIDAndToggleFilter}
        >
          <Image source={this.props.item.image} style={styles.itemImage} />
        </TouchableOpacity>
        <Text style={styles.itemName}>{this.props.item.name}</Text>
      </View>
    );
  }
}
