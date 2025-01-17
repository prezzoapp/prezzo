import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import Constants from 'expo-constants';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import {
  SF_PRO_TEXT_SEMI_BOLD,
  SF_PRO_DISPLAY_SEMI_BOLD,
  SF_PRO_DISPLAY_REGULAR
} from '../../../services/constants';

const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    paddingTop: wp('3.73%')
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0
  },

  nearMeText: {
    fontSize: wp('4%'),
    color: 'rgb(50, 209, 119)',
    fontFamily: SF_PRO_TEXT_SEMI_BOLD,
    backgroundColor: 'transparent'
    // lineHeight: hp('2.46%')
    // lineHeight: wp('5.33%')
  },

  filterPanel: {
    marginHorizontal: wp('4.26%'),
    // paddingTop: Constants.statusBarHeight + wp('8%') + wp('3.73%'),
    paddingBottom: wp('2.13%'),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(46, 213, 115, 0.3)',
    justifyContent: 'center',
    // ...ifIphoneX(
    //   {
    //     height: wp('41.6%')
    //   },
    //   {
    //     height: wp('35.2%')
    //   }
    // )
  },

  filter: {
    color: '#fafafa',
    fontSize: wp('4%'),
    backgroundColor: 'transparent',
    fontFamily: SF_PRO_TEXT_SEMI_BOLD
  },

  dropArrowIcon: {
    backgroundColor: 'transparent'
  },

  locationPin: {
    width: wp('8%'),
    height: wp('8%')
  },

  mainTitleFilterAndMapIconHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative'
  },

  restaurantTitle: {
    fontFamily: SF_PRO_DISPLAY_SEMI_BOLD,
    color: 'white',
    fontSize: wp('8%'),
    backgroundColor: 'transparent'
  },

  filterButtonAndMapIconHolder: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  filterBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  filtersHolder: {
    paddingVertical: wp('5.33%')
  },

  filtersList: {
    paddingLeft: wp('4.53%')
  },

  slidersHolder: {
    paddingHorizontal: wp('8%'),
    paddingTop: hp('1.84%')
  },

  sliderTitleText: {
    color: 'rgb(255,251,245)',
    fontSize: wp('2.93%'),
    fontFamily: SF_PRO_DISPLAY_REGULAR
  },

  sliderTitleHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  blurView: {
    ...StyleSheet.absoluteFillObject
  },

  priceBarIndicator: {
    width: 2,
    height: 12,
    zIndex: 1,
    backgroundColor: 'white',
    marginBottom: -2
  },

  priceSliderContainer: {
    flex: 1,
    height: 31,
    marginVertical: hp('1.84%'),
    marginLeft: wp('8%'),
    marginRight: wp('10.66%'),
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  priceSliderHolder: {
    flex: 1,
    height: 31,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -11.5
  }
});

export default styles;
