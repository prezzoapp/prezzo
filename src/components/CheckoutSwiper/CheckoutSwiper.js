import React, { Component } from 'react';
import { View, Text, SectionList, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/dist/Feather';

import PropTypes from 'prop-types';

import ProfileTextInput from '../ProfileTextInput';

import Button from '../Button';

import { FONT_FAMILY, COLOR_WHITE } from '../../services/constants';

import styles from './styles';

export default class CheckoutSwiper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardNumber: '1234345345533345'
    };

    this.index = 0;
  }

  onIndexChanged(index, props) {
    this.index = index;
    props.onScrollingEnd(index);
    this.props.setCurrentIndex(index);
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
    if(this.index > 0) {
      this.swiper.scrollBy(this.index * -1, false);
    }
  }

  renderItem(item, section) {
    if(item.quantity > 0) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemName}>{item.title}</Text>
          <View style={styles.actionBtnsHolder}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.quantityBtn}
              onPress={() =>
                this.props.addRemoveItemQuantity(
                  section._id,
                  item._id,
                  'remove'
                )
              }
            >
              <Icon name="minus" size={wp('4.9%')} color="#2ED573" />
            </TouchableOpacity>

            <Text style={styles.quantity}>{item.quantity}</Text>

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.quantityBtn}
              onPress={() =>
                this.props.addRemoveItemQuantity(section._id, item._id, 'add')
              }
            >
              <Icon name="plus" size={wp('4.9%')} color="#2ED573" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {(() => {
          if(this.index > 0) {
            return (
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => this.swiper.scrollBy(-1, false)}
              >
                <Icon name="chevron-left" size={wp('8%')} color="white" />
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
          index={0}
        >
          <View style={styles.slide}>
            <View>
              <View style={styles.orderDetails}>
                <Text style={styles.restaurantName}>
                  {this.props.restaurantName}
                </Text>

                <Text style={styles.reviewOrderText}>Review Order</Text>
                {(() => {
                  if(this.props.data.data.menu) {
                    return (
                      <SectionList
                        sections={this.props.data.data.menu.categories}
                        showsVerticalScrollIndicator={false}
                        style={styles.flatList}
                        keyExtractor={item => item._id}
                        renderItem={({ item, section }) =>
                          this.renderItem(item, section)
                        }
                      />
                    );
                  }
                })()}
              </View>

              <View style={styles.reviewOrderFooter}>
                <View style={styles.reviewOrderFooterContainer}>
                  <Text style={styles.reviewOrderFooterText}>SUBTOTAL</Text>
                  <Text
                    style={[
                      styles.reviewOrderFooterText,
                      { textAlign: 'right' }
                    ]}
                  >
                    ${this.props.data.totalPrice}
                  </Text>
                </View>

                <View style={styles.reviewOrderFooterContainer}>
                  <Text style={styles.reviewOrderFooterText}>TAX</Text>
                  <Text
                    style={[
                      styles.reviewOrderFooterText,
                      { textAlign: 'right' }
                    ]}
                  >
                    + $2.43
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.slide}>
            <View>
              <View style={styles.orderDetails}>
                <Text style={styles.restaurantName}>WHERE TO?</Text>
              </View>

              <View style={styles.whereToScreenContainer}>
                <View style={styles.whereToScreenBtnsHolder}>
                  <Button
                    style={dineInDileveryBtnStyles.commonBtn}
                    textStyle={dineInDileveryBtnStyles.commonBtnText}
                    onPress={() => alert()}
                  >
                    Dine In
                  </Button>

                  <Button
                    style={dineInDileveryBtnStyles.commonBtn}
                    textStyle={dineInDileveryBtnStyles.commonBtnText}
                    onPress={() => alert()}
                  >
                    Delivery
                  </Button>
                </View>
                <Text style={styles.whereToScreenText}>
                  Please show this code to your server, or give it to your
                  friend to join a table.
                </Text>
                <Text style={styles.tableCode}>9192</Text>
              </View>
            </View>
          </View>

          <View style={styles.slide}>
            <View>
              <View style={styles.orderDetails}>
                <Text style={styles.restaurantName}>PAYMENT METHOD</Text>
              </View>

              <View style={styles.paymentScreenContainer}>
                <View style={styles.paymentScreenBtnsContainer}>
                  <View style={styles.paymentBtnHolder}>
                    <Button
                      style={paymentBtnStyles.commonBtn}
                      onPress={() => alert()}
                    >
                      <View>
                        <Image
                          source={require('../../../assets/images/etc/visa_icon.png')}
                          style={styles.paymentIcons}
                        />
                      </View>
                    </Button>
                    <View style={styles.checkMarkIconHolder}>
                      <Icon name="check" size={wp('4%')} color="white" />
                    </View>
                  </View>

                  <View style={styles.paymentBtnHolder}>
                    <Button
                      style={paymentBtnStyles.commonBtn}
                      onPress={() => alert()}
                    >
                      <View>
                        <Image
                          source={require('../../../assets/images/etc/cash_icon.png')}
                          style={styles.paymentIcons}
                        />
                      </View>
                    </Button>
                    <View style={styles.checkMarkIconHolder}>
                      <Icon name="check" size={wp('4%')} color="white" />
                    </View>
                  </View>
                </View>
                <View style={styles.paymentInfoContainer}>
                  <Text style={styles.paymentInfoTitle}>PAYMENT DETAILS</Text>
                  <ProfileTextInput
                    label="Card Number"
                    style={{ marginTop: wp('4%') }}
                    onChange={val => this.setState({ cardNumber: val })}
                    placeholder=""
                    showInputBottomBorder={false}
                    type="cardNumber"
                    keyboardType="numeric"
                    value={this.state.cardNumber}
                  />

                  <View style={{ flexDirection: 'row' }}>
                    <ProfileTextInput
                      label="Exp Date"
                      style={{ marginTop: wp('3%'), width: '70%' }}
                      onChange={val => this.setState({ cardNumber: val })}
                      placeholder=""
                      showInputBottomBorder={false}
                      type="expDate"
                      value="09/18"
                    />

                    <ProfileTextInput
                      label="CVV"
                      style={{ marginTop: wp('3%'), width: '30%' }}
                      onChange={val => this.setState({ cardNumber: val })}
                      placeholder=""
                      showInputBottomBorder={false}
                      type="cvv"
                      keyboardType="numeric"
                      value="344"
                    />
                  </View>

                  <ProfileTextInput
                    label="Card Holder"
                    style={{ marginTop: wp('4%'), marginBottom: wp('4%') }}
                    onChange={val => this.setState({ cardNumber: val })}
                    placeholder=""
                    showInputBottomBorder={false}
                    type="cardHolder"
                    value={this.state.cardNumber}
                  />

                  <View style={{ alignItems: 'center' }}>
                    <Button
                      style={dineInDileveryBtnStyles.commonBtn}
                      textStyle={dineInDileveryBtnStyles.commonBtnText}
                      onPress={() => alert()}
                    >
                      Split
                    </Button>
                  </View>
                </View>
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
    borderColor: '#0DD24A',
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
    paddingHorizontal: wp('3.46%')
  }
};

CheckoutSwiper.propTypes = {
  setCurrentIndex: PropTypes.func.isRequired,
  addRemoveItemQuantity: PropTypes.func.isRequired,
  restaurantName: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
};
