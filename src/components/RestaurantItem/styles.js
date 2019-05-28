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
    flex: 1
  },

  rightSideContainer: {
    paddingRight: wp('2.66%')
  },

  itemTitleInPhotoMode: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('4.8%'),
    paddingBottom: wp('2.66%'),
    paddingHorizontal: wp('5.33%'),
    lineHeight: wp('6.4%')
  },

  // swiper: {
  //   height: hp('44.55%')
  // },

  itemImage: {
    flex: 1,
    height: hp('44.55%'),
    marginHorizontal: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    borderRadius: 13
  },

  itemContainer: {
    flex: 1,
    overflow: 'hidden'
  },

  itemImageLinearGradient: {
    flex: 0.4
  },

  bottomContentHolder: {
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: wp('6%'),
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp('7%'),
    paddingRight: wp('14%')
  },

  controlButtons: {
    paddingHorizontal: wp('3.2%'),
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
  },

  pagination: {
    bottom: 7,
    zIndex: 999
  },

  imageStyle: {
    borderRadius: 13
  }
});

export default styles;
