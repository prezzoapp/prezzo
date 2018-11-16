import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Modal } from 'react-native';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import OpenOrdersList from '../OpenOrdersList';
import OpenTablePayment from '../OpenTablePayment';
import styles from './styles';
import { Feather } from '../VectorIcons';

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
                ? require('../../../assets/images/etc/default-avatar.png')
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

  render() {
    const { item } = this.props.navigation.state.params;

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
              data={item}
              changeOrderStatus={(orderId, status) =>
                this.props.navigation.state.params.changeOrderStatus(orderId, status)
              }
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
              data={item}
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
