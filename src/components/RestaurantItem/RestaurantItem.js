import React, { Component } from 'react';

import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/dist/Feather';

import LinearGradient from 'react-native-linear-gradient';

import Swiper from 'react-native-swiper';

import styles from './styles';

import RatingBar from '../RatingBar';

export default class RestaurantItem extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    if(this.props.showText) {
      return (
        <View style={styles.item}>
          <View style={styles.leftSideContainer}>
            <Text style={styles.itemTitle}>
              {this.props.item.name} - ${this.props.item.price}
            </Text>
            <Text style={styles.itemIngradients}>{this.props.item.ingradients}</Text>
          </View>
          <View style={styles.rightSideContainer}>
            {this.props.item.quantity === 0 ? (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  this.props.changeQuantity(this.props.item.id, 'add')
                }
              >
                <Icon name="plus" size={22} color="white" />
              </TouchableOpacity>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() =>
                    this.props.changeQuantity(this.props.item.id, 'remove')
                  }
                >
                  <Icon name="minus" size={22} color="green" />
                </TouchableOpacity>

                <Text style={[styles.itemTitle, { top: -3 }]}>
                  {this.props.item.quantity}
                </Text>

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() =>
                    this.props.changeQuantity(this.props.item.id, 'add')
                  }
                >
                  <Icon name="plus" size={22} color="green" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )
    }
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitleInPhotoMode}>{ this.props.item.name }</Text>

        <Swiper
          style={styles.swiper}
          loadMinimal
          loop={false}
          showsPagination={false}>
          {this.props.item.images.map((image, index) => (
            <ImageBackground
              key={index}
              source={image.imagePath}
              style={styles.itemImage}
            >
              <LinearGradient
                colors={['transparent', '#1E1E1E']}
                locations={[0,0.95]}
                style={styles.itemImageLinearGradient}
              />
            </ImageBackground>
          ))}
        </Swiper>

        <View style={styles.bottomContentHolder}>
          <View style={styles.controlButtons}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                this.props.changeQuantity(this.props.item.id, 'remove')
              }
            >
              <Icon name="minus" size={16} color="white" />
            </TouchableOpacity>

            <Text style={styles.quantityTextStyleInPhotoMode}>
              {this.props.item.quantity}
            </Text>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                this.props.changeQuantity(this.props.item.id, 'add')
              }
            >
              <Icon name="plus" size={16} color="white" />
            </TouchableOpacity>
          </View>

          <View>
            <RatingBar />
          </View>
        </View>
      </View>
    );
  }
}

RestaurantItem.propTypes = {
  item: PropTypes.object.isRequired,
  changeQuantity: PropTypes.func.isRequired,
  showText: PropTypes.bool.isRequired
};
