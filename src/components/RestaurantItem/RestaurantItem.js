import React, { Component } from 'react';

import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

import PropTypes from 'prop-types';

// import Icon from 'react-native-vector-icons/dist/Feather';

import { LinearGradient } from 'expo';

import Swiper from 'react-native-swiper';

import styles from './styles';

import RatingBar from '../RatingBar';

export default class RestaurantItem extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 1 };

    this.changeQuantity = this.changeQuantity.bind(this);
  }

  changeQuantity(op) {
    if(op === 'add') {
      this.setState(() => {
        return {
          quantity: this.state.quantity + 1
        }
      });
    } else if(this.state.quantity > 0) {
      this.setState(() => {
        return {
          quantity: this.state.quantity - 1
        };
      });
    }
  }

  render() {
    if(this.props.showText) {
      return (
        <View style={styles.item}>
          <View style={styles.leftSideContainer}>
            <Text style={styles.itemTitle}>
              {this.props.item.title} - ${this.props.item.price}
            </Text>
            <Text style={styles.itemIngradients}>{this.props.item.description}</Text>
          </View>
          <View style={styles.rightSideContainer}>
            {this.state.quantity === 0 ? (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.changeQuantity('add')}
              >
                {/* <Icon name="plus" size={22} color="white" /> */}
              </TouchableOpacity>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => this.changeQuantity('remove')}
                >
                  {/* <Icon name="minus" size={22} color="green" /> */}
                </TouchableOpacity>

                <Text style={[styles.itemTitle, { top: -3 }]}>
                  {this.state.quantity}
                </Text>

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => this.changeQuantity('add')}
                >
                  {/* <Icon name="plus" size={22} color="green" /> */}
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )
    }
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitleInPhotoMode}>
          {this.props.item.title} - ${this.props.item.price}
        </Text>

        <Swiper
          style={styles.swiper}
          loadMinimal
          loop={false}
          showsPagination={false}>
          {this.props.item.imageURLs && this.props.item.imageURLs.map(image => (
            <ImageBackground
              key={image}
              source={{ uri: image }}
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
              onPress={() => this.changeQuantity('remove')}
            >
              {/* <Icon name="minus" size={16} color="white" /> */}
            </TouchableOpacity>

            <Text style={styles.quantityTextStyleInPhotoMode}>
              {this.state.quantity}
            </Text>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.changeQuantity('add')}
            >
              {/* <Icon name="plus" size={16} color="white" /> */}
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
