import React, { Component } from 'react';
import { Modal, Image, Text, View } from 'react-native';
import { BlurView } from 'react-native-blur';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import Button from '../Button';

import { COLOR_WHITE, FONT_FAMILY } from '../../services/constants';

import styles from './styles';

const CustomPopup = (props) => {
  return(
    <Modal
      animationType="slide"
      transparent
      visible={props.modalVisible}
      onRequestClose={() => {
        alert('Modal has been closed.');
      }}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <BlurView style={styles.blurView} blurType="dark" blurAmount={5} />
          <Image
            source={require('../../../assets/images/custom_modal_icons/thumbs_up_icon.png')}
            style={styles.imageIcon}
          />
          <Text style={styles.title}>Congratulations!</Text>
          <Text style={styles.message}>
            Please show the table code to your server.!
          </Text>
          <Text style={styles.tableCode}>9192</Text>
          <Button
            style={customPopupBtnStyles.commonBtn}
            textStyle={customPopupBtnStyles.commonBtnText}
            onPress={() => alert()}
          >
            CONTINUE
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const customPopupBtnStyles = {
  commonBtn: {
    backgroundColor: '#0DD24A',
    borderWidth: 0,
    width: wp('53.33%'),
    justifyContent: 'center',
    borderRadius: 8,
    padding: 0,
    paddingVertical: hp('1.23%'),
    paddingHorizontal: 8,
    marginHorizontal: wp('4%')
  },
  commonBtnText: {
    fontSize: wp('4.8%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    paddingVertical: wp('4.8%'),
    justifyContent: 'center'
  }
};

export default CustomPopup;