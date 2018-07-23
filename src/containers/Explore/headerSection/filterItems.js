import React, {Component} from 'react';
import {TouchableOpacity, Image, Text, View, StyleSheet} from 'react-native';

import PropTypes from 'prop-types';

export default class FilterItems extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    toggleFilter: PropTypes.func,
    selectedFilterID: PropTypes.func
  };

  constructor() {
    super();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.item.active !== this.props.item.active) {
      return true;
    }
    else {
      return false;
    }
  }

  getSelectedItemIDAndToggleFilter = () => {
    this.props.toggleFilter();
  }

  render() {
    // console.log('Filter Item Render Called!');
    return (
      <View style={{marginRight: 12}}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.item, {backgroundColor: (this.props.item.active) ? '#2ed573' : '#757575'}]}
          onPress={this.getSelectedItemIDAndToggleFilter}>
            <Image source={this.props.item.image} style={styles.itemImage} />
        </TouchableOpacity>
        <Text style={styles.itemName}>{this.props.item.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 60,
    width: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },

  itemImage: {
    height: 28,
    width: 28,
    resizeMode: 'cover'
  },

  itemName: {
    color: 'rgb(255,251,245)',
    fontSize: 11,
    textAlign: 'center',
    paddingTop: 8
  }
});
