import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Button from '../Button';
import ActivityListItem from '../ActivityListItem';
import { FONT_FAMILY_MEDIUM } from '../../services/constants';
import styles from './styles';

class OpenOrdersList extends Component {
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
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          data={this.data}
          renderItem={({ item }) => <ActivityListItem item={item} />}
        />
        <View style={styles.footerContainer}>
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

export default OpenOrdersList;
