import { StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

// import { Header } from 'react-navigation';

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
    paddingBottom: 20
  },

  headerTextContainer: {
    flex: 1,
    paddingLeft: 15
  },

  headerTitleText: {
    fontFamily: FONT_FAMILY_MEDIUM,
    color: COLOR_WHITE,
    fontSize: 20,
    lineHeight: 22
  },

  headerContentTextContainer: {
    flexDirection: 'row',
    paddingTop: 11
  },

  headerContentText: {
    color: COLOR_WHITE,
    fontSize: 18,
    paddingLeft: 19
  },

  listHeaderText: {
    fontSize: 30,
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingBottom: 10
  },

  logo: {
    height: 110,
    width: 110,
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
    width: 80,
    borderRadius: 15,
    justifyContent: 'center'
  },

  headerBtnText: {
    color: 'white',
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: 14
  },

  toggleView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 80,
    borderRadius: 15
  },

  linearGradientBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  selectedBtnText: {
    color: '#0DD24A',
    fontSize: 14,
    fontFamily: FONT_FAMILY
  },

  bottomViewHolder: {
    paddingHorizontal: 15,
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
    marginRight: wp('10.53%')
  },

  messageHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  message: {
    color: COLOR_WHITE,
    fontSize: 20
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
