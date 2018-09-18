import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { FONT_FAMILY_MEDIUM, COLOR_WHITE } from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('6.66')
  },

  tableCode: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('9.33%'),
    textAlign: 'center',
    paddingBottom: hp('2%')
  },

  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('16%')
  }
});

export default styles;
