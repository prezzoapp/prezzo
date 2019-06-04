import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  InteractionManager,
  ActivityIndicator
} from 'react-native';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import OpenOrdersList from '../../../components/OpenOrdersList';
import OpenTablePayment from '../../../components/OpenTablePayment';
import { Feather } from '../../../components/VectorIcons';
import CacheImage from '../../../components/CacheImage';
import styles from './styles';

import {
  FONT_FAMILY_MEDIUM,
  FONT_FAMILY,
  COLOR_WHITE
} from '../../../services/constants';

export default class VendorAdminActivityDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <View style={styles.customHeaderContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Feather
              title="Add More"
              name="chevron-left"
              color="white"
              size={wp('8%')}
            />
          </TouchableOpacity>

          <Image
            style={styles.headerImage}
            source={
              navigation.state.params.userImage === ''
                ? require('../../../../assets/images/etc/default-avatar.png')
                : navigation.state.params.userImage
            }
          />
          <Text style={styles.headerText} numberOfLines={1}>
            {navigation.state.params.userName}
          </Text>
        </View>
      ),
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#1F1F1F',
        borderBottomColor: '#2ED573',
        borderBottomWidth: 1,
        elevation: 0,
        height: hp('9%')
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

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.addWaiterRequestedItemDetails(
        this.props.navigation.state.params.item
      );
    });
  }

  componentWillUnmount() {
    this.props.removeWaiterRequestedItemDetails();
  }

  render() {
    const selectedItem = fromJS(this.props.waiterRequestedSelectedItem);
    return (
      <Container style={styles.container}>
        {(() => {
          if(selectedItem) {
            return (
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
                    innerTab={this.props.navigation.state.params.innerTab}
                    completeOrder={() => null}
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
                    innerTab={this.props.navigation.state.params.innerTab}
                    completeOrder={() => null}
                  />
                </Tab>
              </Tabs>
            );
          }
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <ActivityIndicator size="large" color="white"/>
            </View>
          )
        })()}
      </Container>
    );
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

VendorAdminActivityDetails.propTypes = {
  addWaiterRequestedItemDetails: PropTypes.func.isRequired,
  removeWaiterRequestedItemDetails: PropTypes.func.isRequired,
  waiterRequestedSelectedItem: PropTypes.object,
  navigation: PropTypes.object.isRequired
};

VendorAdminActivityDetails.defaultProps = {
  waiterRequestedSelectedItem: null
};
