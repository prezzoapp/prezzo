import React, { Component } from 'react';

import {
  View,
  Text,
  SectionList,
  ImageBackground,
  Image,
  TouchableOpacity,
  Animated
} from 'react-native';

import { fromJS } from 'immutable';

import { Header } from 'react-navigation';

import Icon from 'react-native-vector-icons/dist/Feather';

import LinearGradient from 'react-native-linear-gradient';

import { BlurView } from 'react-native-blur';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import styles from './styles';

import RestaurantItem from '../../../components/RestaurantItem';

import Button from '../../../components/Button';

import { FONT_FAMILY, COLOR_WHITE } from '../../../services/constants';

import Checkout from '../Checkout';

import CustomPopup from '../../../components/CustomPopup';

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList)

export default class RestaurantDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item.name,
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: -1,
      top: 0,
      left: 0,
      right: 0,
      shadowColor: 'transparent',
      borderBottomWidth: 0
    },
    headerTintColor: '#fff'
  });

  constructor(props) {
    super(props);

    this.state = {
      showText: false,
      modalVisible: false,
      currentSlideIndex: -1
    }
    this.toggleViewFun = this.toggleViewFun.bind(this);
    this.onOrderBtnClick = this.onOrderBtnClick.bind(this);
    this.callbackFunction = this.callbackFunction.bind(this);

    this.scrollAnimatedValue = new Animated.Value(0);
  }

  componentWillMount() {
    this.props.addRestaurantDetail(this.props.navigation.state.params.item);
  }

  onOrderBtnClick() {
    if(this.state.currentSlideIndex === -1 && this.modal) {
      this.modal.getWrappedInstance().showModal();
      this.setIndex(0);
    } else if (
      this.state.currentSlideIndex < 2 &&
      this.state.currentSlideIndex >= 0
    ) {
      this.setIndex(this.state.currentSlideIndex + 1, this.callbackFunction);
    } else if (this.state.currentSlideIndex === 2 && this.modal) {
      this.modal.getWrappedInstance().hideModal();
      this.setState(() => {
        return {
          modalVisible: true
        }
      });
    }
  }

  setIndex(index, callback = null) {
    this.setState(() => {
      return {
        currentSlideIndex: index
      }
    }, () => {
        if (callback !== null && typeof callback === 'function') {
          callback();
        }
      }
    );
  }

  resetCurrentIndex() {
    this.setIndex(-1);
  }

  callbackFunction() {
    this.modal.getWrappedInstance().scrollForward();
  }

  toggleViewFun() {
    this.setState(() => {
      return {
        showText: !this.state.showText
      }
    });
  }

  renderSectionHeader = section => (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        backgroundColor: 'black',
        bottom: 0
      }}
    >
      <Text style={[styles.transparent, styles.listHeaderText]}>
        {section.title}
      </Text>
    </View>
  )

  render() {
    const animatedHeader = this.scrollAnimatedValue.interpolate({
      inputRange: [0, 170],
      outputRange: [170, 0],
      extrapolate: 'clamp'
    });

    const animatedOpacity = this.scrollAnimatedValue.interpolate({
      inputRange: [0, 170],
      outputRange: [1, 0]
    });

    return (
      <View style={[styles.container, { paddingTop: Header.HEIGHT + 5 }]}>
        <ImageBackground
          source={require('../../../../assets/images/photo_back.png')}
          style={styles.photo_back}>
          <LinearGradient
            colors={['transparent', 'black']}
            style={styles.LinearGradientStyle}
          />
        </ImageBackground>

        <Animated.View
          style={{
            height: animatedHeader,
            overflow: 'hidden',
            opacity: animatedOpacity,
            paddingHorizontal: 15
          }}
        >
          <View style={styles.contentContainer}>
            <Image
              source={{ uri: this.props.data.data.avatarURL }}
              style={styles.logo}
            />
            <View style={[styles.headerTextContainer, styles.transparent]}>
              <Text style={styles.headerTitleText}>
                {this.props.data.data.location.address},{' '}
                {this.props.data.data.location.regionShort},{' '}
                {this.props.data.data.location.postalCode}
              </Text>
              <View style={styles.headerContentTextContainer}>
                <Icon name="package" size={22} color="white" />
                <Text style={[styles.transparent, styles.headerContentText]}>
                  Delivery
                </Text>
              </View>
              <View style={styles.headerContentTextContainer}>
                <Icon name="clock" size={22} color="white" />
                <Text style={[styles.transparent, styles.headerContentText]}>
                  8 Mins Wait Time
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.toggleBtnsSection}>
            <View style={styles.buttonHolder}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.headerBtns}
                onPress={this.toggleViewFun}
              >
                <Text style={styles.headerBtnText}>Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.headerBtns}
                onPress={this.toggleViewFun}
              >
                <Text style={styles.headerBtnText}>Text</Text>
              </TouchableOpacity>
              <View
                style={[
                  styles.toggleView,
                  { left: this.state.showText ? 80 : 0 }
                ]}
              >
                <LinearGradient
                  colors={['#707070', '#1E1E1E']}
                  style={[styles.headerBtns, styles.linearGradientBtn]}
                >
                  <Text style={styles.selectedBtnText}>{this.state.showText ? 'Text' : 'Photo'}</Text>
                </LinearGradient>
              </View>
            </View>
          </View>
        </Animated.View>

        {(this.props.data.data.menu &&
          this.props.data.data.menu.categories.length === 0) ? (
            <View style={styles.messageHolder}>
              <Text style={styles.message}>Does not have Items.</Text>
            </View>
          ) : (
            (this.props.data.data["menu"] === undefined) ? (
              <View style={styles.messageHolder}>
                <Text style={styles.message}>Does not have Menu.</Text>
              </View>
            ) : (
              <View style={{flex: 1}}>
                <AnimatedSectionList
                  bounces={false}
                  keyExtractor={item => item._id.toString()}
                  onScroll={Animated.event([
                    {
                      nativeEvent: { contentOffset: { y: this.scrollAnimatedValue } }
                    }]
                  )}
                  contentContainerStyle={{ paddingBottom: 85, paddingHorizontal: 15 }}
                  sections={this.props.data.data.menu.categories}
                  renderSectionHeader={({ section }) =>
                    this.renderSectionHeader(section)
                  }
                  renderItem={({ item, section }) =>
                    <RestaurantItem
                      item={item}
                      section={section}
                      showText={this.state.showText}
                      addRemoveItemQuantity={(itemId, op) => this.props.addRemoveItemQuantity(section._id, itemId, op)}
                      changeItemRating={(itemId, rating) => this.props.changeItemRating(section._id, itemId, rating)}
                    />
                  }
                />
              </View>
            )
          )}

          <View style={styles.bottomViewHolder}>
            <BlurView
              style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}
              blurType="dark"
              blurAmount={10}
            />
            <Button
              style={buttonStyles.placeOrderBtn}
              textStyle={buttonStyles.btnText}
              onPress={this.onOrderBtnClick}
            >
            {this.state.currentSlideIndex === -1
              ? 'Place Order'
              : this.state.currentSlideIndex < 2
                ? 'Next'
                : 'Complete Order'}
            </Button>

            <Text style={styles.totalPrice}>Total $35.42</Text>
          </View>

          {(this.state.modalVisible) ? (
            <CustomPopup modalVisible={this.state.modalVisible}/>
          ) : (
            null
          )}

          <Checkout ref={modal => this.modal = modal}
            setCurrentIndex={(index) => this.setIndex(index)}
            resetCurrentIndex={() => this.resetCurrentIndex()}
            restaurantName={this.props.data.data.name}/>
      </View>
    );
  }
}

const buttonStyles = {
  placeOrderBtn: {
    backgroundColor: '#2ED573',
    borderColor: '#0DD24A',
    width: wp('40%'),
    height: hp('4.55%'),
    justifyContent: 'center',
    borderRadius: 8
  },
  btnText: {
    fontSize: wp('3.73%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
};
