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
  filteredRestaurantsBottomCardHolder: {
    backgroundColor: 'rgb(51,51,51)',
    height: hp('30.54%'),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden'
  },

  listItemBtn: {
    paddingHorizontal: wp('4%')
  },

  titleHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  statusImage: {
    height: wp('3%'),
    width: wp('3%'),
    resizeMode: 'cover'
  },

  name: {
    fontSize: wp('5.33%'),
    fontFamily: FONT_FAMILY,
    color: 'white',
    flex: 1,
    paddingRight: 5,
    lineHeight: wp('10.35%')
  },

  distance: {
    fontSize: wp('4.8%'),
    fontFamily: FONT_FAMILY,
    color: 'white'
  },

  status: {
    color: 'rgb(46,214,116)',
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingLeft: wp('4.26%'),
    position: 'relative',
    fontSize: wp('2.93%'),
    lineHeight: wp('3.46%'),
    top: -wp('0.6%')
  },

  statusHolder: {
    flexDirection: 'row',
    paddingBottom: wp('4.8%'),
    alignItems: 'center'
  },

  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgb(59,97,74)'
  },

  vendorInfoHolder: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgb(51,51,51)',
    paddingTop: wp('9.6%'),
    paddingHorizontal: wp('4.26%')
  },

  contentHolder: {
    flexDirection: 'row',
    paddingHorizontal: wp('4%')
  },

  vendorIconHolder: {
    height: wp('12.8%'),
    width: wp('12.8%'),
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden'
  },

  vendorIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover'
  },

  vendorContentHolder: {
    // paddingLeft: wp('4.26%'),
    paddingLeft: wp('8.53%'),
    flex: 1,
    top: -wp('2.66%')
  },

  vendorName: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: wp('8%')
  },

  vendorAddress: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('4%'),
    lineHeight: wp('5.86%'),
    padding: 0,
    margin: 0
  },

  vendorInfoSectionSeparator: {
    marginBottom: wp('3.73%'),
    alignSelf: 'stretch',
    height: 1,
    backgroundColor: 'rgb(59,97,74)'
  },

  milesText: {
    color: '#959595',
    paddingLeft: wp('4.26%'),
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.53%'),
    flex: 1,
    lineHeight: wp('5.86%'),
    marginRight: wp('3%')
  },

  iconTextHolder: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },

  contentContainerStyle: {
    paddingVertical: wp('3.73%'),
    paddingHorizontal: wp('2.93%')
  },

  extraStatusHolderStyle: {
    paddingTop: wp('2.13%'),
    paddingBottom: 0
  },

  extraStatusStyle: {
    paddingBottom: 0
  },

  extraContentHolderStyle: {
    justifyContent: 'space-between',
    paddingRight: 0
  },

  buttonHolder: {
    paddingVertical: wp('1.33%'),
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },

  bottom_arrow: {
    width: wp('8.38%'),
    height: wp('5%'),
    resizeMode: 'contain'
  },
});

export default styles;
