import React, { Component } from 'react';

import { View, TouchableOpacity, Image } from 'react-native';

import styles from './styles';

const MAX_RATING = 5;

export default class RatingBar extends Component {
  constructor() {
    super();

    this.state = { givenRating: 2 }

    this.changeRating = this.changeRating.bind(this);
  }

  changeRating(key) {
    this.setState(() => {
      return {
        givenRating: key
      }
    });
  }

  render() {
    const ratingBar = [];

    for(let i = 1; i <= MAX_RATING; i++) {
      ratingBar.push(
        <TouchableOpacity
          activeOpacity={0.8}
          key={i}
          style={styles.btn}
          onPress={() => this.changeRating(i)}>
        >
          <Image
            style={styles.starImage}
            source={
              i <= this.state.givenRating
                ? require('../../../assets/images/star_fill.png')
                : require('../../../assets/images/star_border.png')
            }
          />
        </TouchableOpacity>
      );
    }

    return <View style={styles.ratingBarContainer}>{ratingBar}</View>;
  }
}
