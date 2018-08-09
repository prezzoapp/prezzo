import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import PropTypes from 'prop-types';

import styles from './styles';

export default class ExploreListItem extends Component {
  componentDidMount() {
    console.log(this.props.item);
  }

  render() {
    return (
      <View style={{ marginBottom: 16 }}>
        <ImageBackground
          source={this.props.item.imagePath}
          style={styles.image}
          imageStyle={{ borderRadius: 5 }} />

        <Text style={styles.restaurantName}>{this.props.item.name}</Text>
        <Text style={styles.cityName}>{this.props.item.city}</Text>
      </View>
    );
  }
}

ExploreListItem.propTypes = {
  item: PropTypes.object.isRequired
};
