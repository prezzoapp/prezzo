import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions } from 'react-native';

import Carousel from 'react-native-snap-carousel';

import PropTypes from 'prop-types';

import styles from './styles';

export default class ExploreSectionListItem extends Component {
  componentDidMount() {
    console.log(this.props.item);
  }

  render() {
    return (
      <Carousel
        layout="default"
        data={this.props.item}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width - 50}
        renderItem={({ item }) =>
          <View>
            <ImageBackground source={item.imagePath} style={ {width: '100%', height: 150 }} imageStyle={{borderRadius: 5}} />

            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.cityName}>{item.city}</Text>
          </View>
        }
    />
    );
  }
}
