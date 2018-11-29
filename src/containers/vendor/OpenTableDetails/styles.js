import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

import { FONT_FAMILY, COLOR_WHITE } from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2C2C'
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
    fontFamily: FONT_FAMILY
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
    fontFamily: FONT_FAMILY
  },

  price: {
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.8%'),
    color: 'white'
  }
});

export default styles;
