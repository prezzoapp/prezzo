import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_MEDIUM
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
    paddingTop: Constants.statusBarHeight + hp('7.15%'),
    flexDirection: 'row',
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
    fontFamily: Expo.Font.processFontFamily(FONT_FAMILY_MEDIUM).fontFamily,
    backgroundColor: 'transparent',
    flex: 1
  },
  category: {
    fontFamily: Expo.Font.processFontFamily(FONT_FAMILY_BOLD).fontFamily,
    color: 'white',
    fontSize: wp('6.6%'),
    backgroundColor: 'transparent',
    flex: 1
  }
});

export default styles;
