import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import {
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE,
  FONT_FAMILY_REGULAR
} from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2C2C'
  },

  listHeaderContainer: {
    paddingTop: hp('0.5%')
  },

  listHeaderTitle: {
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('6.4%'),
    color: 'white',
    textAlign: 'center',
    lineHeight: hp('5.04%')
  },

  subTitle: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: wp('3.73%'),
    color: 'white',
    lineHeight: hp('2.7%'),
    textAlign: 'center'
  },

  listHeaderSubtitle: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: wp('3.73%'),
    color: 'white',
    lineHeight: hp('2.7%'),
    textAlign: 'center',
    marginTop: hp('2.46%'),
    marginBottom: hp('0.36%')
  },

  tabBarUnderLineStyle: {
    backgroundColor: '#2ED573'
  },

  tabBarTextStyle: {
    fontSize: 15
  },

  innerContainer: {
    width: '100%',
    flex: 1,
    paddingTop: wp('4.53%')
  },

  flatListContentContainerStyle: {
    paddingTop: wp('6.66%'),
    paddingBottom: getBottomSpace() + 49 + wp('5%'),
    paddingHorizontal: wp('4.26%'),
    flexGrow: 1
  },

  title: {
    fontSize: wp('8%'),
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY_MEDIUM,
    textAlign: 'center',
    marginTop: hp('1.97%')
    // marginBottom: hp('0.98%')
  },

  message: {
    fontSize: wp('5.33%'),
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    textAlign: 'center'
  },

  listHeaderMessage: {
    lineHeight: hp('3.69%'),
    fontSize: wp('5.33%'),
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    textAlign: 'center'
  },

  listHeader: {
    alignItems: 'center'
  },

  listFooter: {
    alignItems: 'center'
  },

  submitReviewBtn: {
    backgroundColor: '#2ED573',
    borderColor: '#0DD24A',
    width: wp('41.33%'),
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: hp('5.78%'),
    marginBottom: hp('3.81%')
  },

  submitReviewBtnText: {
    fontSize: wp('3.46%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  },

  closeReviewBtn: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: wp('41.33%'),
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: hp('5.66%')
  },

  closeReviewBtnText: {
    fontSize: wp('5.33%'),
    fontFamily: FONT_FAMILY,
    color: 'rgba(255,255,255,0.5)',
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  },

  box1: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
    zIndex: 999
  },

  box2: {
    position: 'absolute',
    top: hp('5.41%'),
    marginHorizontal: wp('3.73%'),
    bottom: getBottomSpace() + 49 + wp('2.13%'),
    zIndex: 100,
    borderRadius: 10
  },

  blurView: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 10
  },

  backBtn: {
    position: 'absolute',
    top: hp('2.83%'),
    left: wp('4.53%')
  }
});

export default styles;
