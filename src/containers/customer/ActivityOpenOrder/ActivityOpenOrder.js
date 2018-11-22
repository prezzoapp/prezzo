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
import LoadingComponent from '../../../components/LoadingComponent';

import {
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE
} from '../../../services/constants';

const TAX = 5.95;

class ActivityOpenOrder extends Component {
  constructor() {
    super();

    this.state = { isFetching: false }

    this.timer = -1;
  }

  componentDidMount() {
    this.hitAPI();
  }

  onRefresh() {
    this.setState(() => {
        return {
          isFetching: true
        }
      },
      () => {
        this.hitAPI();
        this.setState(() => {
          return {
            isFetching: false
          }
        });
      }
    );
  }

  hitAPI() {
    this.props.listOpenOrders(this.props.userId, 'pending');
  }

  finalizeOrder(price) {
    if(this.props.data.order[0].paymentType === 'card') {
      this.props.makePaymentAndCompleteOrder(
        this.props.data.order[0]._id,
        this.props.data.order[0].paymentMethod.token,
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

  completeOrder(id, status) {
    this.props.checkOrderStatus(id, status).then(() => {
        if (this.props.data.message && this.props.isBusy === false) {
          clearTimeout(this.timer);
          if(this.props.data.order[0].status !== 'complete') {
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

            this.timer = setTimeout(() => {
              Alert.alert(
                '',
                `You have ${pendingItems} pending item(s). Are you sure ${price}?`,
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
          } else {
            this.timer = setTimeout(() => {
              alert(this.props.data.message);
            }, 300);
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
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
                  this.props.data.order && this.props.data.order.length !== 0 ? this.props.data.order[0].items : []
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
                    this.completeOrder(
                      this.props.data.order[0]._id,
                      this.props.data.order[0].status
                    )
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
