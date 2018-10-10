import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2C2C',
    justifyContent: 'space-between'
  },

  infoHolder: {
    paddingHorizontal: wp('8.53%'),
    paddingTop: hp('5.04%')
  }
});

export default styles;
