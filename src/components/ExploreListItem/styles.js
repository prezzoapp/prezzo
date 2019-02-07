// import { StyleSheet, Dimensions } from 'react-native';
// import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
//
// import { SF_PRO_TEXT_MEDIUM } from '../../services/constants';
//
// const { width } = Dimensions.get('window');
//
// const styles = StyleSheet.create({
//   restaurantName: {
//     // fontSize: wp('4.53%'),
//     fontSize: wp(`${1700 / width}`),
//     color: 'white',
//     fontFamily: SF_PRO_TEXT_MEDIUM,
//     // paddingTop: 8
//     paddingTop: wp(`${1400 / width}`),
//     lineHeight: wp(`${2200 / width}`)
//   },
//
//   cityName: {
//     // paddingTop: 6,
//     lineHeight: wp(`${2200 / width}`),
//     // fontSize: wp('3.73%'),
//     fontSize: wp(`${1400 / width}`),
//     color: '#959595',
//     fontFamily: SF_PRO_TEXT_MEDIUM
//   },
//
//   image: {
//     width: '100%',
//     // height: wp('36.26%')
//     height: wp(`${13600 / width}`)
//     // height: hp('16.74%')
//   }
// });
//
// export default styles;

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
  }
});

export default styles;
