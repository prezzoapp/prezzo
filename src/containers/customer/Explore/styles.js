// @flow
import { StyleSheet } from 'react-native';
import { FONT_FAMILY, COLOR_WHITE, SF_PRO_TEXT_SEMI_BOLD,
SF_PRO_DISPLAY_SEMI_BOLD,
SF_PRO_DISPLAY_REGULAR } from '../../../services/constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2C2C'
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },

  message: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: 15,
    marginTop: 20
  },

  filtersHolder: {
    paddingVertical: wp('5.33%'),
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1
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
