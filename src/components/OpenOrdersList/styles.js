import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { COLOR_WHITE, FONT_FAMILY } from '../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('6.66'),
    backgroundColor: '#2B2C2C',
    paddingTop: hp('4.92%')
  },

  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('12.80%')
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
