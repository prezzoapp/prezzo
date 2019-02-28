import React, { Component } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import PropTypes from 'prop-types';

import styles from './styles';
import ActivityListItem from '../../../components/ActivityListItem';
import Button from '../../../components/Button';
import showGenericAlert from '../../../components/GenericAlert';

import {
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE,
  SF_PRO_TEXT_BOLD,
  TAX,
  NETWORK_REQUEST_FAILED,
  INTERNET_NOT_CONNECTED,
  TIME_OUT
} from '../../../services/constants';

class ActivityOpenOrder extends Component {
  constructor() {
    super();

    this.state = { isFetching: false }

    this.timer = -1;
  }

  componentDidMount() {
    this.props.listOpenOrders(this.props.userId, 'pending')
      .then(() => {})
      .catch(err => {
        if(err.message === NETWORK_REQUEST_FAILED) {
          this.showAlert('Uh-oh!', INTERNET_NOT_CONNECTED, TIME_OUT);
        } else {
          this.showAlert('Uh-oh!', err.message, TIME_OUT);
        }
      });
  }

  onRefresh() {
    this.setState(() => {
        return {
          isFetching: true
        }
      },
      () => {
        this.props
          .listOpenOrders(this.props.userId, 'pending')
          .then(() => {
            this.setState({ isFetching: false });
          })
          .catch(err => {
            if (err.message === NETWORK_REQUEST_FAILED) {
              this.setState({ isFetching: false }, () => {
                this.showAlert('Uh-oh!', INTERNET_NOT_CONNECTED, TIME_OUT);
              });
            } else {
              this.setState({ isFetching: false }, () => {
                this.showAlert('Uh-oh!', err.message, TIME_OUT);
              });
            }
        });
      }
    );
  }

  showAlert(title, message, duration) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      showGenericAlert(title, message);
    }, duration);
  }

  finalizeOrder(price) {
    if(this.props.data[0].paymentType === 'card' && price !== 0) {
      this.props.makePaymentAndCompleteOrder(
          this.props.data[0]._id,
          this.props.data[0].paymentMethod.token,
          price
        )
        .then(() => {
          if(this.props.openOrderFinalStatus === 'complete') {
            this.showAlert('Success', 'Order has been completed.', TIME_OUT);
          }
        })
        .catch(err => {
          if(err.message === NETWORK_REQUEST_FAILED) {
            this.showAlert('Uh-oh!', INTERNET_NOT_CONNECTED, TIME_OUT);
          } else {
            this.showAlert('Uh-oh!', err.message, TIME_OUT);
          }
        });
    } else if(this.props.data[0].paymentType === 'card') {
      this.props.makePaymentAndCompleteOrder(this.props.data[0]._id, '', price)
        .then(() => {
          if(this.props.openOrderFinalStatus === 'complete') {
            this.showAlert('Success', 'Order has been completed.', TIME_OUT);
          }
        })
        .catch(err => {
          if(err.message === NETWORK_REQUEST_FAILED) {
            this.showAlert('Uh-oh!', INTERNET_NOT_CONNECTED, TIME_OUT);
          } else {
            this.showAlert('Uh-oh!', err.message, TIME_OUT);
          }
        });
    } else {
      this.props
        .makePaymentAndCompleteOrder(this.props.data[0]._id, '', price, 'cash')
        .then(() => {
          if (this.props.openOrderFinalStatus === 'complete') {
            this.showAlert('Success', 'Order has been completed.', TIME_OUT);
          }
        })
        .catch(err => {
          if(err.message === NETWORK_REQUEST_FAILED) {
            this.showAlert('Uh-oh!', INTERNET_NOT_CONNECTED, TIME_OUT);
          } else {
            this.showAlert('Uh-oh!', err.message, TIME_OUT);
          }
        });
    }
  }

  completeOrder(id) {
    this.props
      .checkOrderStatus(id)
      .then(() => {
        if (
          this.props.openOrderFinalStatus &&
          this.props.openOrderFinalStatus === 'complete'
        ) {
          // If order has been already completed.

          this.showAlert('Info', 'This order has been already completed.', TIME_OUT);
        } else if (
          this.props.openOrderFinalStatus &&
          this.props.openOrderFinalStatus === 'denied'
        ) {
          // If order has been already denied.

          this.showAlert('Info', 'This order has been already denied.', TIME_OUT);
        } else {
          clearTimeout(this.timer);
          let pendingItems = 0;
          let price = 0;

          this.props.data[0].items.filter(item => {
            if(item.status === 'pending') {
              pendingItems += 1;
            } else if(item.status !== 'denied') {
              price += item.price;
            }
          });

          price = parseFloat(((price * TAX) / 100 + price).toFixed(2));

          const message =
            pendingItems === 0
              ? this.props.data[0].paymentType === 'card'
                ? `Continue to pay $${price}`
                : 'Are you sure you want to complete?'
              : this.props.data[0].paymentType === 'card'
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
          }, TIME_OUT);
        }
      })
      .catch(err => {
        if(err.message === NETWORK_REQUEST_FAILED) {
          this.showAlert('Uh-oh!', INTERNET_NOT_CONNECTED, TIME_OUT);
        } else {
          this.showAlert('Uh-oh!', err.message, TIME_OUT);
        }
      });
  }

  checkStatusAndCancelItem(orderId, eleId) {
    this.props
      .checkStatusAndCancelItem(orderId, eleId)
      .then(() => {
        if(this.props.openOrderFinalStatus === 'complete') {
          this.showAlert('Success', 'Order has been completed.', TIME_OUT);
        } else {
          const item = this.props.data[0].items.find(ele => ele._id === eleId);
          if(item) {
            if(item.status === 'denied') {
              this.showAlert(
                'Success',
                'Item has been successfully canceled.',
                TIME_OUT
              );
            } else {
              this.showAlert('Info', "Item can't be canceled.", TIME_OUT);
            }
          }
        }
      })
      .catch(err => {
        if(err.message === NETWORK_REQUEST_FAILED) {
          this.showAlert('Uh-oh!', INTERNET_NOT_CONNECTED, TIME_OUT);
        } else {
          this.showAlert('Uh-oh!', err.message, TIME_OUT);
        }
      });
  }

  listEmptyComponent() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.message}>
          No pending order. You can create new one!
        </Text>
      </View>
    );
  }

  renderHeader(data) {
    if (data.length !== 0 && data[0].items.length !== 0) {
      return (
        <View style={styles.listHeaderHolder}>
          <Text style={styles.tableCode}>Table 9192</Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <FlatList
            ListEmptyComponent={this.listEmptyComponent}
            contentContainerStyle={[
              styles.flatListContentContainerStyle,
              {
                justifyContent:
                  this.props.data &&
                  this.props.data.length !== 0 &&
                  this.props.data[0].items.length !== 0
                    ? null
                    : 'center'
              }
            ]}
            keyExtractor={item => item._id.toString()}
            showsVerticalScrollIndicator={false}
            data={
              this.props.data && this.props.data.length !== 0
                ? this.props.data[0].items
                : []
            }
            renderItem={({ item }) => (
              <ActivityListItem
                item={item}
                innerTab="open"
                orderId={this.props.data && this.props.data[0]._id}
                checkStatusAndCancelItem={(orderId, itemId) =>
                  this.checkStatusAndCancelItem(orderId, itemId)
                }
              />
            )}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            ListHeaderComponent={() => this.renderHeader(this.props.data)}
            stickyHeaderIndices={[0]}
          />
          {(() => {
            if (this.props.data &&
              this.props.data.length !== 0 &&
              this.props.data[0].items.length !== 0
            ) {
              return (
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
                    onPress={() => this.completeOrder(this.props.data[0]._id)}
                  >
                    Close Table
                  </Button>
                </View>
              );
            }
            return null;
          })()}
        </View>
      </View>
    );
  }
}

const buttonStyles = {
  callWaiterBtn: {
    backgroundColor: '#2ED573',
    borderColor: '#0DD24A',
    width: wp('37.33%'),
    height: wp('10.66%'),
    justifyContent: 'center',
    borderRadius: wp('2.66%')
  },

  callWaiterBtnText: {
    fontSize: wp('3.46%'),
    fontFamily: SF_PRO_TEXT_BOLD,
    color: COLOR_WHITE,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  },

  closeTableBtn: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: wp('37.33%'),
    height: wp('10.66%'),
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
  data: PropTypes.array.isRequired,
  listOpenOrders: PropTypes.func.isRequired
};

export default ActivityOpenOrder;
