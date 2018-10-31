import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import {
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE,
  FONT_FAMILY
} from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('6.66'),
    backgroundColor: '#2B2C2C',
    borderTopColor: '#2ED573',
    borderTopWidth: 1,
    marginTop: hp('2.58%')
  },

  tableCode: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('9.33%'),
    textAlign: 'center',
    paddingTop: hp('1%'),
    paddingBottom: hp('2%'),
    backgroundColor: '#2B2C2C'
  },

  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('16%')
  },

  notFoundHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  message: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: 20,
    textAlign: 'center'
  }
});

export default styles;
