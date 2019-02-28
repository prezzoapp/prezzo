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
  ActivityIndicator,
  Platform
} from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import PropTypes from 'prop-types';

import { Header } from 'react-navigation';

import { LinearGradient, BlurView, Constants } from 'expo';

import { Feather } from '../../../components/VectorIcons';

import styles from './styles';

import RestaurantItem from '../../../components/RestaurantItem';

import LoadingComponent from '../../../components/LoadingComponent';

import Button from '../../../components/Button';

import {
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE,
  INTERNET_NOT_CONNECTED,
  NETWORK_REQUEST_FAILED,
  TIME_OUT
} from '../../../services/constants';

import { showAlertWithMessage } from '../../../services/commonFunctions';

import Checkout from '../Checkout';

import CustomPopup from '../../../components/CustomPopup';
import showGenericAlert from '../../../components/GenericAlert';

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
const headerHeight = wp('44.97%');

export default class RestaurantDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      top: 0,
      left: 0,
      right: 0,
      shadowColor: 'transparent',
      borderBottomWidth: 0,
      elevation: 0
    },
    headerTintColor: '#fff',
    gesturesEnabled: false,
    headerLeft: (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={styles.headerLeftBtn}>
        <Feather
          title="Back"
          name="chevron-left"
          color="white"
          size={wp('8%')}
          style={styles.closeBtnIcon}
        />
        <Text style={styles.headerLeftBtnText} numberOfLines={1}>
          {navigation.state.params.item.name}
        </Text>
      </TouchableOpacity>
    )
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

    this.selectedPaymentMethod = '';
    this.paymentMethodId = '';
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props
        .addRestaurantDetail(this.props.navigation.state.params.item)
        .then(() => {}).catch(err => alert(err.message));
    });
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
      this.state.currentSlideIndex < 1
    ) {
      this.modal.getWrappedInstance().scrollForward();
    } else if (this.modal && this.state.currentSlideIndex === 1) {
      this.modal.getWrappedInstance().hideModal();
      this.attemptToCreateOrder();
    }
  }

  setIndex(index) {
    this.setState(() => {
      return {
        currentSlideIndex: index
      }
    });
  }

  showAlert(title, message, duration) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      showGenericAlert(title, message);
    }, duration);
  }

  attemptToCreateOrder() {
    const modifiedCartItems = [];
    const cartItems =
      this.props.data && this.props.data.data.menu &&
      this.props.data.data.menu.categories
        .map(category =>
          category.data.map(d => {
            return d;
          })
        )
        .reduce((a, v) => a.concat(v), []);

    cartItems.map(cart => {
      for (let i = 0; i < cart.quantity; i++) {
       modifiedCartItems.push({
         createdDate: cart.createdDate,
         title: cart.title,
         description: cart.description,
         status: 'pending',
         notes: cart.description,
         price: cart.price,
         rating: cart.rating,
         imageURLs: cart.imageURLs
       });
     }
    });

    this.props.createOrder(
        this.paymentMethodId,
        modifiedCartItems,
        this.props.type,
        this.selectedPaymentMethod,
        this.props.data.data._id
      )
      .then(() => {
        this.setState(
          () => {
            return {
              modalVisible: true
            };
          },
          () => {
            this.props.clearCartData();
          }
        );
      })
      .catch(err => {
        if(err.message === NETWORK_REQUEST_FAILED) {
          this.showAlert('Uh-oh!', INTERNET_NOT_CONNECTED, TIME_OUT);
        } else {
          this.showAlert('Uh-oh!', err.message, TIME_OUT);
        }
      });
  }

  isSelectedPaymentMethod(val) {
    if(val === '') {
      this.selectedPaymentMethod = '';
    } else if(val !== 'cash') {
      this.selectedPaymentMethod = 'card';
      this.paymentMethodId = val;
    } else {
      this.selectedPaymentMethod = val;
    }

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
      return <View style={{ height: wp('18.66%') }} />;
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
                intensity={90}
              />

              {(() => {
                if(this.state.showNextBtn) {
                  return (
                    <Button
                      style={[
                        buttonStyles.placeOrderBtn,
                        {
                          backgroundColor:
                            this.state.currentSlideIndex === 1 &&
                            !this.state.isSelectedPaymentType
                              ? 'grey'
                              : '#2ED573',
                          borderColor:
                            this.state.currentSlideIndex === 1 &&
                            !this.state.isSelectedPaymentType
                              ? 'grey'
                              : '#2ED573'
                        }
                      ]}
                      textStyle={buttonStyles.btnText}
                      disabled={
                        !!(this.state.currentSlideIndex === 1 &&
                          !this.state.isSelectedPaymentType
                        )
                      }
                      onPress={this.onOrderBtnClick}
                    >
                      {(() => {
                        if (this.state.currentSlideIndex < 1) {
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
      style={[
        styles.menuCategoryHeaderTextContainer,
        {
          alignItems: this.state.showText ? 'flex-start' : 'center'
        }
      ]}
    >
      <Text
        style={[styles.transparent, styles.listHeaderText]}
        numberOfLines={1}
      >
        {section.title}
      </Text>
    </View>
  );

  render() {
    const animatedHeader = this.scrollAnimatedValue.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [headerHeight, 0],
      extrapolate: 'clamp'
    });

    const animatedOpacity = this.scrollAnimatedValue.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [1, 0]
    });

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../../assets/images/photo_back.jpg')}
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
            paddingHorizontal: wp('4%'),
            position: 'absolute',
            top:
              Header.HEIGHT +
              Constants.statusBarHeight -
              (Platform.OS === 'ios' ? 20 : 0),
            left: 0,
            right: 0,
            zIndex: 99
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
                <Feather name="package" size={wp('6.4%')} color="white" />
                <Text style={[styles.transparent, styles.headerContentText]}>
                  Delivery
                </Text>
              </View>
              <View style={styles.headerContentTextContainer}>
                <Feather name="clock" size={wp('6.4%')} color="white" />
                <Text style={[styles.transparent, styles.headerContentText]}>
                  8 Mins Wait Time
                </Text>
              </View>
            </View>
          </View>

          {(() => {
            if (this.props.data.data) {
              if(
                this.props.navigation.state.params.item.menu &&
                this.props.navigation.state.params.item.menu.categories &&
                this.props.navigation.state.params.item.menu.categories.length >
                  0
              ) {
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
                          styles.headerBtns,
                          {
                            left: this.state.showText ? null : 0,
                            right: this.state.showText ? 0 : null
                          }
                        ]}
                      >
                        <LinearGradient
                          colors={['#707070', '#1E1E1E']}
                          style={[styles.linearGradientBtn]}
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
                    <Text style={styles.message}>Doesn't have items.</Text>
                  </View>
                );
              } else if (!this.props.navigation.state.params.item.menu) {
                return (
                  <View style={styles.messageHolder}>
                    <Text style={styles.message}>Doesn't have menu.</Text>
                  </View>
                );
              }
              return (
                <AnimatedSectionList
                  bounces={false}
                  stickySectionHeadersEnabled
                  SectionSeparatorComponent={({ leadingItem }) =>
                    leadingItem ? (
                      <View
                        style={{
                          paddingBottom: !this.state.showText
                            ? wp('3.33%')
                            : wp('12.4%')
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          paddingBottom: wp('3.33%')
                        }}
                      />
                    )
                  }
                  ItemSeparatorComponent={() =>
                    <View
                      style={{
                        paddingBottom: this.state.showText
                          ? wp('8.8%')
                          : wp('9.4%')
                      }}
                    />
                  }
                  keyExtractor={item => item._id.toString()}
                  onScroll={Animated.event([
                    {
                      nativeEvent: {
                        contentOffset: { y: this.scrollAnimatedValue }
                      }
                    }]
                  )}
                  style={{
                    // paddingTop: wp('5.33%'),
                    marginBottom: !this.state.showText
                      ? -wp('5.33%')
                      : -wp('14.4%')
                  }}
                  contentContainerStyle={{
                    paddingBottom: !this.state.showText
                      ? wp('5.33%')
                      : wp('14.4%'),
                    paddingTop: headerHeight,
                    paddingHorizontal: wp('4%')
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
                <ActivityIndicator size="large" color="white" />
              </View>
            );
          })()}
        </View>

        {this.renderFooter()}

        {this.state.modalVisible ? (
          <CustomPopup
            modalVisible={this.state.modalVisible}
            title="Congratulations!"
            message="Please show the table code to your server.!"
            otherInfo="9192"
            image={require('../../../../assets/images/custom_modal_icons/thumbs_up_icon.png')}
            onDismiss={() => {
              this.setState({ modalVisible: false });
            }}
          />
        ) : null}

        {(() => {
          if(this.props.data.data) {
            return (
              <Checkout
                ref={modal => (this.modal = modal)}
                setCurrentIndex={index => this.setIndex(index)}
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
        <LoadingComponent visible={this.props.isBusy} />
      </View>
    );
  }
}

const buttonStyles = {
  placeOrderBtn: {
    backgroundColor: '#2ED573',
    borderColor: '#0DD24A',
    width: wp('40%'),
    height: wp('9.86%'),
    justifyContent: 'center',
    borderRadius: 8
  },
  btnText: {
    fontSize: wp('3.73%'),
    fontFamily: FONT_FAMILY_MEDIUM,
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
  changeItemRating: PropTypes.func.isRequired,
  isBusy: PropTypes.bool.isRequired
};
