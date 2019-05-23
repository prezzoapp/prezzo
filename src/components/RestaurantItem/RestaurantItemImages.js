import React, { Component } from 'react';
import { LinearGradient } from 'expo';
import PropTypes from 'prop-types';
import styles from './styles';
import CacheImage from '../CacheImage';

class RestaurantItemImages extends Component {
  shouldComponentUpdate(nextProps) {
    if(nextProps.item !== this.props.item) return true;
    return false;
  }

  render() {
    const image = this.props.item;
    return (
      <CacheImage
          source={image}
          type='backgroundImage'
          style={styles.itemImage}
          imageStyle={styles.imageStyle}
        >
          <LinearGradient
            colors={['transparent', '#1E1E1E']}
            locations={[0, 0.95]}
            style={styles.itemImageLinearGradient}
          />
      </CacheImage>
    );
  }
}

RestaurantItemImages.propTypes = {
  item: PropTypes.string.isRequired
};

export default RestaurantItemImages;
