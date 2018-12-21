import React from 'react';
import { Modal, Image, Text, View } from 'react-native';
import Expo from 'expo';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import PropTypes from 'prop-types';

import Button from '../Button';

import { COLOR_WHITE, SF_PRO_TEXT_BOLD } from '../../services/constants';

import styles from './styles';

const CustomPopup = props => (
  <Modal
    animationType="slide"
    transparent
    visible={props.modalVisible}
    onRequestClose={() => {
      props.onDismiss()
    }}>
    <View style={styles.container}>
      <View style={styles.modalView}>
        <Expo.BlurView style={styles.blurView} tint="dark" intensity={100} />
        <Image source={props.image} style={styles.imageIcon} />
        <Text style={styles.title}>{props.title}</Text>
        {!(props.otherInfo && props.otherInfo === '') && (
          <Text
            style={[
              styles.message,
              { paddingBottom: props.otherInfo ? 0 : wp('5.33%') }
            ]}
          >
            {props.message}
          </Text>
        )}
        {props.otherInfo&& (
          <Text style={styles.tableCode}>{props.otherInfo}</Text>
        )}
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
    fontFamily: SF_PRO_TEXT_BOLD,
    color: COLOR_WHITE,
    paddingVertical: wp('4.8%'),
    justifyContent: 'center'
  }
};

CustomPopup.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  otherInfo: PropTypes.string,
  image: PropTypes.number,
  onDismiss: PropTypes.func.isRequired
};

CustomPopup.defaultProps = {
  otherInfo: '',
  image: null
};

export default CustomPopup;
