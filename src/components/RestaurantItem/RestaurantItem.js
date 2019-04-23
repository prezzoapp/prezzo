import React, { Component } from 'react';

import { View, Text, TouchableOpacity, ImageBackground, Platform } from 'react-native';

import PropTypes from 'prop-types';

import Swiper from 'react-native-swiper';

import Carousel, { getInputRangeFromIndexes } from 'react-native-snap-carousel';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styles from './styles';

import { Feather } from '../VectorIcons';

import RatingBar from '../RatingBar';

import RestaurantItemImages from './RestaurantItemImages';

import Button from '../Button';

import {
  COLOR_WHITE,
  SF_PRO_TEXT_REGULAR,
  FONT_FAMILY_MEDIUM
} from '../../services/constants';

export default class RestaurantItem extends Component {
  shouldComponentUpdate(nextProps) {
    if(
      nextProps.item.quantity !== this.props.item.quantity ||
      nextProps.showText !== this.props.showText
    ) return true;
    return false;
  }

  renderItem = data => <RestaurantItemImages item={data.item} />;

  // CUSTOM STACK INTERPOLATION
  stackScrollInterpolator (index, carouselProps) {
      const range = [3, 2, 1, 0, -1];
      const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
      const outputRange = range;

      return { inputRange, outputRange };
  }
  // CUSTOM STACK ANIMATED STYLES
  stackAnimatedStyles (index, animatedValue, carouselProps, cardOffset) {
      const sizeRef = carouselProps.vertical ? carouselProps.itemHeight : carouselProps.itemWidth;
      const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';

      const card1Scale = 0.9;
      const card2Scale = 0.8;

      cardOffset = !cardOffset && cardOffset !== 0 ? 18 : cardOffset;

      const getTranslateFromScale = (cardIndex, scale) => {
          const centerFactor = 1 / scale * cardIndex;
          const centeredPosition = -Math.round(sizeRef * centerFactor);
          const edgeAlignment = Math.round((sizeRef - (sizeRef * scale)) / 2);
          const offset = Math.round(cardOffset * Math.abs(cardIndex) / scale);
          return centeredPosition + edgeAlignment + offset;
      };

      return {
          ...Platform.select({
           ios: {
             zIndex: carouselProps.data.length - index
           }, android: {
             elevation: carouselProps.data.length - index
           }
          }),
          opacity: animatedValue.interpolate({
              inputRange: [0, 1, 2, 3],
              outputRange: [1, 0.75, 0.5, 0],
              extrapolate: 'clamp'
          }),
          transform: [{
              scale: animatedValue.interpolate({
                  inputRange: [-1, 0, 1, 2],
                  outputRange: [card1Scale, 1, card1Scale, card2Scale],
                  extrapolate: 'clamp'
              })
          }, {
              [translateProp]: animatedValue.interpolate({
                  inputRange: [-1, 0, 1, 2, 3],
                  outputRange: [
                      -sizeRef * 0.5,
                      0,
                      getTranslateFromScale(1, card1Scale),
                      getTranslateFromScale(2, card2Scale),
                      getTranslateFromScale(3, card2Scale)
                  ],
                  extrapolate: 'clamp'
              })
          }]
      };
  }

  render() {
    console.log('Restaurant Item render called!');
    if(this.props.showText) {
      return (
        <View style={styles.item}>
          <View style={styles.leftSideContainer}>
            <Text style={styles.itemTitle}>
              <Text numberOfLines={2}>{this.props.item.title}</Text>
              <Text> - ${this.props.item.price}</Text>
            </Text>
            <Text style={styles.itemIngradients} numberOfLines={3}>
              {this.props.item.description}
            </Text>
          </View>
          <View style={styles.rightSideContainer}>
          {this.props.item.quantity === 0 ? (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                this.props.addRemoveItemQuantity(
                  this.props.item._id,
                  'add'
                )
              }
            >
              <Feather name="plus" size={22} color="white" />
            </TouchableOpacity>
          ) : (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  this.props.addRemoveItemQuantity(
                    this.props.item._id,
                    'remove'
                  )
                }
              >
                <Feather name="minus" size={22} color="green" />
              </TouchableOpacity>

              <Text
                style={[
                  styles.itemTitle,
                  { fontFamily: SF_PRO_TEXT_REGULAR }
                ]}
              >
                {this.props.item.quantity}
              </Text>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  this.props.addRemoveItemQuantity(
                    this.props.item._id,
                    'add'
                  )
                }
              >
                <Feather name="plus" size={22} color="green" />
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

        <Carousel
          layout='stack'
          layoutCardOffset={18}
          data={this.props.item.imageURLs}
          renderItem={this.renderItem}
          sliderHeight={hp('44.55%')}
          sliderWidth={wp('98%')}
          itemHeight={hp('44.55%')}
          itemWidth={wp('84%')}
          scrollInterpolator={this.stackScrollInterpolator}
          slideInterpolatedStyle={this.stackAnimatedStyles}
          containerCustomStyle={{ left: -wp('7%') }}
        />

        <View style={styles.bottomContentHolder}>
          <View>
          {this.props.item.quantity === 0 ? (
            <Button
              style={itemOrderBtnStyles.commonBtn}
              textStyle={itemOrderBtnStyles.commonBtnText}
              onPress={() =>
                this.props.addRemoveItemQuantity(
                  this.props.item._id,
                  'add'
                )
              }>
              Order
            </Button>
          ) : (
            <View style={styles.controlButtons}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  this.props.addRemoveItemQuantity(
                    this.props.item._id,
                    'remove'
                  )
                }
              >
                <Feather name="minus" size={16} color="white" />
              </TouchableOpacity>

              <Text style={styles.quantityTextStyleInPhotoMode}>
                {this.props.item.quantity}
              </Text>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  this.props.addRemoveItemQuantity(
                    this.props.item._id,
                    'add'
                  )
                }
              >
                <Feather name="plus" size={16} color="white" />
              </TouchableOpacity>
            </View>
          )}
          </View>
          <View>
            <RatingBar disable itemRating={3} />
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
    height: wp('9.86%')
  },
  commonBtnText: {
    fontSize: wp('3.73%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: COLOR_WHITE,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
};

RestaurantItem.propTypes = {
  item: PropTypes.object.isRequired,
  showText: PropTypes.bool.isRequired,
  addRemoveItemQuantity: PropTypes.func.isRequired
};
