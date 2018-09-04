import React, { Component } from 'react';

import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/dist/Feather';

import LinearGradient from 'react-native-linear-gradient';

import Swiper from 'react-native-swiper';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import styles from './styles';

import RatingBar from '../RatingBar';

import Button from '../Button';

import { FONT_FAMILY, COLOR_WHITE } from '../../services/constants';

export default class RestaurantItem extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 1 };
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
            {this.props.item.quantity === 0 ? (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.props.addRemoveItemQuantity(this.props.item._id, 'add')}
              >
                <Icon name="plus" size={22} color="white" />
              </TouchableOpacity>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => this.props.addRemoveItemQuantity(this.props.item._id, 'remove')}
                >
                  <Icon name="minus" size={22} color="green" />
                </TouchableOpacity>

                <Text style={[styles.itemTitle, { top: -3 }]}>
                  {this.props.item.quantity}
                </Text>

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => this.props.addRemoveItemQuantity(this.props.item._id, 'add')}
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
                locations={[0, 0.95]}
                style={styles.itemImageLinearGradient}
              />
            </ImageBackground>
          ))}
        </Swiper>

        <View style={styles.bottomContentHolder}>
          <View>
          {(this.props.item.quantity === 0) ? (
            <Button
              style={itemOrderBtnStyles.commonBtn}
              textStyle={itemOrderBtnStyles.commonBtnText}
              onPress={() => this.props.addRemoveItemQuantity(this.props.item._id, 'add')}
            >
              Order
            </Button>
          ) : (
            <View style={styles.controlButtons}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.props.addRemoveItemQuantity(this.props.item._id, 'remove')}
              >
                <Icon name="minus" size={16} color="white" />
              </TouchableOpacity>

              <Text style={styles.quantityTextStyleInPhotoMode}>
                {this.props.item.quantity}
              </Text>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.props.addRemoveItemQuantity(this.props.item._id, 'add')}
              >
                <Icon name="plus" size={16} color="white" />
              </TouchableOpacity>
            </View>
          )}
          </View>

          <View>
            <RatingBar
              itemRating={this.props.item.rating}
              changeItemRating={rating => this.props.changeItemRating(this.props.item._id, rating)}
            />
          </View>
        </View>
      </View>
    );
  }
}

const itemOrderBtnStyles = {
  commonBtn: {
    backgroundColor: 'transparent',
    borderColor: '#0DD24A',
    borderWidth: 2,
    width: wp('19.2%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 0,
    height: hp('4.55%')
  },
  commonBtnText: {
    fontSize: wp('3.73%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
};

RestaurantItem.propTypes = {
  item: PropTypes.object.isRequired,
  showText: PropTypes.bool.isRequired
};
