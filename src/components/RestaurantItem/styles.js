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
    justifyContent: 'space-between',
    paddingVertical: wp('2.66%')
  },

  itemTitle: {
    color: COLOR_GREEN,
    fontFamily: FONT_FAMILY,
    fontSize: wp('5.33%')
  },

  itemIngradients: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: wp('5.33%')
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
    paddingTop: hp('1.84%'),
    paddingBottom: hp('1.23%'),
    paddingHorizontal: wp('5.33%')
  },

  itemImage: {
    flex: 1,
    height: hp('44.55%'),
    marginHorizontal: 10,
    borderRadius: 13,
    overflow: 'hidden',
    justifyContent: 'flex-end'
  },

  itemContainer: {
    height: hp('44.55%')
  },

  itemImageLinearGradient: {
    flex: 0.4
  },

  bottomContentHolder: {
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 15,
    left: 30,
    right: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },

  controlButtons: {
    paddingHorizontal: wp('3.2%'),
    height: hp('4.55%'),
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
