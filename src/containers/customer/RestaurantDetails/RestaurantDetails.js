import React, { Component } from 'react';

import {
  View,
  Text,
  SectionList,
  ImageBackground,
  Image,
  TouchableOpacity,
  Animated,
  InteractionManager,
  ActivityIndicator
} from 'react-native';

// import { Header } from 'react-navigation';

import { Feather } from '../../../components/VectorIcons';

import { LinearGradient, BlurView } from 'expo';


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import PropTypes from 'prop-types';

import styles from './styles';

import RestaurantItem from '../../../components/RestaurantItem';

import Button from '../../../components/Button';

import { FONT_FAMILY, COLOR_WHITE } from '../../../services/constants';

import Checkout from '../Checkout';

import CustomPopup from '../../../components/CustomPopup';
import showGenericAlert from '../../../components/GenericAlert';

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

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
      currentSlideIndex: 0,
      showNextBtn: false,
      isSelectedPaymentType: false
    };

    this.toggleViewFun = this.toggleViewFun.bind(this);
    this.onOrderBtnClick = this.onOrderBtnClick.bind(this);
    this.onPlaceOrderBtnClick = this.onPlaceOrderBtnClick.bind(this);
    this.showNextOrderBtn = this.showNextOrderBtn.bind(this);
    this.hideNextOrderBtn = this.hideNextOrderBtn.bind(this);

    this.scrollAnimatedValue = new Animated.Value(0);

    this.flag = 0;
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.addRestaurantDetail(this.props.navigation.state.params.item);
    })
  }

  componentWillUnmount() {
    this.props.removeRestaurantDetail();
  }

  onPlaceOrderBtnClick() {
    this.modal.getWrappedInstance().scrollReset();
    this.modal.getWrappedInstance().showModal();
  }

  onOrderBtnClick() {
    if (
      this.modal &&
      this.state.currentSlideIndex >= 0 &&
      this.state.currentSlideIndex < 2
    ) {
      this.modal.getWrappedInstance().scrollForward();
    } else if (this.modal && this.state.currentSlideIndex === 2) {
      this.modal.getWrappedInstance().hideModal();
      this.attemptToCreateOrder().then(() => {
        this.setState(() => {
          return {
              modalVisible: true
            };
          },
          () => {
            this.props.clearCartData();
          }
        );
      });
    }
  }

  setIndex(index) {
    // console.log("Index: " + index);
    this.setState(() => {
      return {
        currentSlideIndex: index
      }
    });
  }

  async attemptToCreateOrder() {
    const cartItems =
      this.props.data && this.props.data.data.menu &&
      this.props.data.data.menu.categories
        .map(category =>
          category.data.map(d => ({ ...d, sectionId: category._id }))
        )
        .reduce((a, v) => [...a, ...v], []);

    try {
      await this.props.createOrder(
        cartItems,
        this.props.type,
        'cash',
        this.props.data.data.name
      )
    } catch(e) {
      showGenericAlert('Uh-oh!', e.message || e);
    }
  }

  isSelectedPaymentMethod(val) {
    if(val === '') {
      this.setState(() => {
        return {
          isSelectedPaymentType: false
        }
      })
    } else {
      this.setState(() => {
        return {
          isSelectedPaymentType: true
        }
      })
    }
  }

  showNextOrderBtn() {
    this.setState(() => {
      return {
        showNextBtn: true
      }
    })
  }

  hideNextOrderBtn() {
    this.setState(() => {
      return {
        showNextBtn: false
      }
    });
  }

  toggleViewFun() {
    this.setState(() => {
      return {
        showText: !this.state.showText
      }
    });
  }

  listFooterComponent() {
    if(this.flag === 1) {
      return <View style={{ height: hp('8.62%') }} />;
    }
    return null;
  }

  renderFooter() {
    this.flag = 0;

    if(this.props.data.data) {
      if (
        this.props.data.data.menu &&
        this.props.data.data.menu.categories &&
        this.props.data.data.menu.categories.length > 0
      ) {
        for (let i = 0; i < this.props.data.data.menu.categories.length; i++) {
          if (
            this.props.data.data.menu.categories[i].data &&
            this.props.data.data.menu.categories[i].data.length > 0
          ) {
            for (let j = 0; j < this.props.data.data.menu.categories[i].data.length; j++) {
              if(this.props.data.data.menu.categories[i].data[j].quantity > 0) {
                this.flag = 1;
                break;
              }
            }
          }
        }

        if(this.state.modalVisible) {
          return null;
        } else if(this.flag === 1) {
          return (
            <View style={styles.bottomViewHolder}>
              <BlurView
                style={styles.bottomViewBlurContainer}
                tint="dark"
                intensity={10}
              />

              {(() => {
                if(this.state.showNextBtn) {
                  return (
                    <Button
                      style={[
                        buttonStyles.placeOrderBtn,
                        {
                          backgroundColor:
                            this.state.currentSlideIndex === 2 &&
                            !this.state.isSelectedPaymentType
                              ? 'grey'
                              : '#2ED573',
                          borderColor:
                            this.state.currentSlideIndex === 2 &&
                            !this.state.isSelectedPaymentType
                              ? 'grey'
                              : '#2ED573'
                        }
                      ]}
                      textStyle={buttonStyles.btnText}
                      disabled={
                        this.state.currentSlideIndex === 2 &&
                        !this.state.isSelectedPaymentType
                          ? true
                          : false
                      }
                      onPress={this.onOrderBtnClick}
                    >
                      {(() => {
                        if (this.state.currentSlideIndex < 2) {
                          return 'Next';
                        }
                        return 'Complete Order';
                      })()}
                    </Button>
                  );
                }
                return (
                  <Button
                    style={buttonStyles.placeOrderBtn}
                    textStyle={buttonStyles.btnText}
                    onPress={this.onPlaceOrderBtnClick}
                  >
                    Place Order
                  </Button>
                );
              })()}

              <Text style={styles.totalPrice}>
                Total $
                {parseFloat(
                  this.props.data.totalPrice +
                    (this.props.data.totalPrice * 2.43) / 100
                ).toFixed(2)}
              </Text>
            </View>
          );
        }
      }
    }
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
      inputRange: [0, 190],
      outputRange: [190, 0],
      extrapolate: 'clamp'
    });

    const animatedOpacity = this.scrollAnimatedValue.interpolate({
      inputRange: [0, 190],
      outputRange: [1, 0]
    });

    return (
      <View style={styles.container}>
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
              source={{
                uri: this.props.navigation.state.params.item.avatarURL
              }}
              style={styles.logo}
            />
            <View style={[styles.headerTextContainer, styles.transparent]}>
              <Text style={styles.headerTitleText}>
                {this.props.navigation.state.params.item.location.address},{' '}
                {this.props.navigation.state.params.item.location.regionShort},{' '}
                {this.props.navigation.state.params.item.location.postalCode}
              </Text>
              <View style={styles.headerContentTextContainer}>
                <Feather name="package" size={22} color="white" />
                <Text style={[styles.transparent, styles.headerContentText]}>
                  Delivery
                </Text>
              </View>
              <View style={styles.headerContentTextContainer}>
                <Feather name="clock" size={22} color="white" />
                <Text style={[styles.transparent, styles.headerContentText]}>
                  8 Mins Wait Time
                </Text>
              </View>
            </View>
          </View>

          {(() => {
            if (this.props.data.data) {
              if(
                this.props.navigation.state.params.item.menu !== undefined &&
                this.props.navigation.state.params.item.menu.categories !== undefined &&
                this.props.navigation.state.params.item.menu.categories.length > 0) {
                return (
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
                          <Text style={styles.selectedBtnText}>
                            {this.state.showText ? 'Text' : 'Photo'}
                          </Text>
                        </LinearGradient>
                      </View>
                    </View>
                  </View>
                );
              }
            }
          })()}
        </Animated.View>

        <View style={{ flex: 1 }}>
          {(() => {
            if(this.props.data.data) {
              if (
                this.props.navigation.state.params.item.menu &&
                this.props.navigation.state.params.item.menu.categories.length === 0
              ) {
                return(
                  <View style={styles.messageHolder}>
                    <Text style={styles.message}>Does not have Items.</Text>
                  </View>
                );
              } else if (!this.props.navigation.state.params.item.menu) {
                return (
                  <View style={styles.messageHolder}>
                    <Text style={styles.message}>Does not have Menu.</Text>
                  </View>
                );
              }
              return (
                <AnimatedSectionList
                  bounces={false}
                  keyExtractor={item => item._id.toString()}
                  onScroll={Animated.event([
                    {
                      nativeEvent: {
                        contentOffset: { y: this.scrollAnimatedValue }
                      }
                    }]
                  )}
                  contentContainerStyle={{
                    paddingBottom: 15,
                    paddingHorizontal: 15
                  }}
                  ListFooterComponent={() => this.listFooterComponent()}
                  sections={
                    this.props.data.data.menu &&
                    this.props.data.data.menu.categories
                      ? this.props.data.data.menu.categories
                      : []
                  }
                  renderSectionHeader={({ section }) =>
                    this.renderSectionHeader(section)
                  }
                  renderItem={({ item, section }) =>
                    <RestaurantItem
                      item={item}
                      section={section}
                      showText={this.state.showText}
                      addRemoveItemQuantity={(itemId, op) =>
                        this.props.addRemoveItemQuantity(
                          section._id,
                          itemId,
                          op
                        )
                      }
                      changeItemRating={(itemId, rating) =>
                        this.props.changeItemRating(section._id, itemId, rating)
                      }
                    />
                  }
                />
              );
            }
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <ActivityIndicator size="large" />
              </View>
            );
          })()}
        </View>

        {this.renderFooter()}

        {this.state.modalVisible ? (
          <CustomPopup
            modalVisible={this.state.modalVisible}
            onDismiss={() => {
              this.setState({ modalVisible: false });
            }}
          />
        ) : null}

        {(() => {
          if(this.props.data.data) {
            return (
              <Checkout
                ref={modal => this.modal = modal}
                setCurrentIndex={(index) => this.setIndex(index)}
                resetCurrentIndex={() => this.resetCurrentIndex()}
                restaurantName={this.props.navigation.state.params.item.name}
                showNextOrderBtn={() => this.showNextOrderBtn()}
                hideNextOrderBtn={() => this.hideNextOrderBtn()}
                isSelectedPaymentMethod={val =>
                  this.isSelectedPaymentMethod(val)
                }
              />
            );
          }
        })()}
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

RestaurantDetails.propTypes = {
  navigation: PropTypes.object.isRequired,
  addRestaurantDetail: PropTypes.func.isRequired,
  removeRestaurantDetail: PropTypes.func.isRequired,
  clearCartData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  addRemoveItemQuantity: PropTypes.func.isRequired,
  changeItemRating: PropTypes.func.isRequired
};
