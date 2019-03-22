import React from 'react';

import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

import PropTypes from 'prop-types';

import { LinearGradient } from 'expo';

import Swiper from 'react-native-swiper';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import styles from './styles';

import { Feather } from '../VectorIcons';

import RatingBar from '../RatingBar';

import Button from '../Button';

import {
  COLOR_WHITE,
  SF_PRO_TEXT_REGULAR,
  FONT_FAMILY_MEDIUM
} from '../../services/constants';

const RestaurantItem = props => {
  if(props.showText) {
    return (
      <View style={styles.item}>
        <View style={styles.leftSideContainer}>
          <Text style={styles.itemTitle}>
            <Text numberOfLines={2}>{props.item.title}</Text>
            <Text> - ${props.item.price}</Text>
          </Text>
          <Text style={styles.itemIngradients} numberOfLines={3}>
            {props.item.description}
          </Text>
        </View>
        <View style={styles.rightSideContainer}>
          {(() => {
            if(props.item.quantity === 0) {
              return (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() =>
                    props.addRemoveItemQuantity(props.item._id, 'add')
                  }
                >
                  <Feather name="plus" size={22} color="white" />
                </TouchableOpacity>
              );
            }
            return (
              <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() =>
                    props.addRemoveItemQuantity(props.item._id, 'remove')
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
                  {props.item.quantity}
                </Text>

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() =>
                    props.addRemoveItemQuantity(props.item._id, 'add')
                  }
                >
                  <Feather name="plus" size={22} color="green" />
                </TouchableOpacity>
              </View>
            );
          })()}
        </View>
      </View>
    )
  }
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitleInPhotoMode}>
        {props.item.title} - ${props.item.price}
      </Text>

      <Swiper
        style={styles.swiper}
        loadMinimal
        loop={false}
        showsPagination={false}>
        {props.item.imageURLs && props.item.imageURLs.map(image => (
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
          {(() => {
            if(props.item.quantity === 0) {
              return (
                <Button
                  style={itemOrderBtnStyles.commonBtn}
                  textStyle={itemOrderBtnStyles.commonBtnText}
                  onPress={() =>
                    props.addRemoveItemQuantity(props.item._id, 'add')
                  }
                >
                  Order
                </Button>
              );
            }
            return (
              <View style={styles.controlButtons}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() =>
                    props.addRemoveItemQuantity(props.item._id, 'remove')
                  }
                >
                  <Feather name="minus" size={16} color="white" />
                </TouchableOpacity>

                <Text style={styles.quantityTextStyleInPhotoMode}>
                  {props.item.quantity}
                </Text>

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() =>
                    props.addRemoveItemQuantity(props.item._id, 'add')
                  }
                >
                  <Feather name="plus" size={16} color="white" />
                </TouchableOpacity>
              </View>
            );
          })()}
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
