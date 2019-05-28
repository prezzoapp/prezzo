import { StyleSheet, Platform } from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Constants } from 'expo';
import { Header } from 'react-navigation';

import {
  FONT_FAMILY,
  COLOR_WHITE,
  FONT_FAMILY_MEDIUM,
  SF_PRO_TEXT_SEMI_BOLD
} from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop:
      Constants.statusBarHeight +
      Header.HEIGHT -
      (Platform.OS === 'ios' ? 20 : 0)
  },

  transparent: {
    backgroundColor: 'transparent'
  },

  photoBack: {
    position: 'absolute',
    height: wp('60%') + Constants.statusBarHeight,
    width: null,
    left: 0,
    right: 0,
    top: 0
  },

  photoBackImageStyle: {
    resizeMode: 'cover'
  },

  LinearGradientStyle: {
    flex: 1
  },

  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: wp('6.13%')
  },

  headerTextContainer: {
    flex: 1,
    paddingLeft: wp('4%')
  },

  headerTitleText: {
    fontFamily: FONT_FAMILY_MEDIUM,
    color: COLOR_WHITE,
    fontSize: wp('5.33%'),
    lineHeight: wp('5.86%')
  },

  headerContentTextContainer: {
    flexDirection: 'row',
    paddingTop: wp('2.66%'),
    alignItems: 'center'
  },

  headerContentText: {
    color: COLOR_WHITE,
    fontSize: wp('4.8%'),
    paddingLeft: wp('5.06%'),
    lineHeight: wp('5.86%')
  },

  listHeaderText: {
    fontSize: wp('8%'),
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY_MEDIUM
    // paddingBottom: hp('1.23%'),
    // lineHeight: wp('8%')
  },

  logo: {
    height: wp('29.33%'),
    width: wp('29.33%'),
    borderRadius: 15
  },

  buttonStyle: {
    backgroundColor: '#0DD24A',
    borderColor: '#0DD24A'
  },

  buttonText: {},

  toggleBtnsSection: {
    alignItems: 'center'
  },

  buttonHolder: {
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.31)',
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerBtns: {
    alignItems: 'center',
    width: wp('20.03%'),
    borderRadius: 15,
    justifyContent: 'center',
    height: wp('7.2%'),
    margin: wp('0.8%')
  },

  headerBtnText: {
    color: 'white',
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('3.73%')
  },

  toggleView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: wp('20.03%'),
    borderRadius: 15
  },

  linearGradientBtn: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },

  selectedBtnText: {
    color: '#0DD24A',
    fontSize: wp('3.73%'),
    fontFamily: FONT_FAMILY
  },

  bottomViewHolder: {
    paddingHorizontal: wp('4.53%'),
    // height: hp('8.62%'),
    height: wp('18.66%'),
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2ED573'
  },

  totalPrice: {
    fontSize: wp('4.8%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: COLOR_WHITE,
    // marginRight: wp('12%')
  },

  messageHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  message: {
    color: COLOR_WHITE,
    fontSize: wp('5.33%')
  },

  bottomViewBlurContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },

  headerLeftBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp('4.26%')
  },

  headerLeftBtnText: {
    fontSize: wp('5.33%'),
    color: 'white',
    fontFamily: SF_PRO_TEXT_SEMI_BOLD,
    lineHeight: wp('5.86%')
  },

  menuCategoryHeaderTextContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    backgroundColor: 'black',
    paddingVertical: wp('3%'),
    paddingHorizontal: wp('4%')
  }
});

export default styles;
