import { StyleSheet } from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import {
  COLOR_WHITE,
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM
} from '../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: wp('5.86%')
  },

  modalView: {
    borderRadius: 30,
    overflow: 'hidden',
    padding: wp('6.66%'),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  blurView: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },

  imageIcon: {
    width: wp('38.66%'),
    resizeMode: 'contain'
  },

  title: {
    fontSize: wp('9.6%'),
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY_MEDIUM,
    textAlign: 'center'
  },

  message: {
    fontSize: wp('5.33%'),
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    textAlign: 'center',
    paddingTop: wp('5.33%')
  },

  tableCode: {
    fontSize: wp('13.33%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    textAlign: 'center',
    paddingBottom: wp('5.33%')
  }
});

export default styles;
