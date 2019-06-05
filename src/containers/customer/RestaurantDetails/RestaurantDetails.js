import React, { Component } from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  Animated,
  InteractionManager,
  ActivityIndicator
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

import { LinearGradient, BlurView } from 'expo';

import { Feather } from '@expo/vector-icons';

import styles from './styles';
import RestaurantItem from '../../../components/RestaurantItem';
import LoadingComponent from '../../../components/LoadingComponent';
import Button from '../../../components/Button';
import { FONT_FAMILY_MEDIUM, COLOR_WHITE, TAX } from '../../../services/constants';
import {
  showAlertWithMessage,
  manuallyLogout
} from '../../../services/commonFunctions';
import Checkout from '../Checkout';
import CustomPopup from '../../../components/CustomPopup';
import CacheImage from '../../../components/CacheImage';
import Loader from '../../../components/Loader';

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
const headerHeight = wp('44.97%');
const checkoutModal = React.createRef();

let disableBtn = false;

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
      isSelectedPaymentType: false,
      showCheckoutView: false
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
    console.log('RestaurantDetails component mounted!');
    InteractionManager.runAfterInteractions(() => {
      this.props.addRestaurantDetail(this.props.navigation.state.params.item);
    });
  }

  componentWillUnmount() {
    console.log('RestaurantDetails component destroyed!');
    this.props.removeRestaurantDetail();
  }

  onPlaceOrderBtnClick() {
    console.log(this.state.currentSlideIndex);
    this.setState({
      showCheckoutView: true
    }, () => {
      checkoutModal.current.getWrappedInstance().showModal();
    });
  }

  hideCheckoutModal = () => {
    this.setState({
      showCheckoutView: false,
      currentSlideIndex: 0
    });
  }

  onOrderBtnClick() {
    if (
      checkoutModal.current &&
      this.state.currentSlideIndex >= 0 &&
      this.state.currentSlideIndex < 1
    ) {
      checkoutModal.current.getWrappedInstance().scrollForward();
    } else if (
      checkoutModal.current &&
      this.state.currentSlideIndex === 1 &&
      disableBtn === false
    ) {
      disableBtn = true;
      checkoutModal.current.getWrappedInstance().hideModal();
      this.attemptToCreateOrder();
    }
  }

  setIndex = index => {
    this.setState(() => {
      return {
        currentSlideIndex: index
      }
    });
  };

  attemptToCreateOrder() {
    const modifiedCartItems = [];
    const data = this.props.data.get('data');
    const cartItems =
      data && data.get('menu') &&
      data.getIn(['menu', 'categories'])
        .map(category =>
          category.get('data').map(d => d)
        )
        .reduce((a, v) => a.concat(v));

    cartItems.map(cart => {
      for (let i = 0; i < cart.get('quantity'); i++) {
       modifiedCartItems.push({
         title: cart.get('title'),
         description: cart.get('description'),
         status: 'pending',
         notes: cart.get('description'),
         price: cart.get('price'),
         rating: cart.get('rating'),
         imageURLs: cart.get('imageURLs')
       });
     }
    });

    this.props.createOrder(
        this.paymentMethodId,
        modifiedCartItems,
        this.props.type,
        this.selectedPaymentMethod,
        data.get('_id')
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
            disableBtn = false;
          }
        );
      })
      .catch(e => {
        showAlertWithMessage(
          'Uh-oh!',
          e,
          () => {
            disableBtn = false
          },
          e.code === 403
            ? [
                {
                  text: 'Take me to my order',
                  onPress: () => {
                    this.props.showLoadingWhileAnimatingScreen();
                    this.props.navigation.goBack();
                    InteractionManager.runAfterInteractions(() => {
                      this.props.navigate({ routeName: 'CustomerActivityNavigator' });
                      this.props.hideLoadingAfterScreenAnimationComplete();
                    });
                  }
                },
                {
                  text: 'Dismiss',
                  onPress: () => null
                }
              ]
            : [
                {
                  text: 'OK',
                  onPress: () => null
                }
              ]
        );
      });
  }

  isSelectedPaymentMethod = val => {
    if(val === '') {
      this.selectedPaymentMethod = '';
    } else if(val !== 'cash') {
      this.selectedPaymentMethod = 'card';
      this.paymentMethodId = val;
    } else {
      this.selectedPaymentMethod = val;
    }

    if(val === '' || val === 'add_new_card') {
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
  };

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

  listFooterComponent = () => {
    console.log(this.flag);
    if(this.flag === 1) {
      return <View style={{ height: wp('18.66%') }} />;
    }
    return null;
  };

  renderFooter() {
    const data = this.props.data.get('data');
    this.flag = 0;

    if(data) {
      const categories = data.getIn(['menu', 'categories']);
      const qtyArray = categories.map(category => {
        return category.get('data').map(item => {
          return item.get('quantity')
        })
      });
      const netQtyArray = qtyArray.map(item => item.reduce((prev,curr) => prev + curr));
      console.log(netQtyArray.toJS());
      const totalQty = netQtyArray.reduce((prev,curr) => prev + curr);

      console.log(totalQty);
      if(totalQty > 0) this.flag = 1;

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
                this.props.data.get('totalPrice') + TAX
              ).toFixed(2)}
            </Text>
          </View>
        );
      }
    }

    return null;
  }

  renderSectionHeader = data => (
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
        {data.section.title}
      </Text>
    </View>
  );

  renderItem = data => (
    <RestaurantItem
      item={data.item}
      section={data.section}
      showText={this.state.showText}
      addRemoveItemQuantity={(itemId, op) =>
        this.props.addRemoveItemQuantity(
          data.section._id,
          itemId,
          op
        )
      }
      changeItemRating={(itemId, rating) =>
        this.props.changeItemRating(data.section._id, itemId, rating)
      }
    />
  );

  sectionSeparator = data => {
    if(data.leadingItem) {
      return (
        <View
          style={{
            paddingBottom: !this.state.showText
              ? wp('3.33%')
              : wp('12.4%')
          }}
        />
      );
    }
    return (
      <View
        style={{
          paddingBottom: wp('3.33%')
        }}
      />
    );
  };

  itemSeparator = () => (
    <View
      style={{
        paddingBottom: this.state.showText
          ? wp('8.8%')
          : wp('9.4%')
      }}
    />
  );

  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const data = this.props.data.get('data');

    const animatedHeader = this.scrollAnimatedValue.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [headerHeight, 0],
      extrapolate: 'clamp'
    });

    const animatedOpacity = this.scrollAnimatedValue.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [1, 0]
    });

    const listStyle = {
      marginBottom: !this.state.showText
        ? -wp('5.33%')
        : -wp('14.4%')
    };

    const listContainerStyle = {
      paddingBottom: !this.state.showText
        ? wp('5.33%')
        : wp('14.4%'),
      paddingTop: headerHeight,
      paddingHorizontal: wp('4%')
    };

    const animatedHeaderStyle = [
      styles.animatedHeaderStyle, {
        height: animatedHeader,
        opacity: animatedOpacity
      }
    ];

    return (
      <View style={styles.container}>
        <CacheImage
          source={require('../../../../assets/images/photo_back.jpg')}
          type='backgroundImage'
          imageStyle={styles.photoBackImageStyle}
          style={styles.photoBack}>
          <LinearGradient
            colors={['transparent', 'black']}
            style={styles.LinearGradientStyle}
          />
        </CacheImage>

        <Animated.View
          style={animatedHeaderStyle}
        >
          <View style={styles.contentContainer}>
            <CacheImage
              source={this.props.navigation.state.params.item.avatarURL}
              style={styles.logo}
              type='image'
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
            if (data) {
              if(
                data.get('menu') &&
                data.getIn(['menu', 'categories']) &&
                data.getIn(['menu', 'categories']).size > 0
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
            if(data) {
              if (
                data.get('menu') &&
                data.getIn(['menu', 'categories']).size === 0
              ) {
                return(
                  <View style={styles.messageHolder}>
                    <Text style={styles.message}>Doesn't have items.</Text>
                  </View>
                );
              } else if (!data.get('menu')) {
                return (
                  <View style={styles.messageHolder}>
                    <Text style={styles.message}>Doesn't have menu.</Text>
                  </View>
                );
              }
              return (
                <AnimatedSectionList
                  stickySectionHeadersEnabled
                  SectionSeparatorComponent={this.sectionSeparator}
                  ItemSeparatorComponent={this.itemSeparator}
                  keyExtractor={item => item._id.toString()}
                  onScroll={Animated.event([
                    {
                      nativeEvent: {
                        contentOffset: { y: this.scrollAnimatedValue }
                      }
                    }]
                  )}
                  style={listStyle}
                  contentContainerStyle={listContainerStyle}
                  ListFooterComponent={this.listFooterComponent}
                  sections={
                    data.get('menu') &&
                    data.getIn(['menu', 'categories'])
                      ? data.getIn(['menu', 'categories']).toJS()
                      : []
                  }
                  renderSectionHeader={this.renderSectionHeader}
                  renderItem={this.renderItem}
                />
              );
            }
            return <Loader />;
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
            onDismiss={this.hideModal}
          />
        ) : null}

        {(() => {
          if(data && this.state.showCheckoutView) {
            return (
              <Checkout
                ref={checkoutModal}
                setCurrentIndex={this.setIndex}
                restaurantName={data.get('name')}
                showNextOrderBtn={this.showNextOrderBtn}
                hideNextOrderBtn={this.hideNextOrderBtn}
                hideCheckoutModal={this.hideCheckoutModal}
                isSelectedPaymentMethod={this.isSelectedPaymentMethod}
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
  isBusy: PropTypes.bool.isRequired,
  createOrder: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  userLogout: PropTypes.func.isRequired
};
