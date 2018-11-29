import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Alert,
  InteractionManager
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

  finalizeOrder(price) {
    if(this.props.openTableSelectedItem.order[0].paymentType === 'card' && price !== 0) {
      this.props.makePaymentAndCompleteOrder(
        this.props.openTableSelectedItem.order[0]._id,
        this.props.openTableSelectedItem.order[0].paymentMethod.token,
        price
      )
    } else if(this.props.openTableSelectedItem.order[0].paymentType === 'card') {
      this.props.makePaymentAndCompleteOrder(
        this.props.openTableSelectedItem.order[0]._id,
        '',
        price
      )
    } else {
      this.props.makePaymentAndCompleteOrder(
        this.props.openTableSelectedItem.order[0]._id,
        '',
        price,
        'cash'
      )
    }
  }

  completeOrder(id) {
    this.props
      .checkOrderStatus(id)
      .then(() => {
        if (
          this.props.openTableSelectedItem.finalStatus &&
          this.props.openTableSelectedItem.finalStatus === 'complete'
        ) {
          // If order has been already completed.

          clearTimeout(this.timer);

          this.timer = setTimeout(() => {
            alert(this.props.openTableSelectedItem.message);
          }, 300);
        } else if (
          this.props.openTableSelectedItem.finalStatus &&
          this.props.openTableSelectedItem.finalStatus === 'denied'
        ) {
          // If order has been already denied.

          clearTimeout(this.timer);

          this.timer = setTimeout(() => {
            alert(this.props.openTableSelectedItem.message);
          }, 300);
        } else {
          clearTimeout(this.timer);
          let pendingItems = 0;
          let price = 0;

          this.props.openTableSelectedItem.order[0].items.filter(item => {
            if(item.status === 'pending') {
              pendingItems += 1;
            } else if(item.status !== 'denied') {
              price += item.price;
            }
          });

          price = parseFloat(((price * TAX) / 100 + price).toFixed(2));

          const message =
            pendingItems === 0
              ? this.props.openTableSelectedItem.order[0].paymentType === 'card'
                ? `Continue to pay $${price}`
                : 'Are you sure you want to complete?'
              : this.props.openTableSelectedItem.order[0].paymentType === 'card'
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

  checkStatusAndCancelItem = (orderId, itemId) => {
    this.props
      .checkStatusAndCancelItem(orderId, itemId)
      .then(result => {
        if (this.props.openTableSelectedItem.message) {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            alert(this.props.openTableSelectedItem.message);
          }, 300);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const selectedItem = this.props.openTableSelectedItem;

    return (
      <Container style={styles.container}>
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
      </Container>
    );
  }
}
