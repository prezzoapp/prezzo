import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import OpenOrdersList from '../OpenOrdersList';
import OpenTablePayment from '../OpenTablePayment';
import styles from './styles';
import Button from '../Button';
import { Feather } from '../VectorIcons';

import {
  FONT_FAMILY_MEDIUM,
  COLOR_GREEN,
  FONT_FAMILY,
  COLOR_WHITE
} from '../../services/constants';

export default class VendorAdminActivityDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <View
          style={{ flexDirection: 'row', width: wp('90%'), alignItems: 'center' }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
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
                marginRight: wp('2.5%'),
                borderWidth: 1,
                borderRadius: wp('5.86%')
              }}
              source={
                navigation.state.params.userImage === ''
                  ? require('../../../assets/images/etc/default-avatar.png')
                  : { uri: navigation.state.params.userImage }
              }
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: wp('6.93%'),
              color: 'white',
              flex: 1
            }}
            numberOfLines={1}
          >
            {navigation.state.params.userName}
          </Text>
        </View>
      ),
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#1F1F1F',
        borderBottomColor: 'transparent',
        height: hp('10%')
      }
    }
  };

  static displayName = 'VendorAdminActivityDetails';

  constructor() {
    super();
    this.data = [{
        id: 1,
        status: 'Delivered',
        name: 'Buffalo Cauliflower x2',
        info: 'Extra buffalo sauce, hold the carrots',
        editable: true
      },
      {
        id: 2,
        status: 'Delivered',
        name: 'Mac n’ Cheese x1',
        info: 'Split in two bowls',
        editable: true
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
              footer={
                <View style={styles.footerContainer}>
                  <Button
                    style={buttonStyles.closeTableBtn}
                    textStyle={buttonStyles.closeTableBtnText}
                    onPress={() => null}
                  >
                    Close Table
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
              data={item}
              footer={
                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('100%'),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: hp('10.16%'),
                    borderTopColor: COLOR_GREEN,
                    borderTopWidth: 2,
                    backgroundColor: 'black'
                  }}
                >
                  <Button
                    style={buttonStyles.requestBtn}
                    textStyle={buttonStyles.requestBtnText}
                    onPress={() => null}
                  >
                    Request
                  </Button>

                  <Text style={[styles.price, { textAlign: 'right' }]}>
                    Total $90.95
                  </Text>
                </View>
              }
            />
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

const buttonStyles = {
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
  },

  requestBtn: {
    backgroundColor: '#2ED573',
    borderColor: '#0DD24A',
    width: wp('37.33%'),
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginLeft: wp('5.33%')
  },

  requestBtnText: {
    fontSize: wp('3.46%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
};
