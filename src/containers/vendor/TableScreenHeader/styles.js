import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import {
  SF_PRO_TEXT_SEMI_BOLD,
  SF_PRO_DISPLAY_SEMI_BOLD
} from '../../../services/constants';

const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  linearGradientStyle: {
    paddingTop: 0
  },
  vendorImage: {
    height: wp('15.73%'),
    width: wp('15.73%')
  },
  detailContainer: {
    // paddingTop: hp('11.33%'),
    paddingTop: wp('24.53%'),
    flexDirection: 'row',
    // paddingBottom: hp('2.09%'),
    paddingHorizontal: wp('4.26%')
  },
  nameContainer: {
    paddingHorizontal: wp('3%'),
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  vendorName: {
    fontSize: wp('4%'),
    color: 'rgb(50, 209, 119)',
    fontFamily: SF_PRO_TEXT_SEMI_BOLD,
    backgroundColor: 'transparent',
    flex: 1,
    lineHeight: hp('2.46%'),
    position: 'relative',
    bottom: -2
  },
  category: {
    fontFamily: SF_PRO_DISPLAY_SEMI_BOLD,
    color: 'white',
    fontSize: wp('6.6%'),
    backgroundColor: 'transparent',
    flex: 1,
    lineHeight: hp('5.04%')
  }
});

export default styles;
