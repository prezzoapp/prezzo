import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

import {
  FONT_FAMILY,
  COLOR_WHITE,
  FONT_FAMILY_MEDIUM,
  SF_PRO_DISPLAY_BOLD
} from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2C2C',
    paddingBottom: hp('9%'),
    paddingTop: hp('1.97%')
  },

  tabBarUnderlineStyle: {
    backgroundColor: '#2ED573',
    borderRadius: 5,
    height: 2
  },

  scrollableTabStyle: {
    width: wp('49.86%'),
    marginHorizontal: wp('100%') / 4,
    height: 23,
    borderWidth: 0,
    backgroundColor: 'transparent'
  },

  tabsContainerStyle: {
    width: wp('49.86%')
  },

  orderTabStyle: {
    width: wp('14%'),
    backgroundColor: 'transparent'
  },

  orderTabTextStyle: {
    color: 'white',
    width: wp('14%'),
    textAlign: 'center',
    fontFamily: FONT_FAMILY_MEDIUM,
    top: -hp('0.49%')
  },

  paymentTabStyle: {
    width: wp('20%'),
    backgroundColor: 'transparent'
  },

  paymentTabTextStyle: {
    color: 'white',
    width: wp('20%'),
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: FONT_FAMILY_MEDIUM,
    top: -hp('0.49%')
  },

  price: {
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.8%'),
    color: 'white'
  },

  notFoundHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  message: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: 20,
    textAlign: 'center'
  },

  headerText: {
    fontSize: wp('6.93%'),
    color: 'white',
    flex: 1,
    fontFamily: SF_PRO_DISPLAY_BOLD
  }
});

export default styles;
