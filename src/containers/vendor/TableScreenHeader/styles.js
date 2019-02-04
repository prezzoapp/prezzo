import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import {
  SF_PRO_TEXT_SEMI_BOLD,
  SF_PRO_DISPLAY_SEMI_BOLD
} from '../../../services/constants';

const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    paddingTop: wp('5.33%')
  },
  linearGradientStyle: {
    paddingTop: 0
  },
  vendorImage: {
    height: wp('15.73%'),
    width: wp('15.73%')
  },
  detailContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp('4.26%')
  },
  nameContainer: {
    paddingHorizontal: wp('3%'),
    flex: 1
  },
  vendorName: {
    fontSize: wp('4%'),
    color: 'rgb(50, 209, 119)',
    fontFamily: SF_PRO_TEXT_SEMI_BOLD,
    backgroundColor: 'transparent',
    lineHeight: wp('5.33%'),
    position: 'relative'
  },
  category: {
    fontFamily: SF_PRO_DISPLAY_SEMI_BOLD,
    color: 'white',
    fontSize: wp('6.6%'),
    backgroundColor: 'transparent',
    lineHeight: wp('10.93%')
  }
});

export default styles;
