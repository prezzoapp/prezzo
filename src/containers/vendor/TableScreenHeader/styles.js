import { StyleSheet } from 'react-native';
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
    right: 0,
    zIndex: 999
  },
  linearGradientStyle: {
    paddingTop: 30
  },
  vendorImage: {
    height: 59,
    width: 59
  },
  detailContainer: {
    marginTop: 20,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center'
  },
  nameContainer: {
    padding: 15,
    flexDirection: 'column'
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
