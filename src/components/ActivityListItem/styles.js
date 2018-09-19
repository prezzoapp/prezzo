import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import {
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE
} from '../../services/constants';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: hp('3.44%')
  },

  leftSide: {
    alignItems: 'center'
  },

  rightSide: {
    paddingLeft: wp('6%'),
    flex: 1,
    position: 'relative'
  },

  statusImage: {
    resizeMode: 'contain',
    width: wp('8%'),
    height: wp('8%')
  },

  status: {
    fontSize: wp('3.46%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE
  },

  name: {
    paddingVertical: hp('0.8%'),
    fontSize: wp('4.53%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: COLOR_WHITE
  },

  info: {
    fontSize: wp('4.26%'),
    fontFamily: FONT_FAMILY,
    color: '#959595'
  },

  editIcon: {
    flex: 1
  },

  editBtn: {
    height: wp('6%'),
    width: wp('6%'),
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;