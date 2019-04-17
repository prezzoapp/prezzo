import React, { Component } from 'react';
import ReactNative, {
  Animated,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  PanResponder
} from 'react-native';

import { BlurView } from 'expo';

import PropTypes from 'prop-types';

import styles from './styles';

import CheckoutSwiper from '../../../components/CheckoutSwiper';

import CacheImage from '../../../components/CacheImage';

const { width, height } = Dimensions.get('screen');

const checkoutSwiperRef = React.createRef();

const parent = React.createRef();

const child = React.createRef();

const scrollViewRef = React.createRef();

export default class Checkout extends Component {
  constructor(props) {
    super(props);

    this.value = 0;
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.showModalAnimatedValue = new Animated.Value(height);

    // this.index = 0;

    this.viewPosition = { x: 0, y: 0, width: 0, height: 0 };

    this.panResponder = null;

    this.animationRunning = false;
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,

      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (
          gestureState.moveY >= this.viewPosition.y &&
          gestureState.moveY <= this.viewPosition.y + this.viewPosition.height
        ) {
          return true;
        }

        return false;
      },

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

  componentDidMount() {
    this.props.listCreditCards();
  }

  onScrollEnd(index) {
    scrollViewRef.current.scrollTo({
      x: parseFloat(width * index),
      y: 0,
      animated: true
    });
  }

  onLayout = () => {
    if (child.current) this.calculateLayout();
  };

  calculateLayout = () => {
    child.current.measureLayout(
      ReactNative.findNodeHandle(parent.current),
      (xPos, yPos, Width, Height) => {
        this.viewPosition.x = xPos;
        this.viewPosition.y = yPos;
        this.viewPosition.width = Width;
        this.viewPosition.height = Height;
      }
    );
  };

  scrollForward() {
    checkoutSwiperRef.current.scrollForward();
  }

  // scrollReset() {
  //   this.checkoutSwiper.scrollReset();
  // }

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

  render() {
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        ref={parent}
        style={[
          styles.container,
          {
            transform: [{ translateY: this.showModalAnimatedValue }]
          }
        ]}
        onLayout={this.onLayout}
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
              ref={child}
              style={styles.bottomArrowIconContainer}
              onLayout={this.calculateLayout}
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
              onScrollingEnd={(xValue, index) =>
                this.onScrollEnd(xValue, index)
              }
              data={this.props.data}
              addRemoveItemQuantity={(sectionId, itemId, op) =>
                this.props.addRemoveItemQuantity(sectionId, itemId, op)
              }
              setCurrentIndex={index => this.props.setCurrentIndex(index)}
              hideModal={this.hideModal}
              isSelectedPaymentMethod={val =>
                this.props.isSelectedPaymentMethod(val)
              }
              setType={type => this.props.setType(type)}
              type={this.props.type}
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
  setType: PropTypes.func.isRequired
};
