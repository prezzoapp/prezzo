import { StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import {
  FONT_FAMILY,
  COLOR_WHITE,
  FONT_FAMILY_MEDIUM,
  SF_PRO_TEXT_LIGHT,
  SF_PRO_TEXT_REGULAR
} from '../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: wp('18.66%')
  },

  slide: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },

  orderDetails: {
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: wp('6.66%'),
    flex: 1
  },

  restaurantName: {
    fontSize: wp('6%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: COLOR_WHITE,
    textAlign: 'center',
    lineHeight: wp('5.86%'),
    marginTop: wp('5.6%')
  },

  reviewOrderText: {
    fontSize: wp('4.5%'),
    fontFamily: SF_PRO_TEXT_LIGHT,
    color: COLOR_WHITE,
    textAlign: 'center',
    lineHeight: wp('5.86%'),
    paddingTop: hp('1.47%')
  },

  flatList: {
    paddingTop: hp('3.15%')
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: wp('3%'),
    marginHorizontal: wp('2.13%')
  },

  itemName: {
    flex: 1,
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.5%'),
    paddingRight: wp('3%'),
    lineHeight: wp('5.86%')
  },

  reviewOrderFooter: {
    borderTopWidth: 1,
    borderColor: 'rgba(46,213,115, 0.5)',
    marginHorizontal: wp('4.3%'),
    height: hp('16.33%'),
    justifyContent: 'center'
  },

  reviewOrderFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: wp('2.36%'),
    paddingTop: hp('2.95%')
  },

  reviewOrderFooterText: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.5%')
  },

  actionBtnsHolder: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  quantity: {
    fontSize: wp('4.5%'),
    width: wp('16%'),
    textAlign: 'center',
    color: COLOR_WHITE,
    fontFamily: SF_PRO_TEXT_REGULAR,
    lineHeight: wp('5.86%')
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
    // paddingTop: hp('4.80%'),
    paddingVertical: wp('8%')
    // paddingBottom: hp('3.69%')
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
    // marginHorizontal: wp('6.66%')
  },

  paymentInfoTitle: {
    fontSize: wp('4.8%'),
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY_MEDIUM
  },

  backBtn: {
    position: 'absolute',
    zIndex: 99999,
    left: 0,
    marginTop: wp('3.46%')
  },

  cardPicker: {
    borderColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    height: wp('9.33%'),
    marginTop: wp('4%')
  },

  cardPickerText: {
    color: '#fff',
    fontSize: wp('4.26%')
  }
});

export const stylesRaw = {
  pickerIcon: {
    position: 'absolute',
    color: '#fff',
    fontSize: wp('4.26%'),
    marginLeft: 0,
    position: 'relative',
    top: -wp('1.3%'),
    right: wp('2%')
  }
};

export default styles;
