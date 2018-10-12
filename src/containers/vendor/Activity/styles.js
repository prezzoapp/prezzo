import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE
} from '../../../services/constants';


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
 }

});

export default styles;
