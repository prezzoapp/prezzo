import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import {
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE
} from '../../services/constants';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: wp('2.66%')
  },

  leftSide: {
    alignItems: 'center'
  },

  rightSide: {
    paddingLeft: wp('6%'),
    paddingBottom: wp('3.46%'),
    flex: 1,
    position: 'relative'
  },

  statusIconHolder: {
    width: wp('9.33%'),
    height: wp('9.33%')
  },

  statusImage: {
    resizeMode: 'contain',
    width: wp('9.33%'),
    height: wp('9.33%')
  },

  status: {
    fontSize: wp('3.46%'),
    lineHeight: wp('4.8%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: COLOR_WHITE,
    top: wp('0.26%')
  },

  name: {
    paddingTop: wp('1.86%'),
    paddingBottom: wp('2.13%'),
    fontSize: wp('4.53%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: COLOR_WHITE,
    lineHeight: wp('5.86%')
  },

  info: {
    fontSize: wp('4.26%'),
    fontFamily: FONT_FAMILY,
    color: '#959595',
    lineHeight: wp('5.6%')
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
  },

  sideBorder: {
    flex: 1,
    width: 1,
    backgroundColor: '#EFEFF4',
    top: -wp('0.53%')
  }
});

export default styles;
