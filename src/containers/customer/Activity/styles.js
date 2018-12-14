import { StyleSheet, Platform } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { Constants } from 'expo';
import { Header } from 'react-navigation';

import { FONT_FAMILY } from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2C2C',
    paddingTop:
      Header.HEIGHT +
      Constants.statusBarHeight -
      (Platform.OS === 'ios' ? 20 : 0)
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
    height: hp('6.03%'),
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
    fontFamily: FONT_FAMILY
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
    fontFamily: FONT_FAMILY
  }
});

export default styles;
