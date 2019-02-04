import { StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import {
  COLOR_WHITE,
  COLOR_GREEN,
  FONT_FAMILY_MEDIUM,
  FONT_FAMILY
} from '../../services/constants';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between'
    // paddingVertical: wp('2.66%')
    // paddingBottom: wp('9.33%')
  },

  itemTitle: {
    color: COLOR_GREEN,
    fontFamily: FONT_FAMILY,
    fontSize: wp('5.33%'),
    lineHeight: wp('7.46%')
  },

  itemIngradients: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: wp('5.33%'),
    lineHeight: wp('7.46%')
  },

  leftSideContainer: {
    paddingRight: wp('14.66%'),
    // paddingTop: wp('5.6%'),
    flex: 1
  },

  rightSideContainer: {
    paddingRight: wp('2.66%'),
    // paddingTop: wp('5.6%')
  },

  itemTitleInPhotoMode: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('4.8%'),
    // paddingTop: hp('1.84%'),
    // paddingTop: wp('5.33%'),
    // paddingBottom: hp('1.23%'),
    paddingBottom: wp('2.66%'),
    paddingHorizontal: wp('5.33%'),
    lineHeight: wp('6.4%')
  },

  swiper: {
    flex: 1,
    // height: wp('93.33%')
    height: hp('44.55%')
  },

  itemImage: {
    flex: 1,
    height: hp('44.55%'),
    // height: wp('93.33%'),
    marginHorizontal: 10,
    borderRadius: 13,
    overflow: 'hidden',
    justifyContent: 'flex-end'
  },

  itemContainer: {
    // height: hp('44.55%')
    // height: wp('106.93%')
  },

  itemImageLinearGradient: {
    flex: 0.4
  },

  bottomContentHolder: {
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('7%'),
    paddingBottom: wp('4%')
  },

  controlButtons: {
    paddingHorizontal: wp('3.2%'),
    // height: hp('4.55%'),
    height: wp('9.86%'),
    width: wp('23.73%'),
    backgroundColor: 'rgba(46,213,115, 0.7)',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  quantityTextStyleInPhotoMode: {
    fontSize: wp('4.26%'),
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingHorizontal: 7
  }
});

export default styles;
