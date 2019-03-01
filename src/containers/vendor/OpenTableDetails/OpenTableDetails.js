import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Alert,
  InteractionManager,
  ActivityIndicator,
  Text
} from 'react-native';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import OpenOrdersList from '../../../components/OpenOrdersList';
import OpenTablePayment from '../../../components/OpenTablePayment';
import styles from './styles';
import { Feather } from '../../../components/VectorIcons';
import { TAX, TIME_OUT } from '../../../services/constants';
import { showAlertWithMessage } from '../../../services/commonFunctions';

export default class OpenTableDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <View style={styles.customHeaderContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Feather
            title="Add More"
            name="chevron-left"
            color="white"
            size={wp('8%')}
          />
        </TouchableOpacity>

        <CacheImage
          style={styles.headerImage}
          type='image'
          source={
            navigation.state.params.userImage === ''
              ? require('../../../../assets/images/etc/default-avatar.png')
              : navigation.state.params.userImage
          }
        />
        <Text style={styles.headerText} numberOfLines={1}>
          {navigation.state.params.userName}
        </Text>
      </View>
    ),

    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#1F1F1F',
      borderBottomColor: '#2ED573',
      borderBottomWidth: 1,
      elevation: 0,
      height: hp('9%')
    }
  });

  static displayName = 'OpenTableDetails';

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.openTableItemDetails(this.props.navigation.state.params.item);
    });
  }

  componentWillUnmount() {
    this.props.removeTableItemDetails();
  }

  finalizeOrder(price) {
    const order = this.props.openTableSelectedItem;
    if (
      order.get('paymentType') === 'card' &&
      price !== 0
    ) {
      this.props.makePaymentAndCompleteOrder(
          order.get('_id'),
          order.getIn(['paymentMethod', 'token']),
          price
        )
      .then(() => {
          if(this.props.openOrderFinalStatus === 'complete') {
            this.props.navigation.goBack();
            showAlertWithMessage('Success', {
              message: 'Order has been completed.'
            });
          }
        })
        .catch(e => showAlertWithMessage(e));
    } else if(this.props.openTableSelectedItem.paymentType === 'card') {
      this.props.makePaymentAndCompleteOrder(
          order.get('_id'),
          '',
          price
        )
      .then(() => {
          if(this.props.openOrderFinalStatus === 'complete') {
            this.props.navigation.goBack();
            showAlertWithMessage('Success', {
              message: 'Order has been completed.'
            });
          }
        })
        .catch(e => showAlertWithMessage(e));
    } else {
      this.props.makePaymentAndCompleteOrder(
          order.get('_id'),
          '',
          price,
          'cash'
        )
        .then(() => {
          if(this.props.openOrderFinalStatus === 'complete') {
            this.props.navigation.goBack();
            showAlertWithMessage('Success', {
              message: 'Order has been completed.'
            });
          }
        })
        .catch(e => showAlertWithMessage('Uh-oh!', e));
    }
  }

  completeOrder(id) {
    const order = this.props.openTableSelectedItem;
    this.props
      .checkOpenOrderStatus(id)
      .then(() => {
        const openOrderFinalStatus = this.props.openOrderFinalStatus;
        if (
          openOrderFinalStatus &&
          openOrderFinalStatus === 'complete'
        ) {
          // If order has been already completed.
          showAlertWithMessage('Info', {
            message: 'This order has been already completed.'
          });
        } else if (
          openOrderFinalStatus &&
          openOrderFinalStatus === 'denied'
        ) {
          // If order has been already denied.

          showAlertWithMessage('Info', {
            message: 'This order has been already denied.'
          });
        } else {
          clearTimeout(this.timer);
          let pendingItems = 0;
          let price = 0;

          order.get('items').filter(item => {
            if(item.get('status') === 'pending') {
              pendingItems += 1;
            } else if(item.get('status') !== 'denied') {
              price += item.get('price');
            }
          });

          price = parseFloat(((price * TAX) / 100 + price).toFixed(2));

          const message =
            pendingItems === 0
              ? order.get('paymentType') === 'card'
                ? `Continue to pay $${price}`
                : 'Are you sure you want to complete?'
              : order.get('paymentType') === 'card'
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
          }, TIME_OUT);
        }
      })
      .catch(err => {
        showAlertWithMessage('Uh-oh!', err);
      });
  }

  checkStatusAndCancelItem = (orderId, itemId) => {
    this.props
      .checkStatusAndCancelItem(orderId, itemId)
      .then(() => {
        const order = this.props.openTableSelectedItem;
        if(this.props.openOrderFinalStatus === 'complete') {
          this.props.navigation.goBack();
          showAlertWithMessage('Success', {
            message: 'Order has been completed.'
          });
        } else {
          const item = order.get('items').find(item => item.get('_id') === itemId);
          if(item) {
            if(item.get('status') === 'denied') {
              this.showAlert('Item has been successfully canceled.', 300);
            } else {
              showAlertWithMessage('Uh-oh!', {
                message: "Item can't be canceled."
              });
            }
          }
        }
      })
      .catch(err => {
        showAlertWithMessage('Uh-oh!', err);
      });
  }

  render() {
    const selectedItem = this.props.openTableSelectedItem;

    return (
      <Container style={styles.container}>
        {(() => {
          if(selectedItem) {
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
                    completeOrder={() => {
                      this.completeOrder(selectedItem._id)
                    }}
                    innerTab={this.props.navigation.state.params.innerTab}
                  />
                </Tab>
                {(() => {
                  if(this.props.navigation.state.params.innerTab !== 'queue') {
                    return (
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
                          innerTab={this.props.navigation.state.params.innerTab}
                          completeOrder={() => this.completeOrder(selectedItem._id)}
                        />
                      </Tab>
                    );
                  }
                })()}
              </Tabs>
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
              <ActivityIndicator size="large" color="white"/>
            </View>
          );
        })()}
      </Container>
    );
  }
}
