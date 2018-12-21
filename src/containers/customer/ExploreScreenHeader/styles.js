import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Constants } from 'expo';

import {
  SF_PRO_TEXT_SEMI_BOLD,
  SF_PRO_DISPLAY_SEMI_BOLD,
  SF_PRO_DISPLAY_REGULAR
} from '../../../services/constants';

const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },

  nearMeText: {
    fontSize: wp('4%'),
    color: 'rgb(50, 209, 119)',
    fontFamily: SF_PRO_TEXT_SEMI_BOLD,
    backgroundColor: 'transparent',
    position: 'relative',
    top: -hp('0.5%')
  },

  filterPanel: {
    marginHorizontal: wp('4.26%'),
    marginTop: Constants.statusBarHeight + hp('6.5%'),
    height: hp('9%'),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(46, 213, 115, 0.3)',
    justifyContent: 'center'
  },

  filter: {
    color: '#fafafa',
    fontSize: wp('3.46%'),
    backgroundColor: 'transparent',
    fontFamily: SF_PRO_TEXT_SEMI_BOLD
  },

  locationPin: {
    width: wp('8%'),
    height: wp('8%')
  },

  mainTitleFilterAndMapIconHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    top: -hp('0.5%')
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
    paddingVertical: 15
  },

  filtersList: {
    paddingLeft: 12
  },

  slidersHolder: {
    paddingHorizontal: 30,
    paddingTop: 15
  },

  sliderTitleText: {
    color: 'rgb(255,251,245)',
    fontSize: 11,
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
    height: hp('1.97%'),
    zIndex: 1,
    backgroundColor: 'white'
  }
});

export default styles;
