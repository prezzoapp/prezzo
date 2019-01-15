import { StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

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
    paddingTop: hp('11.48%')
  },

  transparent: {
    backgroundColor: 'transparent'
  },

  photo_back: {
    position: 'absolute',
    height: '40%',
    width: null,
    left: 0,
    right: 0,
    top: 0
  },

  LinearGradientStyle: {
    flex: 1
  },

  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: hp('2.46%')
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
    paddingTop: wp('2.93%')
  },

  headerContentText: {
    color: COLOR_WHITE,
    fontSize: wp('4.8%'),
    paddingLeft: wp('5.06%')
  },

  listHeaderText: {
    fontSize: wp('8%'),
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingBottom: hp('1.23%'),
    textAlign: 'center'
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
    paddingVertical: 3,
    alignItems: 'center',
    width: wp('21.33%'),
    borderRadius: 15,
    justifyContent: 'center'
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
    width: wp('21.33%'),
    borderRadius: 15
  },

  linearGradientBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  selectedBtnText: {
    color: '#0DD24A',
    fontSize: wp('3.73%'),
    fontFamily: FONT_FAMILY
  },

  bottomViewHolder: {
    paddingHorizontal: wp('4.53%'),
    height: hp('8.62%'),
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
    marginRight: wp('10.66%')
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
    alignItems: 'center'
  },

  headerLeftBtnText: {
    fontSize: wp('5.33%'),
    color: 'white',
    fontFamily: SF_PRO_TEXT_SEMI_BOLD
  }
});

export default styles;
