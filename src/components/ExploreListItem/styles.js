import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { SF_PRO_TEXT_MEDIUM } from '../../services/constants';

const styles = StyleSheet.create({
  restaurantName: {
    fontSize: wp('4.53%'),
    color: 'white',
    fontFamily: SF_PRO_TEXT_MEDIUM,
    paddingTop: 8
  },

  cityName: {
    paddingTop: 6,
    fontSize: wp('3.73%'),
    color: '#959595',
    fontFamily: SF_PRO_TEXT_MEDIUM
  },

  image: {
    width: '100%',
    // height: wp('36.26%'),
    height: hp('16.74%')
  }
});

export default styles;
