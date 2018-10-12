import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import OpenOrdersList from '../OpenOrdersList';
import OpenTablePayment from '../OpenTablePayment';
import styles from './styles';
import Button from '../Button';
import {
  FONT_FAMILY_MEDIUM,
  COLOR_GREEN,
  FONT_FAMILY,
  COLOR_WHITE
} from '../../services/constants';

export default class OpenTableDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <View>
          <Text>{navigation.state.params.userName}</Text>
        </View>
      ),
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#1F1F1F',
        borderBottomColor: 'transparent'
      }
    }
  };

  static displayName = 'OpenTableDetails';

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

  onTabChange(data) {
    if(data.i === 0) {
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
          onChangeTab={(data) => this.onTabChange(data)}
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
              data={this.data}
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
              data={this.paymentListInfo}
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
