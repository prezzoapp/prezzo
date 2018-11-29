import React, { Component } from 'react';
import { View, FlatList, Text, Alert, NetInfo } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import PropTypes from 'prop-types';

import styles from './styles';
import ActivityListItem from '../../../components/ActivityListItem';
import Button from '../../../components/Button';
import LoadingComponent from '../../../components/LoadingComponent';

import {
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE,
  TAX
} from '../../../services/constants';

class ActivityOpenOrder extends Component {
  constructor() {
    super();

    this.state = { isFetching: false }

    this.timer = -1;

    this.connectionStatus = null;
  }

  componentWillMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange
    );

    NetInfo.isConnected.fetch().done(isConnected => {
      if(isConnected) {
        this.connectionStatus = isConnected;
      } else {
        this.connectionStatus = isConnected;
      }
    });
  }

  componentDidMount() {
    this.props.listOpenOrders(this.props.userId, 'pending');
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange
    );
  }

  onRefresh() {
    console.log(this.props.data.order[0].status);
    this.setState(() => {
        return {
          isFetching: true
        }
      },
      () => {
        this.props.listOpenOrders(this.props.userId, 'pending').then(() => {
        this.setState(() => {
            return {
              isFetching: false
            };
          });
        });
      }
    );
  }

  _handleConnectivityChange = isConnected => {
    if(isConnected) {
      this.connectionStatus = isConnected;
    } else {
      this.connectionStatus = isConnected;
    }
  }

  finalizeOrder(price) {
    if(this.props.data.order[0].paymentType === 'card' && price !== 0) {
      this.props.makePaymentAndCompleteOrder(
        this.props.data.order[0]._id,
        this.props.data.order[0].paymentMethod.token,
        price
      )
    } else if(this.props.data.order[0].paymentType === 'card') {
      this.props.makePaymentAndCompleteOrder(
        this.props.data.order[0]._id,
        '',
        price
      )
    } else {
      this.props.makePaymentAndCompleteOrder(
        this.props.data.order[0]._id,
        '',
        price,
        'cash'
      )
    }
  }

  completeOrder(id) {
    if(this.isConnected === false) {
      Alert.alert(
        '',
        'Network not available',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel'
          },
          {
            text: 'OK', onPress: () => null
          }
        ],
        { cancelable: false }
      );
    } else {
      this.props
        .checkOrderStatus(id)
        .then(() => {
          if (
            this.props.data.finalStatus &&
            this.props.data.finalStatus === 'complete'
          ) {
            // If order has been already completed.

            clearTimeout(this.timer);

            this.timer = setTimeout(() => {
              alert(this.props.data.message);
            }, 300);
          } else if (
            this.props.data.finalStatus &&
            this.props.data.finalStatus === 'denied'
          ) {
            // If order has been already denied.

            clearTimeout(this.timer);

            this.timer = setTimeout(() => {
              alert(this.props.data.message);
            }, 300);
          } else {
            clearTimeout(this.timer);
            let pendingItems = 0;
            let price = 0;

            this.props.data.order[0].items.filter(item => {
              if(item.status === 'pending') {
                pendingItems += 1;
              } else if(item.status !== 'denied') {
                price += item.price;
              }
            });

            price = parseFloat(((price * TAX) / 100 + price).toFixed(2));

            const message =
              pendingItems === 0
                ? this.props.data.order[0].paymentType === 'card'
                  ? `Continue to pay $${price}`
                  : 'Are you sure you want to complete?'
                : this.props.data.order[0].paymentType === 'card'
                  ? price === 0
                    ? `You have ${pendingItems} pending item(s). Are you sure you want to cancel them?`
                    : `You have ${pendingItems} pending item(s). Are you sure you want to cancel them and pay $${price}?`
                  : `You have ${pendingItems} pending item(s). Are you sure you want to cancel them and complete order?`

            this.timer = setTimeout(() => {
              Alert.alert(
                '',
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
  }

  checkStatusAndCancelItem(orderId, itemId) {
    this.props
      .checkStatusAndCancelItem(orderId, itemId)
      .then(result => {
        if (this.props.data.message && this.props.isBusy === false) {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            alert(this.props.data.message);
          }, 300);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderHeader() {
    return <Text style={styles.tableCode}>Table 9192</Text>;
  }

  render() {
    const subTotal =
      this.props.data.order && (this.props.data.order.length !== 0
        ? this.props.data.order[0].items
            .map(item => item.price)
            .reduce((previous, next) => {
              return parseFloat(previous + next);
            })
        : 0);

    return (
      <View style={styles.container}>
        {(() => {
          if (this.props.data.order && this.props.data.order.length === 0) {
            return (
              <View style={styles.notFoundHolder}>
                <Text style={styles.message}>
                  No pending order. You can create new one.
                </Text>
              </View>
            )
          }
          return (
            <View style={{ flex: 1 }}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                data={
                  this.props.data.order && this.props.data.order.length !== 0
                    ? this.props.data.order[0].items
                    : []
                }
                renderItem={({ item }) => (
                  <ActivityListItem
                    item={item}
                    orderId={
                      this.props.data.order && this.props.data.order[0]._id
                    }
                    checkStatusAndCancelItem={(orderId, itemId) =>
                      this.checkStatusAndCancelItem(orderId, itemId)
                    }
                  />
                )}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching}
                ListHeaderComponent={this.renderHeader}
                stickyHeaderIndices={[0]}
              />
              <View style={styles.footerContainer}>
                <Button
                  style={buttonStyles.callWaiterBtn}
                  textStyle={buttonStyles.callWaiterBtnText}
                  onPress={() => null}
                >
                  Call Waiter
                </Button>

                <Button
                  style={buttonStyles.closeTableBtn}
                  textStyle={buttonStyles.closeTableBtnText}
                  onPress={() =>
                    this.completeOrder(this.props.data.order[0]._id)
                  }
                >
                  Close Table
                </Button>
              </View>
            </View>
          );
        })()}

        {this.props.isBusy && <LoadingComponent />}
      </View>
    );
  }
}

const buttonStyles = {
  callWaiterBtn: {
    backgroundColor: '#2ED573',
    borderColor: '#0DD24A',
    width: wp('37.33%'),
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 8
  },

  callWaiterBtnText: {
    fontSize: wp('3.46%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  },

  closeTableBtn: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: wp('37.33%'),
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: hp('1%')
  },

  closeTableBtnText: {
    fontSize: wp('5.33%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: 'rgba(255,255,255,0.5)',
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
};

ActivityOpenOrder.propTypes = {
  data: PropTypes.object.isRequired,
  listOpenOrders: PropTypes.func.isRequired
};

export default ActivityOpenOrder;
