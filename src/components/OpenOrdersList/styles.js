import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: wp('6.66'),
    paddingLeft: wp('5.86%'),
    backgroundColor: '#2B2C2C',
    paddingTop: hp('4.92%')
  },

  footerContainer: {
    alignItems: 'center',
    height: hp('12.80%')
  }
});

export default styles;
