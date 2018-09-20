import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import styles from './styles';
import ActivityListItem from '../../../components/ActivityListItem';
import Button from '../../../components/Button';

import {
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE
} from '../../../services/constants';

class ActivityOpenOrder extends Component {
  constructor() {
    super();

    this.data = [{
        id: 1,
        status: 'Delivered',
        name: 'Buffalo Cauliflower x2',
        info: 'Extra buffalo sauce, hold the carrots'
      },
      {
        id: 2,
        status: 'Delivered',
        name: 'Mac n’ Cheese x1',
        info: 'Split in two bowls'
      },
      {
        id: 3,
        status: 'In Progress',
        name: 'BBQ Pinapple x2',
        info: ''
      },
      {
        id: 4,
        status: 'In Progress',
        name: 'Mole Bowl x1',
        info: ''
      }
    ];
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tableCode}>Table 9192</Text>
        <FlatList
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          data={this.data}
          renderItem={({ item }) => <ActivityListItem item={item} />}
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
            onPress={() => null}
          >
            Close Table
          </Button>
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

export default ActivityOpenOrder;
