import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';

import PropTypes from 'prop-types';
import styles from './styles';

export default class FilterItems extends Component {
  static propTypes = {
    toggleFilter: PropTypes.func.isRequired,
    on: PropTypes.bool,
    image: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps) {
    if(nextProps.on !== this.props.on) return true;
    return false;
  }

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

    return (
      <View style={styles.filterItem}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.item,
            this.props.on ? activeFilterStyle : inactiveFilterStyle
          ]}
          onPress={() => this.props.toggleFilter()}
        >
          <Image
            source={this.props.image}
            style={styles.itemImage}
          />
        </TouchableOpacity>
        <Text style={styles.itemName}>{this.props.name}</Text>
      </View>
    );
  }
}

FilterItems.defaultProps = {
  on: false
};
