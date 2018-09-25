import React, { Component } from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';

import { BlurView } from 'expo';

import PropTypes from 'prop-types';

import styles from './styles';

import CheckoutSwiper from '../../../components/CheckoutSwiper';

const { width, height } = Dimensions.get('window');

export default class Checkout extends Component {
  constructor(props) {
    super(props);

    this.value = 0;
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.showModalAnimatedValue = new Animated.Value(0);

    this.index = 0;

    this.animationRunning = false;
  }

  onScrollEnd(index) {
    this.scrollView.scrollTo({
      x: parseFloat((width * index) / 3),
      y: 0,
      animated: false });

    this.index = index;
  }

  scrollForward() {
    this.checkoutSwiper.scrollForward();
  }

  scrollReset() {
    this.checkoutSwiper.scrollReset();
  }

  showModal() {
    if(this.animationRunning === false) {
      this.showModalAnimatedValue.setValue(0);
      this.animationRunning = true;
      Animated.timing(this.showModalAnimatedValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true
      }).start(() => {
        this.props.showNextOrderBtn();
        this.animationRunning = false;
      });
    }
  }

  hideModal() {
    this.showModalAnimatedValue.setValue(1);

    Animated.timing(this.showModalAnimatedValue, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true
    }).start(() => {
      this.props.hideNextOrderBtn();
    });
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
          onPress={() => this.hideModal()}
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
        />
        <View style={styles.modalView}>
          <BlurView style={styles.blurView} tint="dark" intensity={100} />
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

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => this.checkoutSwiper.moveToIndex(0)}
                  style={styles.tabBarIconsHolder}
                >
                  <Image
                    source={require('../../../../assets/images/checkout_icons/review_icon.png')}
                    style={[
                      styles.icon,
                      { tintColor: this.index === 0 ? '#2ED573' : null }
                    ]}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => this.checkoutSwiper.moveToIndex(1)}
                  style={styles.tabBarIconsHolder}
                >
                  <Image
                    source={require('../../../../assets/images/filters/dinner_filter.png')}
                    style={[
                      styles.icon,
                      { tintColor: this.index === 1 ? '#2ED573' : null }
                    ]}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => this.checkoutSwiper.moveToIndex(2)}
                  style={styles.tabBarIconsHolder}
                >
                  <Image
                    source={require('../../../../assets/images/checkout_icons/payment_icon.png')}
                    style={[
                      styles.icon,
                      { tintColor: this.index === 2 ? '#2ED573' : null }
                    ]}
                  />
                </TouchableOpacity>

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
              addRemoveItemQuantity={(sectionId, itemId, op) =>
                this.props.addRemoveItemQuantity(sectionId, itemId, op)
              }
              setCurrentIndex={index => this.props.setCurrentIndex(index)}
              hideModal={() => this.hideModal()}
            />
          </View>
        </View>
      </Animated.View>
    );
  }
}

Checkout.propTypes = {
  data: PropTypes.object.isRequired,
  restaurantName: PropTypes.string.isRequired,
  addRemoveItemQuantity: PropTypes.func.isRequired,
  setCurrentIndex: PropTypes.func.isRequired,
  showNextOrderBtn: PropTypes.func.isRequired,
  hideNextOrderBtn: PropTypes.func.isRequired
};
