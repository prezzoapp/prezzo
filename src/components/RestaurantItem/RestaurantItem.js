import React from 'react';

import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

import PropTypes from 'prop-types';

import { LinearGradient } from 'expo';

import Swiper from 'react-native-swiper';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import styles from './styles';

import { Feather } from '@expo/vector-icons'

import RatingBar from '../RatingBar';

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

        <Swiper
          style={styles.swiper}
          loadMinimal
          loop={false}
          showsPagination
          paginationStyle={styles.pagination}
          activeDotColor='#0DD24A'
          dotColor='#808080'
        >
          {this.props.item.imageURLs.length !== 0 && this.props.item.imageURLs.map(image => (
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
            {this.props.item.quantity === 0 ? (
              <Button
                style={itemOrderBtnStyles.commonBtn}
                textStyle={itemOrderBtnStyles.commonBtnText}
                onPress={() =>
                  this.props.addRemoveItemQuantity(
                    this.props.item._id,
                    'add'
                  )
                }
              >
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
};

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

export default RestaurantItem;
