import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

import { FONT_FAMILY, COLOR_GREEN } from '../../services/constants';

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
    width: wp('74.86%'),
    marginHorizontal: wp('100%') / 8,
    backgroundColor: 'transparent',
    height: hp('6.03%'),
    borderWidth: 0
  },

  tabsContainerStyle: {
    width: wp('74.86%')
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

  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('12.80%')
  },

  footerView: {
    flexDirection: 'row',
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('10.16%'),
    borderTopColor: COLOR_GREEN,
    borderTopWidth: 2,
    backgroundColor: 'black'
  },

  text: {
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.8%'),
    color: 'white'
  }
});

export default styles;
