import { StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import {
  FONT_FAMILY,
  COLOR_WHITE,
  FONT_FAMILY_MEDIUM
} from '../../services/constants';

const styles = StyleSheet.create({
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
    paddingTop: wp('2%')
  },

  reviewOrderText: {
    fontSize: wp('4.5%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    textAlign: 'center',
    paddingTop: wp('1%')
  },

  flatList: {
    marginVertical: wp('10%'),
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
    paddingTop: wp('4%')
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

  whereToScreenBtnsHolder: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: wp('9%'),
    paddingBottom: wp('8%')
  },

  whereToScreenText: {
    fontSize: wp('4.5%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    textAlign: 'center',
    paddingBottom: wp('3%'),
    paddingHorizontal: wp('19.73%'),
    lineHeight: wp('8%')
  },

  tableCode: {
    fontSize: wp('13.33%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    textAlign: 'center'
  },

  paymentIcons: {
    resizeMode: 'contain',
    width: wp('14.93%')
  },

  paymentScreenBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: wp('7%'),
    paddingBottom: wp('6%')
  },

  paymentBtnHolder: {
    padding: wp('2%'),
    marginHorizontal: wp('4%'),
    width: wp('26.79%'),
    position: 'relative'
  },

  checkMarkIconHolder: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: wp('5.33%'),
    height: wp('5.33%'),
    borderRadius: wp('2.66%'),
    backgroundColor: '#2ED573',
    justifyContent: 'center',
    alignItems: 'center'
  },

  checkMarkIcon: {
    resizeMode: 'contain',
    width: wp('4%'),
    height: wp('4%')
  },

  paymentInfoContainer: {
    marginHorizontal: wp('6.66%')
  },

  paymentInfoTitle: {
    fontSize: wp('4.8%'),
    color: COLOR_WHITE
  }
});

export default styles;
