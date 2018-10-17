import { Dimensions, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE
} from '../../../services/constants';
const SECTION_WIDTH: number = 0.90 * Dimensions.get('window').width;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2B2C2C'
  },

  Title: {
   fontFamily: FONT_FAMILY_MEDIUM,
   fontSize: wp('8%'),
   color: 'white'
 },
 subTitle: {
   fontFamily: FONT_FAMILY,
   fontSize: wp('3.73%'),
   color: 'white'
 },


  tabBarUnderLineStyle: {
    backgroundColor: '#2ED573'
  },

  tabBarTextStyle: {
    fontSize: 15
  },

  innerContainer: {
    marginTop: 145,
    width: wp('91.46%')
  },

  flatListStyle: {
    paddingTop: hp('0.61%'),
    paddingBottom: hp('2.46%')
  },
  title: {
   fontSize: wp('6.4%'),
   color: COLOR_WHITE,
   fontFamily: FONT_FAMILY_MEDIUM,
   textAlign: 'center',
   marginTop: hp('3.69%'),
   marginBottom: hp('1.44%')
 },

 message: {
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
   backgroundColor: 'transparent',
   zIndex: 9999,
   opacity: 0.99
 },
 box2: {
   position: 'absolute',
   top: 40,
   width: SECTION_WIDTH,
   bottom: 10,
   zIndex: 9999,
   backgroundColor: 'grey',
   opacity: 0.9,
   borderRadius: 10
 },
 blurView: {
   position: 'absolute',
   top: 0,
   right: 0,
   bottom: 0,
   left: 0,
    borderRadius: 10
   // borderTopLeftRadius: 10,
   // borderTopRightRadius: 10
 }
});

export default styles;
