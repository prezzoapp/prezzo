import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { FONT_FAMILY, COLOR_WHITE } from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2C2C'
  },

  tabBarUnderLineStyle: {
    backgroundColor: '#2ED573'
  },

  tabBarTextStyle: {
    fontSize: 15
  },

  innerContainer: {
    width: '100%',
    flex: 1,
    paddingTop: wp('4.53%')
  },

  flatListStyle: {
    paddingTop: wp('6.66%'),
    paddingBottom: getBottomSpace() + 49 + wp('5%'),
    flexGrow: 1
  },

  loaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },

  gridSeparator: {
    height: 1,
    backgroundColor: 'rgba(46, 213, 115, 0.3)',
    width: '100%',
    marginVertical: wp('5.6%')
  },

  separator: {
    height: wp('4%')
  },

  message: {
    fontSize: wp('5.33%'),
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    textAlign: 'center'
  },

  listsContainer: {
    flex: 1,
    overflow: 'hidden'
  },

  accountNotFoundContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  flex1: {
    flex: 1
  },

  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  activityIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('2.66%'),
    paddingTop: wp('5%')
  },

  tapToRetryBtn: {
    paddingHorizontal: wp('2.66%'),
    paddingTop: wp('5%')
  },

  tapToRetryBtnText: {
    fontSize: wp('4.5%'),
    color: 'white'
  }
});

export default styles;
