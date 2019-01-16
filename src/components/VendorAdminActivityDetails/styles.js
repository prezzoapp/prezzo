import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

import {
  FONT_FAMILY,
  SF_PRO_DISPLAY_BOLD,
  FONT_FAMILY_MEDIUM
} from '../../services/constants';

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
    fontSize: wp('3.46%'),
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
    fontSize: wp('3.46%'),
    top: -hp('0.49%')
  },

  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('12.80%')
  },

  price: {
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.8%'),
    color: 'white'
  },

  headerText: {
    fontSize: wp('6.93%'),
    color: 'white',
    flex: 1,
    fontFamily: SF_PRO_DISPLAY_BOLD
  }
});

export default styles;
