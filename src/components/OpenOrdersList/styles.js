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
  }
});

export default styles;
