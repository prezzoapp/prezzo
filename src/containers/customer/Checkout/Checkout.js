import React, { Component } from 'react';
import {
  Animated,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';

const height = Dimensions.get('window').height;

import Swiper from 'react-native-swiper';

import { BlurView } from 'react-native-blur';

import Icon from 'react-native-vector-icons/dist/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import ProfileTextInput from '../../../components/ProfileTextInput';

import Button from '../../../components/Button';

import { FONT_FAMILY, COLOR_WHITE } from '../../../services/constants';

import styles from './styles';

export default class Checkout extends Component {
  constructor() {
    super();

    this.state = {data: [{
      id: 1,
      name: 'Cucumber Salad',
      quantity: 1
    },{
      id: 2,
      name: 'Sushi Sampler',
      quantity: 1
    },{
      id: 3,
      name: 'Original Poke',
      quantity: 1
    },{
      id: 4,
      name: 'Cucumber Salad',
      quantity: 1
    },{
      id: 5,
      name: 'Sushi Sampler',
      quantity: 1
    },{
      id: 6,
      name: 'Original Poke',
      quantity: 1
    },{
      id: 7,
      name: 'Cucumber Salad',
      quantity: 1
    },{
      id: 8,
      name: 'Sushi Sampler',
      quantity: 1
    },{
      id: 9,
      name: 'Original Poke',
      quantity: 1
    }],
    cardNumber: '1234345345533345'
  }

    this.value = 0;

    this.scrollToPosition = this.scrollToPosition.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.showModalAnimatedValue = new Animated.Value(0);
  }

  scrollToPosition(op) {
    if (this.value < 2 && op === 'next') {
      this.value = this.value + 1;
      this.scrollView.scrollTo({
        x: this.value * wp('33.33%'),
        y: 0,
        animated: true
      });
    } else if(this.value !== 0 && op === 'back') {
      this.value = this.value - 1;
      this.scrollView.scrollTo({
        x: this.value * wp('33.33%'),
        y: 0,
        animated: true
      });
    }
  }

  showModal() {
    this.showModalAnimatedValue.setValue(0);

    Animated.timing(this.showModalAnimatedValue, {
      toValue: 1,
      duration: 750,
      useNativeDriver: true
    }).start();
  }

  hideModal() {
    this.showModalAnimatedValue.setValue(1);

    Animated.timing(this.showModalAnimatedValue, {
      toValue: 0,
      duration: 750,
      useNativeDriver: true
    }).start();
  }

  render() {
    const modalAnimation = this.showModalAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0]
    });

    return (
      <Animated.View
        pointerEvents="auto"
        onPress={() => this.hideModal()}
        style={[
          styles.container,
          { transform: [{ translateY: modalAnimation }] }
        ]}
      >
        <View style={styles.modalView}>
          <BlurView style={styles.blurView} blurType="dark" blurAmount={5} />
          <View style={{ flex: 1 }}>
            <View style={styles.bottomArrowIconContainer}>
              <Image
                source={require('../../../../assets/images/icons/bottom_arrow.png')}
                style={styles.bottom_arrow}
              />
            </View>

            <View>
              <ScrollView
                horizontal
                ref={scrollView => {
                  this.scrollView = scrollView;
                }}
                bounces={false}
              >
                <View style={styles.tabBarIconsHolder} />

                <TouchableOpacity style={styles.tabBarIconsHolder}>
                  <Image
                    source={require('../../../../assets/images/checkout_icons/review_icon.png')}
                    style={{ height: 30, width: 30, resizeMode: 'contain' }}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabBarIconsHolder}>
                  <Image
                    source={require('../../../../assets/images/filters/dinner_filter.png')}
                    style={{ height: 30, width: 30, resizeMode: 'contain' }}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabBarIconsHolder}>
                  <Image
                    source={require('../../../../assets/images/checkout_icons/payment_icon.png')}
                    style={{ height: 30, width: 30, resizeMode: 'contain' }}
                  />
                </TouchableOpacity>

                <View style={styles.tabBarIconsHolder} />
              </ScrollView>
            </View>

            <Swiper loop={false} showsPagination={false}>
              <View style={styles.slide}>
                <View>
                  <View style={styles.orderDetails}>
                    <Text style={styles.restaurantName}>
                      {this.props.restaurantName}
                    </Text>

                    <Text style={styles.reviewOrderText}>
                      Review Order
                    </Text>

                    <FlatList
                      data={this.state.data}
                      showsVerticalScrollIndicator={false}
                      style={styles.flatList}
                      keyExtractor={item => item.id}
                      renderItem={({item}) =>
                        <View style={styles.item}>
                          <Text style={styles.itemName}>{item.name}</Text>
                          <View style={styles.actionBtnsHolder}>
                            <TouchableOpacity
                              activeOpacity={0.6}
                              style={styles.quantityBtn}
                            >
                              <Icon
                                name="minus"
                                size={wp('4.9%')}
                                color="#2ED573"
                              />
                            </TouchableOpacity>

                            <Text style={styles.quantity}>{item.quantity}</Text>

                            <TouchableOpacity
                              activeOpacity={0.6}
                              style={styles.quantityBtn}
                            >
                              <Icon
                                name="plus"
                                size={wp('4.9%')}
                                color="#2ED573"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      }
                    />
                  </View>

                  <View style={styles.reviewOrderFooter}>
                    <View style={styles.reviewOrderFooterContainer}>
                      <Text style={styles.reviewOrderFooterText}>
                        SUBTOTAL
                      </Text>
                      <Text style={[styles.reviewOrderFooterText, {textAlign: 'right'}]}>$33</Text>
                    </View>

                    <View style={styles.reviewOrderFooterContainer}>
                      <Text style={styles.reviewOrderFooterText}>
                        TAX
                      </Text>
                      <Text style={[styles.reviewOrderFooterText, {textAlign: 'right'}]}>+ $2.43</Text>
                    </View>
                  </View>

                  {/*<View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.scrollToPosition('next')}>
                      <Text style={{color: 'white'}}>Next</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.scrollToPosition('back')}>
                      <Text style={{color: 'white'}}>Prev</Text>
                    </TouchableOpacity>
                  </View>*/}
                </View>
              </View>

              <View style={styles.slide}>
                <View>
                  <View style={styles.orderDetails}>
                    <Text style={styles.restaurantName}>
                      WHERE TO?
                    </Text>
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
                    <Text style={styles.tableCode}>
                      9192
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.slide}>
                <View>
                  <View style={styles.orderDetails}>
                    <Text style={styles.restaurantName}>
                      PAYMENT METHOD
                    </Text>
                  </View>

                  <View style={styles.paymentScreenContainer}>
                    <View style={styles.paymentScreenBtnsContainer}>
                      <View style={styles.paymentBtnHolder}>
                        <Button
                          style={paymentBtnStyles.commonBtn}
                          onPress={() => alert()}
                        >
                          <View>
                            <Image source={require('../../../../assets/images/etc/visa_icon.png')} style={styles.paymentIcons}/>
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
                            <Image source={require('../../../../assets/images/etc/cash_icon.png')} style={styles.paymentIcons}/>
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
                        label='Card Number'
                        style={{ marginTop: wp('4%') }}
                        onChange={val => this.setState({ cardNumber: val })}
                        placeholder=''
                        showInputBottomBorder={false}
                        type='cardNumber'
                        keyboardType="numeric"
                        value={this.state.cardNumber}
                      />

                      <View style={{ flexDirection: 'row' }}>
                        <ProfileTextInput
                          label='Exp Date'
                          style={{ marginTop: wp('3%'), width: '70%' }}
                          onChange={val => this.setState({ cardNumber: val })}
                          placeholder=''
                          showInputBottomBorder={false}
                          type='expDate'
                          value="09/18"
                        />

                        <ProfileTextInput
                          label='CVV'
                          style={{ marginTop: wp('3%'), width: '30%' }}
                          onChange={val => this.setState({ cardNumber: val })}
                          placeholder=''
                          showInputBottomBorder={false}
                          type='cvv'
                          keyboardType="numeric"
                          value="344"
                        />
                      </View>

                      <ProfileTextInput
                        label='Card Holder'
                        style={{ marginTop: wp('4%'), marginBottom: wp('4%') }}
                        onChange={val => this.setState({ cardNumber: val })}
                        placeholder=''
                        showInputBottomBorder={false}
                        type='cardHolder'
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
        </View>
      </Animated.View>
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
