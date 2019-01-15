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
    paddingBottom: hp('9%')
  },

  tabBarUnderlineStyle: {
    backgroundColor: '#2ED573',
    borderRadius: 5,
    height: 2
  },

  scrollableTabStyle: {
    width: wp('49.86%'),
    marginHorizontal: wp('100%') / 4,
    backgroundColor: 'transparent',
    height: hp('6.03%'),
    borderWidth: 0
  },

  tabsContainerStyle: {
    width: wp('49.86%'),
    height: 30
  },

  orderTabStyle: {
    width: wp('14%'),
    height: 30,
    backgroundColor: 'transparent'
  },

  orderTabTextStyle: {
    color: 'white',
    width: wp('14%'),
    textAlign: 'center',
    fontFamily: FONT_FAMILY_MEDIUM
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
    fontFamily: FONT_FAMILY_MEDIUM
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
