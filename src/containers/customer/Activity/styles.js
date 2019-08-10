import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { Header } from 'react-navigation';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import {
  FONT_FAMILY_MEDIUM,
  SF_PRO_DISPLAY_BOLD
} from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2C2C',
    paddingBottom: getBottomSpace() + 49
  },

  absoluteView: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: Header.HEIGHT + hp('10.11%'),
    backgroundColor: '#1f1f1f'
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
    height: 23,
    // marginTop: hp('2.09%'),
    marginTop: wp('4.53%'),
    borderWidth: 0
  },

  tabStyle: {
    backgroundColor: '#1f1f1f'
  },

  tabsContainerStyle: {
    width: wp('49.86%')
  },

  openOrderTabStyle: {
    width: wp('24.33%'),
    backgroundColor: 'transparent'
  },

  openOrderTabTextStyle: {
    color: 'white',
    width: wp('24.33%'),
    textAlign: 'center',
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('5%'),
    top: -hp('0.49%'),
    lineHeight: wp('4%')
  },

  historyTabStyle: {
    width: wp('16%'),
    backgroundColor: 'transparent'
  },

  historyTabTextStyle: {
    color: 'white',
    width: wp('16%'),
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: FONT_FAMILY_MEDIUM,
    top: -hp('0.49%'),
    fontSize: wp('3.46%')
  },

  headerText: {
    fontSize: wp('5%'),
    color: 'white',
    fontFamily: SF_PRO_DISPLAY_BOLD,
    paddingLeft: wp('6.93%'),
    textAlign: 'center'
  }
});

export default styles;
