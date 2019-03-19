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
import { TAX } from '../../../services/constants';
import {
  showAlertWithMessage,
  manuallyLogout
} from '../../../services/commonFunctions';

let disableBtn = false;

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
        .catch(e => {
          if(e.code === 401) {
            manuallyLogout(e, () => this.props.userLogout());
          } else {
            showAlertWithMessage('Uh-oh!', e, () => {
              disableBtn = false;
            });
          }
        });
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
        .catch(e => {
          if(e.code === 401) {
            manuallyLogout(e, () => this.props.userLogout());
          } else {
            showAlertWithMessage('Uh-oh!', e, () => {
              disableBtn = false;
            });
          }
        });
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
        .catch(e => {
          if(e.code === 401) {
            manuallyLogout(e, () => this.props.userLogout());
          } else {
            showAlertWithMessage('Uh-oh!', e, () => {
              disableBtn = false;
            });
          }
        });
    }
  }

  completeOrder(id) {
    if(disableBtn === false) {
      disableBtn = true;
      const order = this.props.openTableSelectedItem;
      this.props
        .checkOpenOrderStatus(id)
        .then(() => {
          if (
            this.props.openOrderFinalStatus &&
            this.props.openOrderFinalStatus === 'complete'
          ) {
            // If order has been already completed.

            this.props.navigation.goBack();
            showAlertWithMessage('Info', {
              message: 'Order has been already completed.'
            });
          } else if (
            this.props.openOrderFinalStatus &&
            this.props.openOrderFinalStatus === 'denied'
          ) {
            // If order has been already denied.

            this.props.navigation.goBack();
            showAlertWithMessage('Info', {
              message: 'Order has been already denied.'
            });
          } else {
            let pendingItems = 0;
            let price = 0;

            order.items.filter(item => {
              if(item.status === 'pending') {
                pendingItems += 1;
              } else if(item.status !== 'denied') {
                price += item.price;
              }
            });

            price = parseFloat(((price * TAX) / 100 + price).toFixed(2));

            const message =
              pendingItems === 0
                ? order.paymentType === 'card'
                  ? `Continue to pay $${price}`
                  : 'Are you sure you want to complete?'
                : order.paymentType === 'card'
                  ? price === 0
                    ? `You have ${pendingItems} pending item(s). Are you sure you want to cancel them?`
                    : `You have ${pendingItems} pending item(s). Are you sure you want to cancel them and pay $${price}?`
                  : `You have ${pendingItems} pending item(s). Are you sure you want to cancel them and complete order?`

            showAlertWithMessage(null, { message }, null, [
              {
                text: 'No',
                onPress: () => {
                  disableBtn = false;
                },
                style: 'cancel'
              },
              {
                text: 'Yes', onPress: () => this.finalizeOrder(price)
              }
            ]);
          }
        })
        .catch(err => {
          if(err.code === 401) {
            manuallyLogout(err, () => this.props.userLogout());
          } else {
            showAlertWithMessage('Uh-oh!', err, () => {
              disableBtn = false;
            });
          }
        });
    }
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
              showAlertWithMessage('Success', {
                message: 'Item has been successfully canceled.'
              });
            } else {
              showAlertWithMessage('Uh-oh!', {
                message: "Item can't be canceled."
              });
            }
          }
        }
      })
      .catch(err => {
        if(err.code === 401) {
          manuallyLogout(err, () => this.props.userLogout());
        } else {
          showAlertWithMessage('Uh-oh!', err);
        }
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
                    checkStatusAndCancelItem={itemId =>
                      this.checkStatusAndCancelItem(selectedItem.get('_id'), itemId)
                    }
                    completeOrder={() => {
                      this.completeOrder(selectedItem.get('_id'))
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
                          completeOrder={() => this.completeOrder(selectedItem.get('_id'))}
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
