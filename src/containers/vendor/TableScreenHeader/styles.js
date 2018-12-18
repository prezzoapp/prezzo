import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
    height: 59,
    width: 59
  },
  detailContainer: {
    paddingTop: Constants.statusBarHeight + hp('9.1%'),
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 15,
    alignItems: 'center'
  },
  nameContainer: {
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  vendorName: {
    fontSize: 15,
    color: 'rgb(50, 209, 119)',
    fontFamily: Expo.Font.processFontFamily(FONT_FAMILY_MEDIUM).fontFamily,
    backgroundColor: 'transparent'
  },
  category: {
    fontFamily: Expo.Font.processFontFamily(FONT_FAMILY_BOLD).fontFamily,
    color: 'white',
    fontSize: 25,
    backgroundColor: 'transparent'
  }
});

export default styles;
