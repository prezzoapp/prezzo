import React from 'react';
import { Modal, Image, Text, View } from 'react-native';
import Expo from 'expo';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import PropTypes from 'prop-types';

import Button from '../Button';

import { COLOR_WHITE, FONT_FAMILY } from '../../services/constants';

import styles from './styles';

const CustomPopup = props => (
  <Modal
    animationType="slide"
    transparent
    visible={props.modalVisible}
    onRequestClose={() => {
      alert('Modal has been closed.');
    }}>
    <View style={styles.container}>
      <View style={styles.modalView}>
        <Expo.BlurView style={styles.blurView} tint="dark" intensity={100} />
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
          onPress={() => props.onDismiss()}
        >
          CONTINUE
        </Button>
      </View>
    </View>
  </Modal>
);

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

CustomPopup.propTypes = {
  modalVisible: PropTypes.bool.isRequired
};

export default CustomPopup;
