import React, { Component } from 'react';
import { View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import ProfileDataField from '../ProfileDataField';
import Button from '../Button';
import { FONT_FAMILY } from '../../services/constants';
import CustomPopup from '../CustomPopup';
import styles from './styles';

class OpenTableDelivery extends Component {
  constructor() {
    super();
    this.state = { modalVisible: false };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoHolder}>
          <ProfileDataField label="First Name" value="Ofir" />
          <ProfileDataField label="Last Name" value="Dotan" />
          <ProfileDataField label="Phone" value="(477) 722-2796" />
          <ProfileDataField label="Address" value="731 Admiralty Way" />
          <ProfileDataField label="Zip" value="90292" />
          <ProfileDataField label="City" value="Marina Del Rey" />
        </View>
        <View style={styles.buttonHolder}>
          <Button
            style={buttonStyles.submitReviewBtnStyle}
            textStyle={buttonStyles.submitReviewBtnTextStyle}
            onPress={() => this.setState({ modalVisible: true })}
          >
            Mark Delivered
          </Button>
        </View>
        <CustomPopup
          title="Congratulations!"
          message="Ofir Dotan’s order has been delivered."
          modalVisible={this.state.modalVisible}
          onDismiss={() => {
            this.setState({ modalVisible: false });
          }}
        />
      </View>
    );
  }
};

const buttonStyles = {
  submitReviewBtnStyle: {
    backgroundColor: '#2ED573',
    borderColor: '#0DD24A',
    width: '100%',
    height: hp('10.34%'),
    justifyContent: 'center',
    borderRadius: 0
  },

  submitReviewBtnTextStyle: {
    fontSize: wp('4.8%'),
    fontFamily: FONT_FAMILY,
    color: 'white',
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
};

export default OpenTableDelivery;
