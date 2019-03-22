import React, { Component } from 'react';

import { View, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import CacheImage from '../CacheImage';

const MAX_RATING = 5;

export default class RatingBar extends Component {
  constructor(props) {
    super(props);

    this.state = { itemRating: props.itemRating };
  }

  changeRating(rating) {
    this.setState(() => {
      return {
        itemRating: rating
      }
    });
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
          <CacheImage
            style={styles.starImage}
            type='image'
            source={
              i <= this.state.itemRating
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
  disable: PropTypes.bool
};

RatingBar.defaultProps = {
  disable: false
};
