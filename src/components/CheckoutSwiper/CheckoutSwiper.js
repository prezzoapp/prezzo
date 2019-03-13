import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { Icon as NativeBaseIcon, Picker } from 'native-base';

import PropTypes from 'prop-types';

import { Feather } from '../VectorIcons';

import Button from '../Button';

import { FONT_FAMILY, COLOR_WHITE } from '../../services/constants';

import styles, { stylesRaw } from './styles';

import showGenericAlert from '../GenericAlert';

const CREDIT_CARD = 'credit_card';
const CASH = 'cash';

export default class CheckoutSwiper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPaymentType: '',
      selectedPaymentMethod: ''
    };

    this.index = 0;

    this.cartItems = [];
  }

  onIndexChanged(index, props) {
    this.index = index;
    props.onScrollingEnd(index);
    this.props.setCurrentIndex(index);
  }

  setPlaceOrderType(type) {
    if (type === 'delivery') {
      showGenericAlert(null, "This feature isn't available yet.");
    }
    if (this.props.type !== type) {
      this.props.setType(type);
    }
  }

  setPaymentType(paymentType) {
    if (this.state.setPaymentType !== paymentType) {
      this.setState(
        () => ({
          selectedPaymentType: paymentType
        }),
        () => {
          if (this.state.selectedPaymentType === CREDIT_CARD) {
            this.selectPaymentMethod('');
          } else if (this.state.selectedPaymentType === CASH) {
            this.selectPaymentMethod('cash');
          } else {
            this.selectPaymentMethod('');
          }
        }
      );
    }
  }

  selectPaymentMethodAfterCardTokenizing(id) {
    let defaultPaymentId = null;
    for (let i = 0; i < this.props.creditCardList.length; i++) {
      if(this.props.creditCardList[i].isDefault) {
        defaultPaymentId = this.props.creditCardList[i]._id;
        break;
      }
    }

    if(defaultPaymentId !== null) {
      this.selectPaymentMethod(defaultPaymentId);
    } else {
      this.selectPaymentMethod(id);
    }
  }

  selectPaymentMethod(val) {
    this.setState(
      () => ({
        selectedPaymentMethod: val
      }),
      () => {
        if (this.state.selectedPaymentMethod === 'add_new_card') {
          this.props.navigate({
            routeName: 'CheckoutPaymentDetails',
            params: {
              title: 'Add New Card',
              selectPaymentMethodAfterCardTokenizing: this.selectPaymentMethodAfterCardTokenizing.bind(
                this
              )
            }
          });
        }

        this.props.isSelectedPaymentMethod(this.state.selectedPaymentMethod);
      }
    );
  }

  moveToIndex(index = null) {
    if (index !== null || index !== undefined || typeof index !== 'string') {
      this.swiper.scrollBy(index - this.index, false);
    }
  }

  scrollForward() {
    this.swiper.scrollBy(1, false);
  }

  scrollReset() {
    if (this.index > 0) {
      this.swiper.scrollBy(this.index * -1, false);
    }
    this.setPaymentType('');
  }

  removeItemFromCart(item) {
    this.props
      .addRemoveItemQuantity(item.sectionId, item._id, 'remove')
      .then(() => {
        const isAllZero = !this.cartItems.some(el => el.quantity !== 0);
        if (isAllZero) {
          this.props.hideModal();
        }
      });
  }

  renderItem(item) {
    if (item.quantity > 0) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemName} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.actionBtnsHolder}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.quantityBtn}
              onPress={() => this.removeItemFromCart(item)}
            >
              <Feather name="minus" size={wp('4.9%')} color="#2ED573" />
            </TouchableOpacity>

            <Text style={styles.quantity}>{item.quantity}</Text>

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.quantityBtn}
              onPress={() =>
                this.props.addRemoveItemQuantity(
                  item.sectionId,
                  item._id,
                  'add'
                )
              }
            >
              <Feather name="plus" size={wp('4.9%')} color="#2ED573" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  }

  render() {
    this.cartItems =
      this.props.data.data.menu &&
      this.props.data.data.menu.categories
        .map(category =>
          category.data.map(d => ({ ...d, sectionId: category._id }))
        )
        .reduce((a, v) => [...a, ...v], []);

    return (
      <View style={styles.container}>
        {(() => {
          if (this.index > 0) {
            return (
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => this.swiper.scrollBy(-1, false)}
              >
                <Feather name="chevron-left" size={wp('8%')} color="white" />
              </TouchableOpacity>
            );
          }
        })()}

        <Swiper
          showsPagination={false}
          ref={swiper => {
            this.swiper = swiper;
          }}
          onIndexChanged={index => this.onIndexChanged(index, this.props)}
          loop={false}
          scrollEnabled={false}
          index={0}
        >
          <View style={styles.slide}>
            <View style={styles.orderDetails}>
              <Text style={styles.restaurantName}>
                {this.props.restaurantName}
              </Text>

              <Text style={styles.reviewOrderText}>Review Order</Text>
              {(() => {
                if (this.props.data.data.menu) {
                  return (
                    <FlatList
                      data={this.cartItems}
                      showsVerticalScrollIndicator={false}
                      style={styles.flatList}
                      contentContainerStyle={{ flexGrow: 1 }}
                      keyExtractor={item => item._id}
                      renderItem={({ item }) => this.renderItem(item)}
                    />
                  );
                }
              })()}
            </View>

            <View style={styles.reviewOrderFooter}>
              <View
                style={[styles.reviewOrderFooterContainer, { paddingTop: 0 }]}
              >
                <Text style={styles.reviewOrderFooterText}>SUBTOTAL</Text>
                <Text
                  style={[styles.reviewOrderFooterText, { textAlign: 'right' }]}
                >
                  ${this.props.data.totalPrice}
                </Text>
              </View>

              <View style={styles.reviewOrderFooterContainer}>
                <Text style={styles.reviewOrderFooterText}>TAX</Text>
                <Text
                  style={[styles.reviewOrderFooterText, { textAlign: 'right' }]}
                >
                  + $2.43
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.slide}>
            <View style={styles.orderDetails}>
              <Text style={styles.restaurantName}>PAYMENT METHOD</Text>
              <View style={styles.paymentScreenContainer}>
                <View style={styles.paymentScreenBtnsContainer}>
                  <View style={styles.paymentBtnHolder}>
                    <Button
                      style={paymentBtnStyles.commonBtn}
                      onPress={() => this.setPaymentType(CREDIT_CARD)}
                      disabled={this.state.selectedPaymentType === CREDIT_CARD}
                    >
                      <View>
                        <Image
                          source={require('../../../assets/images/etc/visa_icon.png')}
                          style={styles.paymentIcons}
                        />
                      </View>
                    </Button>
                    {(() => {
                      if (this.state.selectedPaymentType === CREDIT_CARD) {
                        return (
                          <View style={styles.checkMarkIconHolder}>
                            <Feather
                              name="check"
                              size={wp('4%')}
                              color="white"
                            />
                          </View>
                        );
                      }
                    })()}
                  </View>

                  <View style={styles.paymentBtnHolder}>
                    <Button
                      style={paymentBtnStyles.commonBtn}
                      onPress={() => this.setPaymentType(CASH)}
                      disabled={this.state.selectedPaymentType === CASH}
                    >
                      <View>
                        <Image
                          source={require('../../../assets/images/etc/cash_icon.png')}
                          style={styles.paymentIcons}
                        />
                      </View>
                    </Button>
                    {(() => {
                      if (this.state.selectedPaymentType === CASH) {
                        return (
                          <View style={styles.checkMarkIconHolder}>
                            <Feather
                              name="check"
                              size={wp('4%')}
                              color="white"
                            />
                          </View>
                        );
                      }
                    })()}
                  </View>
                </View>
                {(() => {
                  if (this.state.selectedPaymentType === CREDIT_CARD) {
                    return (
                      <View style={styles.paymentInfoContainer}>
                        <Text style={styles.paymentInfoTitle}>
                          PAYMENT DETAILS
                        </Text>
                        <Picker
                          mode="dropdown"
                          iosIcon={
                            <NativeBaseIcon
                              name="ios-arrow-down-outline"
                              style={stylesRaw.pickerIcon}
                            />
                          }
                          selectedValue={this.state.selectedPaymentMethod}
                          onValueChange={val => this.selectPaymentMethod(val)}
                          style={styles.cardPicker}
                          textStyle={styles.cardPickerText}
                        >
                          <Picker.Item
                            label="Select a payment method"
                            value=""
                          />

                          {this.props.creditCardList.map((item, index) => (
                            <Picker.Item
                              label={`${item.type
                                .slice(10)
                                .charAt(0)
                                .toUpperCase() + item.type.slice(11)} - ${
                                item.readableIdentifier
                              }`}
                              value={item._id}
                              key={index}
                            />
                          ))}

                          <Picker.Item
                            label="Add new card"
                            value="add_new_card"
                          />
                        </Picker>
                      </View>
                    );
                  }
                })()}
              </View>
            </View>
          </View>
        </Swiper>
      </View>
    );
  }
}

const dineInDileveryBtnStyles = {
  commonBtn: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    width: wp('33%'),
    justifyContent: 'center',
    borderRadius: 8,
    padding: 0,
    paddingVertical: hp('1.23%'),
    paddingHorizontal: 8,
    marginHorizontal: wp('4%')
  },
  commonBtnText: {
    fontSize: wp('4.8%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
};

const paymentBtnStyles = {
  commonBtn: {
    backgroundColor: 'white',
    borderColor: 'transparent',
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: wp('3.46%'),
    height: hp('6.15%')
  }
};

CheckoutSwiper.propTypes = {
  setCurrentIndex: PropTypes.func.isRequired,
  addRemoveItemQuantity: PropTypes.func.isRequired,
  restaurantName: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  creditCardList: PropTypes.array
};
