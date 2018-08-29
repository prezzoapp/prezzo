import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import {
  FONT_FAMILY,
  COLOR_WHITE,
  FONT_FAMILY_MEDIUM
} from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },

  modalView: {
    minHeight: hp('78.81%'),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden'
  },

  slide: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },

  orderDetails: {
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: wp('6.66%')
  },

  restaurantName: {
    fontSize: wp('6%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: COLOR_WHITE,
    textAlign: 'center',
    paddingTop: hp('1%')
  },

  reviewOrderText: {
    fontSize: wp('4.5%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    textAlign: 'center',
    paddingTop: hp('1%')
  },

  blurView: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },

  flatList: {
    marginVertical: hp('5%'),
    maxHeight: hp('20%')
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: wp('3%')
  },

  itemName: {
    flex: 1,
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.5%'),
    paddingRight: wp('3%')
  },

  reviewOrderFooter: {
    borderTopWidth: 1,
    borderColor: 'rgba(46,213,115, 0.5)',
    marginHorizontal: wp('4.3%')
  },

  reviewOrderFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: wp('2.36%'),
    paddingVertical: hp('2%')
  },

  reviewOrderFooterText: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.5%')
  },

  actionBtnsHolder: {
    flexDirection: 'row'
  },

  quantity: {
    fontSize: wp('4.5%'),
    paddingHorizontal: wp('5%'),
    color: COLOR_WHITE
  },

  quantityBtn: {
    borderRadius: 50,
    width: wp('6%'),
    height: wp('6%'),
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#2ED573'
  },

  tabBarIconsHolder: {
    width: wp('33.33%'),
    alignItems: 'center',
    paddingVertical: hp('2.4%')
  },

  icon: {
    width: wp('8%'),
    height: wp('8%'),
    resizeMode: 'contain'
  },

  bottom_arrow: {
    width: wp('8%'),
    height: wp('5%'),
    resizeMode: 'contain'
  },

  bottomArrowIconContainer: {
    alignItems: 'center',
    paddingTop: hp('2%')
  },

  whereToScreenBtnsHolder: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: hp('5.29%'),
    paddingBottom: hp('3.6')
  },

  whereToScreenText: {
    fontSize: wp('4.5%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    textAlign: 'center',
    paddingVertical: hp('2.6'),
    paddingHorizontal: wp('19.73%'),
    lineHeight: hp('3.6%')
  },

  tableCode: {
    fontSize: wp('13.33%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    textAlign: 'center'
  }
});

export default styles;
