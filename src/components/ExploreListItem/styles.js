import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { SF_PRO_TEXT_MEDIUM } from '../../services/constants';

const styles = StyleSheet.create({
  restaurantName: {
    fontSize: wp('4.53%'),
    color: 'white',
    fontFamily: SF_PRO_TEXT_MEDIUM,
    paddingTop: wp('3.73%'),
    lineHeight: wp('5.86%')
  },

  cityName: {
    fontSize: wp('3.73%'),
    color: '#959595',
    fontFamily: SF_PRO_TEXT_MEDIUM,
    lineHeight: wp('5.86%')
  },

  image: {
    width: '100%',
    height: wp('36.26%')
  },

  imageStyle: {
    borderRadius: 5
  }
});

export default styles;
