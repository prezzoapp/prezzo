import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import {
  COLOR_WHITE,
  FONT_FAMILY,
  SF_PRO_TEXT_LIGHT
} from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('6.66'),
    paddingLeft: wp('5%'),
    backgroundColor: '#2B2C2C',
    borderTopColor: '#2ED573',
    borderTopWidth: 1,
    overflow: 'hidden',
    // marginTop: hp('2.58%')
    marginTop: wp('5.6%')
  },

  listHeaderHolder: {
    justifyContent: 'center',
    // paddingTop: hp('3%'),
    // paddingBottom: hp('3.2%'),
    paddingTop: wp('5.70%'),
    paddingBottom: wp('6.30%'),
    backgroundColor: '#2B2C2C'
  },

  tableCode: {
    color: COLOR_WHITE,
    fontFamily: SF_PRO_TEXT_LIGHT,
    fontSize: wp('9.33%'),
    textAlign: 'center',
    lineHeight: wp('9.5%'),
    backgroundColor: 'transparent'
  },

  footerContainer: {
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: 'flex-start',
    paddingTop: wp('4%'),
    height: hp('19%')
    // height: wp('37.33%')
  },

  notFoundHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  message: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: wp('5.33%'),
    textAlign: 'center'
  },

  flatListContentContainerStyle: {
    flexGrow: 1
  },

  flex1: {
    flex: 1
  }
});

export default styles;
