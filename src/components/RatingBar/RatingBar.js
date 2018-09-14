import React, { Component } from 'react';

import { View, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const MAX_RATING = 5;

export default class RatingBar extends Component {
  constructor() {
    super();

    this.changeRating = this.changeRating.bind(this);
  }

  changeRating(rating) {
    this.props.changeItemRating(rating);
  }

  render() {
    const ratingBar = [];

    for (let i = 1; i <= MAX_RATING; i++) {
      ratingBar.push(
        <TouchableOpacity
          disabled={this.props.disable}
          activeOpacity={0.8}
          key={i}
          style={styles.btn}
          onPress={() => this.changeRating(i)}
        >
          <Image
            style={styles.starImage}
            source={
              i <= this.props.itemRating
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

RatingBar.propTypes = {
  itemRating: PropTypes.number.isRequired,
  changeItemRating: PropTypes.func,
  disable: PropTypes.bool
};

RatingBar.defaultProps = {
  changeItemRating: null,
  disable: false
};
