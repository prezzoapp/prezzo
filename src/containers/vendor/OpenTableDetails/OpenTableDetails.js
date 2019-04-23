import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  InteractionManager,
  ActivityIndicator,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';

import OpenOrdersList from '../../../components/OpenOrdersList';
import OpenTablePayment from '../../../components/OpenTablePayment';
import styles from './styles';
import CacheImage from '../../../components/CacheImage';
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

        <Image
          style={styles.headerImage}
          source={
            navigation.state.params.userImage === ''
              ? require('../../../../assets/images/etc/default-avatar.png')
              : {uri: navigation.state.params.userImage}
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

  finalizeOrder = price => {
    const order = this.props.openTableSelectedItem;
    if (
      order.get('paymentType') === 'card' &&
      price !== 0
    ) {
      this.props.makePaymentAndCompleteOrder(
          order.get('_id'),
          order.getIn(['paymentMethod', 'token']),
          price,
          'card'
        )
        .then(() => {
          if(this.props.openOrderFinalStatus === 'complete') {
            this.props.navigation.goBack();
            showAlertWithMessage('Success', {
              message: 'Order has been completed.'
            }, () => {
              disableBtn = false;
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
    } else if(order.get('paymentType') === 'card') {
      this.props.makePaymentAndCompleteOrder(
          order.get('_id'),
          '',
          price,
          'card'
        )
      .then(() => {
          if(this.props.openOrderFinalStatus === 'complete') {
            this.props.navigation.goBack();
            showAlertWithMessage('Success', {
              message: 'Order has been completed.'
            }, () => {
              disableBtn = false;
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
            }, () => {
              disableBtn = false;
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
  };

  completeOrder = id => {
    if(disableBtn === false) {
      disableBtn = true;
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

            this.props.navigation.goBack();
            showAlertWithMessage('Info', {
              message: 'Order has been already completed.'
            });
          } else if (
            openOrderFinalStatus &&
            openOrderFinalStatus === 'denied'
          ) {
            // If order has been already denied.

            this.props.navigation.goBack();
            showAlertWithMessage('Info', {
              message: 'Order has been already denied.'
            });
          } else {
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
  };

  renderTabBar = () => (
    <ScrollableTab
      style={styles.scrollableTabStyle}
      tabsContainerStyle={styles.tabsContainerStyle}
    />
  );

  render() {
    const selectedItem = this.props.openTableSelectedItem;

    return (
      <Container style={styles.container}>
      {selectedItem ? (
        <Tabs
          locked
          scrollWithoutAnimation
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          renderTabBar={this.renderTabBar}
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
              checkStatusAndCancelItem={this.checkStatusAndCancelItem}
              completeOrder={this.completeOrder}
              innerTab={this.props.navigation.state.params.innerTab}
            />
          </Tab>
          {this.props.navigation.state.params.innerTab !== 'queue' ? (
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
                completeOrder={this.completeOrder}
              />
            </Tab>
          ): null}
        </Tabs>
      ) : null}
      </Container>
    );
  }
}

OpenTableDetails.propTypes = {
  openTableItemDetails: PropTypes.func.isRequired,
  removeTableItemDetails: PropTypes.func.isRequired,
  openTableSelectedItem: PropTypes.object,
  makePaymentAndCompleteOrder: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  openOrderFinalStatus: PropTypes.string.isRequired,
  userLogout: PropTypes.func.isRequired,
  checkOpenOrderStatus: PropTypes.func.isRequired,
  checkStatusAndCancelItem: PropTypes.func.isRequired
};

OpenTableDetails.defaultProps = {
  openTableSelectedItem: null
};
