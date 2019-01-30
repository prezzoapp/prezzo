import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { getBottomSpace } from 'react-native-iphone-x-helper';

import { FONT_FAMILY, COLOR_WHITE } from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: getBottomSpace() + 49,
    left: 0,
    zIndex: 2
  },

  blurView: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },

  listHolder: {
    flex: 1,
    marginTop: hp('11.82%')
  },

  listSeparator: {
    height: 1,
    backgroundColor: '#979797'
  },

  loaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  message: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: wp('5.33%')
  },

  flatListStyle: {
    paddingBottom: getBottomSpace() + 49 + wp('5%')
  },

  closeByBtn: {
    marginLeft: wp('5.33%'),
    marginBottom: wp('2.93%')
  },

  closeByBtnText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontFamily: FONT_FAMILY,
    fontSize: wp('5.33%'),
    lineHeight: wp('7.2%')
  }
});

export default styles;
