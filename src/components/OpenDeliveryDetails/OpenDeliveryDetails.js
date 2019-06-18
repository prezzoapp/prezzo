import React, { Component } from 'react';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { fromJS } from 'immutable';
import OpenOrdersList from '../OpenOrdersList';
import OpenTablePayment from '../OpenTablePayment';
import OpenDelivery from '../OpenDelivery';
import Button from '../Button';
import { Feather } from '@expo/vector-icons'

import {
  FONT_FAMILY_MEDIUM,
  COLOR_GREEN,
  FONT_FAMILY,
  COLOR_WHITE
} from '../../services/constants';
import styles from './styles';

export default class OpenDeliveryDetails extends Component {
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
            source={navigation.state.params.userImage}
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

  static displayName = 'OpenDeliveryDetails';

  constructor() {
    super();
    this.data = [
      {
        id: 1,
        status: 'Delivered',
        name: 'Buffalo Cauliflower x2',
        info: 'Extra buffalo sauce, hold the carrots',
        editable: false
      },
      {
        id: 2,
        status: 'Delivered',
        name: 'Mac n’ Cheese x1',
        info: 'Split in two bowls',
        editable: false
      },
      {
        id: 3,
        status: 'In Progress',
        name: 'BBQ Pinapple x2',
        info: '',
        editable: true
      },
      {
        id: 4,
        status: 'In Progress',
        name: 'Mole Bowl x1',
        info: '',
        editable: true
      }
    ];

    this.paymentListInfo = [
      {
        id: 1,
        name: 'Buffalo Caluiflower v2',
        price: '$24'
      },
      {
        id: 2,
        name: 'Mac n Cheese x1',
        price: '$15'
      },
      {
        id: 3,
        name: 'BBQ Pineapple x2',
        price: '$30'
      },
      {
        id: 4,
        name: 'Mole Bawl x1',
        price: '$16'
      }
    ];
  }

  onTabChange(data) {
    if (data.i === 0) {
      this.props.navigation.setParams({ visible: true });
    } else {
      this.props.navigation.setParams({ visible: false });
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Tabs
          locked
          scrollWithoutAnimation
          onChangeTab={data => this.onTabChange(data)}
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
              data={this.data}
              footer={
                <View style={styles.footerContainer}>
                  <Button
                    style={buttonStyles.cancelDeliveryBtn}
                    textStyle={buttonStyles.cancelDeliveryBtnText}
                    onPress={() => null}
                  >
                    Cancel Delivery
                  </Button>
                </View>
              }
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
              data={this.paymentListInfo}
              footer={
                <View style={styles.footerView}>
                  <Text style={styles.text}>Total Paid $90.95</Text>
                </View>
              }
            />
          </Tab>
          <Tab
            heading="Delivery"
            tabStyle={styles.paymentTabStyle}
            activeTabStyle={styles.paymentTabStyle}
            textStyle={styles.paymentTabTextStyle}
            activeTextStyle={styles.paymentTabTextStyle}
            style={styles.tabStyle}
          >
            <OpenDelivery />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const buttonStyles = {
  cancelDeliveryBtn: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: wp('44%'),
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: hp('1%')
  },

  cancelDeliveryBtnText: {
    fontSize: wp('5.33%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: 'rgba(255,255,255,0.5)',
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
};
