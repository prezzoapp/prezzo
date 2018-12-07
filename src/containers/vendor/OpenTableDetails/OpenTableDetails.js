import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Alert,
  InteractionManager,
  Text
} from 'react-native';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import OpenOrdersList from '../../../components/OpenOrdersList';
import OpenTablePayment from '../../../components/OpenTablePayment';
import styles from './styles';
import { Feather } from '../../../components/VectorIcons';
import { TAX } from '../../../services/constants';
import LoadingComponent from '../../../components/LoadingComponent';

export default class OpenTableDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Feather
            title="Add More"
            name="chevron-left"
            color="white"
            size={wp('8%')}
            style={styles.closeBtnIcon}
          />

          <Image
            style={{
              width: wp('11.73%'),
              height: wp('11.73%'),
              borderColor: 'white',
              marginLeft: 10,
              borderWidth: 2,
              borderRadius: wp('5.86%')
            }}
            source={
              navigation.state.params.userImage === ''
                ? require('../../../../assets/images/etc/default-avatar.png')
                : { uri: navigation.state.params.userImage }
            }
          />
        </View>
      </TouchableOpacity>
    ),
    title: navigation.state.params.userName,

    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#1F1F1F',
      borderBottomColor: 'transparent'
    }
  });

  static displayName = 'OpenTableDetails';

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.openTableItemDetails(this.props.navigation.state.params.item);
    });
  }

  showAlert(message, duration) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      Alert.alert('Prezzo', message);
    }, duration);
  }

  finalizeOrder(price) {
    if(this.props.openTableSelectedItem.paymentType === 'card' && price !== 0) {
      this.props.makePaymentAndCompleteOrder(
        this.props.openTableSelectedItem._id,
        this.props.openTableSelectedItem.paymentMethod.token,
          price
        )
      .then(() => {
          if(this.props.openOrderFinalStatus === 'complete') {
            this.showAlert('Order has been completed.', 300);
          }
        })
      .catch(e => console.log(e));
    } else if(this.props.openTableSelectedItem.paymentType === 'card') {
      this.props.makePaymentAndCompleteOrder(
          this.props.openTableSelectedItem._id,
          '',
          price
      )
      .then(() => {
          if(this.props.openOrderFinalStatus === 'complete') {
            this.showAlert('Order has been completed.', 300);
          }
        })
        .catch(e => console.log(e));
    } else {
      this.props.makePaymentAndCompleteOrder(
          this.props.openTableSelectedItem._id,
          '',
          price,
          'cash'
        )
        .then(() => {
          if(this.props.openOrderFinalStatus === 'complete') {
            this.showAlert('Order has been completed.', 300);
          }
        })
        .catch(e => console.log(e));
    }
  }

  completeOrder(id) {
    this.props
      .checkOpenOrderStatus(id)
      .then(() => {
        console.log(
          'Open Order final status: ',
          this.props.openOrderFinalStatus
        );
        if (
          this.props.openOrderFinalStatus &&
          this.props.openOrderFinalStatus === 'complete'
        ) {
          // If order has been already completed.

          this.showAlert('This order has been already completed.', 300);
        } else if (
          this.props.openOrderFinalStatus &&
          this.props.openOrderFinalStatus === 'denied'
        ) {
          // If order has been already denied.

          this.showAlert('This order has been already denied.', 300);
        } else {
          clearTimeout(this.timer);
          let pendingItems = 0;
          let price = 0;

          this.props.openTableSelectedItem.items.filter(item => {
            if(item.status === 'pending') {
              pendingItems += 1;
            } else if(item.status !== 'denied') {
              price += item.price;
            }
          });

          price = parseFloat(((price * TAX) / 100 + price).toFixed(2));

          const message =
            pendingItems === 0
              ? this.props.openTableSelectedItem.paymentType === 'card'
                ? `Continue to pay $${price}`
                : 'Are you sure you want to complete?'
              : this.props.openTableSelectedItem.paymentType === 'card'
                ? price === 0
                  ? `You have ${pendingItems} pending item(s). Are you sure you want to cancel them?`
                  : `You have ${pendingItems} pending item(s). Are you sure you want to cancel them and pay $${price}?`
                : `You have ${pendingItems} pending item(s). Are you sure you want to cancel them and complete order?`

          this.timer = setTimeout(() => {
            Alert.alert(
              'Prezzo',
              message,
              [
                {
                  text: 'Cancel',
                  onPress: () => null,
                  style: 'cancel'
                },
                {
                  text: 'OK', onPress: () => this.finalizeOrder(price)
                }
              ],
              { cancelable: false }
            );
          }, 300);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  checkStatusAndCancelItem = (orderId, itemId) => {
    this.props
      .checkStatusAndCancelItem(orderId, itemId)
      .then(() => {
        // console.log("Open Selected Item: ");
        // console.log(this.props.openTableSelectedItem);
        if(this.props.openOrderFinalStatus === 'complete') {
          this.showAlert('Order has been completed.', 300);
        } else {
          const item = this.props.openTableSelectedItem.items.find(item => item._id === itemId);
          if(item) {
            if(item.status === 'denied') {
              this.showAlert('Item has been successfully canceled.', 300);
            } else {
              this.showAlert("Item can't be canceled.", 300);
            }
          }
        }
        // if (this.props.openTableSelectedItem.message) {
        //   clearTimeout(this.timer);
        //   this.timer = setTimeout(() => {
        //     alert(this.props.openTableSelectedItem.message);
        //   }, 300);
        // }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const selectedItem = this.props.openTableSelectedItem;

    return (
      <Container style={styles.container}>
        {(() => {
          if(!selectedItem) {
            return (
              <View style={styles.notFoundHolder}>
                <Text style={styles.message}>Order has been completed.</Text>
              </View>
            )
          }

          return (
            <Tabs
              locked
              scrollWithoutAnimation
              tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
              renderTabBar={() => (
                <ScrollableTab
                  style={styles.scrollableTabStyle}
                  tabsContainerStyle={styles.tabsContainerStyle}
                />
              )}
            >
              <Tab
                heading="Order"
                tabStyle={styles.orderTabStyle}
                activeTabStyle={styles.orderTabStyle}
                textStyle={styles.orderTabTextStyle}
                activeTextStyle={styles.orderTabTextStyle}
                style={styles.tabStyle}
              >
                <OpenOrdersList
                  data={selectedItem}
                  checkStatusAndCancelItem={(orderId, itemId) =>
                    this.checkStatusAndCancelItem(orderId, itemId)
                  }
                  completeOrder={orderId => {
                    this.completeOrder(orderId)
                  }}
                  tabName="openOrder"
                />
              </Tab>
              <Tab
                heading="Payment"
                tabStyle={styles.paymentTabStyle}
                activeTabStyle={styles.paymentTabStyle}
                textStyle={styles.paymentTabTextStyle}
                activeTextStyle={styles.paymentTabTextStyle}
                style={styles.tabStyle}
              >
                <OpenTablePayment
                  data={selectedItem}
                  tabName="payment"
                  makePaymentAndCompleteOrder={(
                    order,
                    token,
                    amount,
                    paymentType,
                    status
                  ) =>
                    this.props.navigation.state.params.makePaymentAndCompleteOrder(
                      order,
                      token,
                      amount,
                      paymentType,
                      status,
                      'open'
                    )
                  }
                  changeOrderStatus={(orderId, status) =>
                    this.props.navigation.state.params.changeOrderStatus(orderId, status)
                  }
                />
              </Tab>
            </Tabs>
          );
        })()}
      </Container>
    );
  }
}