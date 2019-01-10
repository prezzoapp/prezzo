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
    flex: 0.4,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 5
  },

  listItemBtn: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.84%')
  },

  titleHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  statusImage: {
    height: wp('4.8%'),
    width: wp('4.8%'),
    resizeMode: 'contain'
  },

  name: {
    fontSize: wp('5.33%'),
    fontFamily: FONT_FAMILY,
    color: 'white',
    flex: 1,
    paddingRight: 5
  },

  distance: {
    fontSize: wp('4.8%'),
    fontFamily: FONT_FAMILY,
    color: 'white'
  },

  status: {
    color: 'rgb(46,214,116)',
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingLeft: 15,
    position: 'relative',
    top: -5
  },

  statusHolder: {
    flexDirection: 'row',
    paddingTop: wp('2.66%'),
    alignItems: 'center'
  },

  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgb(59,97,74)'
  },

  vendorInfoHolder: {
    flex: 1,
    padding: wp('4%')
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
    borderRadius: 5
  },

  vendorIcon: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
    resizeMode: 'cover'
  },

  vendorContentHolder: {
    paddingLeft: wp('8%'),
    flex: 1
  },

  vendorName: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: wp('6.66%'),
    lineHeight: hp('3.69%'),
    top: -5
  },

  vendorAddress: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('4%'),
    lineHeight: hp('2.70%'),
    top: -2,
    padding: 0,
    margin: 0
  },

  vendorInfoSectionSeparator: {
    marginVertical: wp('4%'),
    alignSelf: 'stretch',
    height: 1,
    backgroundColor: 'rgb(59,97,74)'
  },

  milesText: {
    color: '#959595',
    paddingLeft: wp('2.66%'),
    fontFamily: FONT_FAMILY,
    fontSize: 17
  },

  iconTextHolder: {
    alignItems: 'center',
    flexDirection: 'row'
  }
});

export default styles;
