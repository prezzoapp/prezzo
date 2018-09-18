import React, { Component } from 'react';
import ReactNative, {
  Animated,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  PanResponder,
  findNodeHandle
} from 'react-native';

import { BlurView } from 'react-native-blur';

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

    this.showModalAnimatedValue = new Animated.Value(height);

    this.index = 0;

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
          evt.nativeEvent.pageY >= this.viewPosition.y &&
          evt.nativeEvent.pageY <=
            this.viewPosition.y + this.viewPosition.height
        ) {
          return true;
        }

        return false;
      },

      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderMove: (evt, gestureState) => {
        // console.log("Move Gesture Called!");
        if(gestureState.dy > 0) {
          this.showModalAnimatedValue.setValue(gestureState.dy);
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        // console.log(parseInt(height / 5));
        // console.log(gestureState.dy);

        if(gestureState.dy <= parseInt(height / 5)) {
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

  onScrollEnd(index) {
    this.scrollView.scrollTo({
      x: parseFloat((width * index) / 3),
      y: 0,
      animated: false });

    this.index = index;
  }

  calculateLayout() {
    this.child.measureLayout(
      ReactNative.findNodeHandle(this.parent),
      (xPos, yPos, Width, Height) => {
        this.viewPosition.x = xPos;
        this.viewPosition.y = yPos;
        this.viewPosition.width = Width;
        this.viewPosition.height = Height;

        console.log(this.viewPosition);
      }
    );
  }

  scrollForward() {
    this.checkoutSwiper.scrollForward();
  }

  scrollReset() {
    this.checkoutSwiper.scrollReset();
  }

  showModal() {
    if(this.animationRunning === false) {
      //this.showModalAnimatedValue.setValue(0);
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

  hideModal() {
    //this.showModalAnimatedValue.setValue(1);

    Animated.timing(this.showModalAnimatedValue, {
      toValue: height,
      duration: 250,
      useNativeDriver: true
    }).start(() => {
      this.props.hideNextOrderBtn();
    });
  }

  render() {
    console.log('Render called!');

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        ref={parent => {
          this.parent = parent;
        }}
        style={[
          styles.container,
          {
            transform: [{ translateY: this.showModalAnimatedValue }]
          }
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.hideModal()}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }}
        />
        <View style={styles.modalView}>
          <BlurView style={styles.blurView} blurType="dark" blurAmount={5} />
          <View style={{ flex: 1 }}>
            <View
              ref={child => {
                this.child = child;
              }}
              style={styles.bottomArrowIconContainer}
              onLayout={() => this.calculateLayout()}
            >
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
