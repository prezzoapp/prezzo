import React, { Component } from 'react';
import ReactNative, {
  Animated,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  PanResponder,
  Image
} from 'react-native';

import { BlurView } from 'expo';

import PropTypes from 'prop-types';

import styles from './styles';

import CheckoutSwiper from '../../../components/CheckoutSwiper';
import CacheImage from '../../../components/CacheImage';

import {
  showAlertWithMessage,
  manuallyLogout
} from '../../../services/commonFunctions';

const { width, height } = Dimensions.get('screen');

const checkoutSwiperRef = React.createRef();

// const parent = React.createRef();
//
// const child = React.createRef();

const scrollViewRef = React.createRef();

export default class Checkout extends Component {
  constructor(props) {
    super(props);

    this.value = 0;
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.showModalAnimatedValue = new Animated.Value(height);

    this.viewPosition = { x: 0, y: 0, width: 0, height: 0 };

    this.panResponder = null;

    this.animationRunning = false;
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,

      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,

      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          this.showModalAnimatedValue.setValue(gestureState.dy);
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy <= parseInt(height / 5)) {
          Animated.timing(this.showModalAnimatedValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }).start();
        } else {
          this.hideModal();
        }
      }
    });
  }

  onScrollEnd = index => {
    scrollViewRef.current.scrollTo({
      x: parseFloat(width * index),
      y: 0,
      animated: true
    });
  };

  // onLayout = () => {
  //   if (child.current) this.calculateLayout();
  // };

  // calculateLayout = () => {
  //   child.current.measureLayout(
  //     ReactNative.findNodeHandle(parent.current),
  //     (xPos, yPos, Width, Height) => {
  //       this.viewPosition.x = xPos;
  //       this.viewPosition.y = yPos;
  //       this.viewPosition.width = Width;
  //       this.viewPosition.height = Height;
  //     }
  //   );
  // };

  scrollForward() {
    checkoutSwiperRef.current.scrollForward();
  }

  showModal() {
    if (this.animationRunning === false) {
      this.animationRunning = true;
      Animated.timing(this.showModalAnimatedValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      }).start(() => {
        this.props.showNextOrderBtn();
        this.animationRunning = false;
      });
    }
  }

  hideModal = () => {
    checkoutSwiperRef.current.setPaymentType('');
    Animated.timing(this.showModalAnimatedValue, {
      toValue: height,
      duration: 250,
      useNativeDriver: true
    }).start(() => {
      this.props.hideNextOrderBtn();
      this.props.hideCheckoutModal();
    });
  };

  addRemoveItemQuantity = (sectionId, itemId, op) => {
    return this.props.addRemoveItemQuantity(sectionId, itemId, op);
  };

  setCurrentIndex = index => {
    this.props.setCurrentIndex(index);
  };

  isSelectedPaymentMethod = val => {
    this.props.isSelectedPaymentMethod(val);
  };

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: this.showModalAnimatedValue }]
          }
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.hideModal}
          style={styles.cancelModalButton}
        />
        <View style={styles.modalView}>
          <BlurView style={styles.blurView} tint="dark" intensity={95} />
          <View style={{ flex: 1 }}>
            <View
              {...this.panResponder.panHandlers}
              style={styles.bottomArrowIconContainer}
            >
              <CacheImage
                source={require('../../../../assets/images/icons/bottom_arrow.png')}
                type='image'
                style={styles.bottom_arrow}
              />
            </View>

            <View>
              <ScrollView
                scrollEnabled={false}
                horizontal
                ref={scrollViewRef}
                bounces={false}
              >
                <TouchableOpacity
                  activeOpacity={0.6}
                  disabled
                  onPress={() => null}
                  style={styles.tabBarIconsHolder}
                >
                  <CacheImage
                    source={require('../../../../assets/images/checkout_icons/review_icon.png')}
                    type='image'
                    style={styles.icon}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.6}
                  disabled
                  onPress={() => null}
                  style={styles.tabBarIconsHolder}
                >
                  <CacheImage
                    source={require('../../../../assets/images/checkout_icons/payment_icon.png')}
                    type='image'
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>

            <CheckoutSwiper
              ref={checkoutSwiperRef}
              navigate={this.props.navigate}
              restaurantName={this.props.restaurantName}
              creditCardList={this.props.creditCardList}
              onScrollingEnd={this.onScrollEnd}
              data={this.props.data}
              addRemoveItemQuantity={this.addRemoveItemQuantity}
              setCurrentIndex={this.setCurrentIndex}
              hideModal={this.hideModal}
              isSelectedPaymentMethod={this.isSelectedPaymentMethod}
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
  hideNextOrderBtn: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  creditCardList: PropTypes.object.isRequired,
  isSelectedPaymentMethod: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};
