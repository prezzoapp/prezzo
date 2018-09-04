import React, { Component } from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';

import { BlurView } from 'react-native-blur';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import styles from './styles';

import CheckoutSwiper from '../../../components/CheckoutSwiper';

const height = Dimensions.get('window').height;

export default class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = { cardNumber: '1234345345533345' }

    this.value = 0;
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.onScrollEnd = this.onScrollEnd.bind(this);

    this.showModalAnimatedValue = new Animated.Value(0);

    this.panResponder = null;
  }

  onScrollEnd(xValue, index) {
    this.scrollView.scrollTo({
      x: parseFloat(xValue / 3),
      y: 0,
      animated: false });

    this.props.setCurrentIndex(index);
  }

  scrollForward() {
    this.checkoutSwiper.scrollForward();
  }

  showModal() {
    this.showModalAnimatedValue.setValue(0);

    Animated.timing(this.showModalAnimatedValue, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true
    }).start();
  }

  hideModal() {
    this.showModalAnimatedValue.setValue(1);
    this.props.resetCurrentIndex();

    Animated.timing(this.showModalAnimatedValue, {
      toValue: 0,
      duration: 250,
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
        style={[
          styles.container,
          { transform: [{ translateY: modalAnimation }] }
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.hideModal(this.state.currentSlideIndex)}
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
        />
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
                scrollEnabled={false}
                horizontal
                ref={scrollView => {
                  this.scrollView = scrollView;
                }}
                bounces={false}
              >
                <View style={styles.tabBarIconsHolder} />

                <View style={styles.tabBarIconsHolder}>
                  <Image
                    source={require('../../../../assets/images/checkout_icons/review_icon.png')}
                    style={{ height: 30, width: 30, resizeMode: 'contain' }}
                  />
                </View>

                <View style={styles.tabBarIconsHolder}>
                  <Image
                    source={require('../../../../assets/images/filters/dinner_filter.png')}
                    style={{ height: 30, width: 30, resizeMode: 'contain' }}
                  />
                </View>

                <View style={styles.tabBarIconsHolder}>
                  <Image
                    source={require('../../../../assets/images/checkout_icons/payment_icon.png')}
                    style={{ height: 30, width: 30, resizeMode: 'contain' }}
                  />
                </View>

                <View style={styles.tabBarIconsHolder} />
              </ScrollView>
            </View>

            <CheckoutSwiper
              ref={checkoutSwiper => {
                this.checkoutSwiper = checkoutSwiper;
              }}
              restaurantName={this.props.restaurantName}
              onScrollingEnd={(xValue, index) =>
                this.onScrollEnd(xValue, index)
              }
              data={this.props.data}
              addRemoveItemQuantity={(categoryId, itemId, op) =>
                this.props.addRemoveItemQuantity(categoryId, itemId, op)
              }
            />
          </View>
        </View>
      </Animated.View>
    );
  }
}
