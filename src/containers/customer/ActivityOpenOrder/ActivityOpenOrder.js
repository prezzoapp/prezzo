import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
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
  TAX
} from '../../../services/constants';

import {
  showAlertWithMessage,
  manuallyLogout
} from '../../../services/commonFunctions';

let disableBtn = false;

class ActivityOpenOrder extends Component {
  constructor(props) {
    super();
    this.state = { isFetching: false };
  }

  componentDidMount() {
    console.log('User activity component mounted!');
    this.props.listOpenOrders(this.props.userId, 'pending')
      .then(() => {})
      .catch(err => {
        if(err.code === 401) {
          manuallyLogout(err, () => this.props.userLogout());
        } else {
          showAlertWithMessage('Uh-oh!', err)
        }
      })
      .finally(() => {
        this.props.navigation.setParams({
          onTabFocus: this.listOpenOrders
        });
      });
  }

  listOpenOrders = () => {
    this.props.listOpenOrders(this.props.userId, 'pending')
      .then(() => {})
      .catch(err => {
        if(err.code === 401) {
          manuallyLogout(err, () => this.props.userLogout());
        } else {
          showAlertWithMessage('Uh-oh!', err)
        }
      });
  };

  onRefresh() {
    this.setState(() => {
        return {
          isFetching: true
        }
      },
      () => {
        disableBtn = true;
        this.props
          .listOpenOrders(this.props.userId, 'pending')
          .then(() => {
            this.setState({ isFetching: false }, () => {
              disableBtn = false;
            });
          })
          .catch(err => {
            if(err.code === 401) {
              this.setState({ isFetching: false }, () => {
                manuallyLogout(err, () => this.props.userLogout());
              });
            } else {
              this.setState({ isFetching: false }, () => {
                showAlertWithMessage('Uh-oh!', err, () => {
                  disableBtn = false;
                });
              });
            }
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
          price,
          'card'
        )
        .then(() => {
          if(this.props.openOrderFinalStatus === 'complete') {
            showAlertWithMessage(
              'Success',
              {
                message: 'Order has been completed.'
              },
              () => {
                disableBtn = false;
              }
            );
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
    } else if(data.get('paymentType') === 'card') {
      this.props.makePaymentAndCompleteOrder(data.get('_id'), '', price, 'card')
        .then(() => {
          if(this.props.openOrderFinalStatus === 'complete') {
            showAlertWithMessage(
              'Success',
              {
                message: 'Order has been completed.'
              },
              () => {
                disableBtn = false;
              }
            );
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
    } else {
      this.props
        .makePaymentAndCompleteOrder(data.get('_id'), '', price, 'cash')
        .then(() => {
          if (this.props.openOrderFinalStatus === 'complete') {
            showAlertWithMessage(
              'Success',
              {
                message: 'Order has been completed.'
              },
              () => {
                disableBtn = false;
              }
            );
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

  completeOrder(id) {
    if(disableBtn === false) {
      disableBtn = true;
      const data = this.props.data.first();
      this.props
        .checkOrderStatus(id)
        .then(() => {
          const openOrderFinalStatus = this.props.openOrderFinalStatus;
          if (
            openOrderFinalStatus &&
            openOrderFinalStatus === 'complete'
          ) {
            // If order has been already completed.
            showAlertWithMessage('Info', {
              message: 'Order has been already completed.'
            });
          } else if (
            openOrderFinalStatus &&
            openOrderFinalStatus === 'denied'
          ) {
            // If order has been already denied.

            showAlertWithMessage('Info', {
              message: 'Order has been already denied.'
            });
          } else {
            let pendingItems = 0;
            let price = 0;

            data.get('items').map(item => {
              if(item.get('status') === 'pending') {
                pendingItems += 1;
              } else if(item.get('status') !== 'denied') {
                price += item.get('price');
              }
            });

            price = parseFloat(((price * TAX) / 100 + price).toFixed(2));

            const message =
              pendingItems === 0
                ? data.get('paymentType') === 'card'
                  ? `Continue to pay $${price}`
                  : 'Are you sure you want to complete?'
                : data.get('paymentType') === 'card'
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
          const item = data.get('items').find(ele => ele.get('_id') === eleId);
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
  userId: PropTypes.string.isRequired,
  openOrderFinalStatus: PropTypes.string.isRequired,
  listOpenOrders: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
  makePaymentAndCompleteOrder: PropTypes.func.isRequired,
  checkOrderStatus: PropTypes.func.isRequired,
  checkStatusAndCancelItem: PropTypes.func.isRequired
};

export default ActivityOpenOrder;
