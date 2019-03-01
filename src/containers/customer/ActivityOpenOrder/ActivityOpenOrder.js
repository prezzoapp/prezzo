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

import {
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE,
  SF_PRO_TEXT_BOLD,
  TAX,
  TIME_OUT
} from '../../../services/constants';

import { showAlertWithMessage } from '../../../services/commonFunctions';

class ActivityOpenOrder extends Component {
  constructor(props) {
    super(props);

    this.state = { isFetching: false }

    this.timer = -1;

    props.navigation.setParams({
      onTabFocus: this.listOpenOrders
    });
  }

  componentDidMount() {
    this.props.listOpenOrders(this.props.userId, 'pending')
      .then(() => {})
      .catch(err => {
        showAlertWithMessage('Uh-oh!', err);
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
            this.setState({ isFetching: false }, () => {
              showAlertWithMessage('Uh-oh!', err);
            });
        });
      }
    );
  }

  finalizeOrder(price) {
    const data = this.props.data.first();
    if(data.get('paymentType') === 'card' && price !== 0) {
      this.props.makePaymentAndCompleteOrder(
          data.get('_id'),
          data.getIn(['paymentMethod', 'token']),
          price
        )
        .then(() => {
          if(this.props.openOrderFinalStatus === 'complete') {
            showAlertWithMessage('Success', {
              message: 'Order has been completed.'
            });
          }
        })
        .catch(err => showAlertWithMessage('Uh-oh!', err));
    } else if(data.get('paymentType') === 'card') {
      this.props.makePaymentAndCompleteOrder(data.get('_id'), '', price)
        .then(() => {
          if(this.props.openOrderFinalStatus === 'complete') {
            showAlertWithMessage('Success', {
              message: 'Order has been completed.'
            });
          }
        })
        .catch(err => showAlertWithMessage('Uh-oh!', err));
    } else {
      this.props
        .makePaymentAndCompleteOrder(data.get('_id'), '', price, 'cash')
        .then(() => {
          if (this.props.openOrderFinalStatus === 'complete') {
            showAlertWithMessage('Success', {
              message: 'Order has been completed.'
            });
          }
        })
        .catch(err => showAlertWithMessage('Uh-oh!', err));
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
          showAlertWithMessage('Info', {
            message: 'This order has been already completed.'
          });
        } else if (
          this.props.openOrderFinalStatus &&
          this.props.openOrderFinalStatus === 'denied'
        ) {
          // If order has been already denied.

          showAlertWithMessage('Info', {
            message: 'This order has been already denied.'
          });
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
      .catch(err => showAlertWithMessage('Uh-oh!', err));
  }

  checkStatusAndCancelItem(orderId, eleId) {
    this.props
      .checkStatusAndCancelItem(orderId, eleId)
      .then(() => {
        const data = this.props.data.first();
        if(this.props.openOrderFinalStatus === 'complete') {
          showAlertWithMessage('Success', {
            message: 'Order has been completed.'
          });
        } else {
          const item = this.props.data[0].items.find(ele => ele._id === eleId);
          console.log(item);
          if(item) {
            if(item.status === 'denied') {
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
      .catch(err => showAlertWithMessage('Uh-oh!', err));
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

  renderHeader = () => {
    const data = this.props.data;
    if (data.size !== 0 && data.first().get('items').size !== 0) {
      return (
        <View style={styles.listHeaderHolder}>
          <Text style={styles.tableCode}>Table 9192</Text>
        </View>
      );
    }
    return null;
  }
  renderItem = data => {
    const order = this.props.data.first();
    return (
      <ActivityListItem
        item={data.item}
        innerTab="open"
        checkStatusAndCancelItem={itemId =>
          this.checkStatusAndCancelItem(order.get('_id'), itemId)
        }
      />
    );
  };

  render() {
    const data = this.props.data;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <FlatList
            ListEmptyComponent={this.listEmptyComponent}
            contentContainerStyle={[
              styles.flatListContentContainerStyle,
              {
                justifyContent:
                  data &&
                  data.size !== 0 &&
                  data.first().get('items').size !== 0
                    ? null
                    : 'center'
              }
            ]}
            keyExtractor={item => item.get('_id').toString()}
            showsVerticalScrollIndicator={false}
            data={
              data && data.size !== 0
                ? data.first().get('items').toArray()
                : []
            }
            renderItem={this.renderItem}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            ListHeaderComponent={this.renderHeader}
            stickyHeaderIndices={[0]}
          />
          {(() => {
            if (data &&
              data.size !== 0 &&
              data.first().get('items').size !== 0
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
                    onPress={() => this.completeOrder(data.first().get('_id'))}
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
  data: PropTypes.object.isRequired,
  listOpenOrders: PropTypes.func.isRequired
};

export default ActivityOpenOrder;
