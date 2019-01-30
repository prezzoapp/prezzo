// import { StyleSheet, Dimensions, Platform } from 'react-native';
// import { Header } from 'react-navigation';
// import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { Constants } from 'expo';
//
// import { FONT_FAMILY_MEDIUM } from '../../../services/constants';
//
// const { width } = Dimensions.get('window');
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#2B2C2C',
//     justifyContent: 'space-between',
//     paddingTop:
//       Header.HEIGHT +
//       Constants.statusBarHeight -
//       (Platform.OS === 'ios' ? 20 : 0)
//   },
//
//   map: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     left: 0,
//     bottom:
//       Dimensions.get('window').height - Dimensions.get('window').height * 0.8
//   },
//
//   spotText: {
//     // fontSize: wp('9.6%'),
//     fontSize: wp(`${3600 / width}%`),
//     color: 'white',
//     fontFamily: FONT_FAMILY_MEDIUM,
//     // paddingBottom: hp('1.23%'),
//     // paddingHorizontal: wp('4.26%'),
//     paddingHorizontal: wp(`${1600 / width}%`),
//     // lineHeight: wp('10.93%')
//     lineHeight: wp(`${4100 / width}%`)
//   },
//
//   markerStyle: {
//     // width: wp('8%'),
//     // height: wp('8%'),
//     width: wp(`${3000 / width}%`),
//     height: wp(`${3000 / width}%`),
//     resizeMode: 'contain'
//   },
//
//   searchBarHolder: {
//     // paddingTop: hp('1.35%')
//   },
//
//   headerLeftBtn: {
//     // paddingLeft: wp('4.4%')
//     paddingLeft: wp(`${1600 / width}`)
//   }
// });
//
// export default styles;

import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Header } from 'react-navigation';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { Constants } from 'expo';

import { FONT_FAMILY_MEDIUM } from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2C2C',
    justifyContent: 'space-between',
    paddingTop:
      Header.HEIGHT +
      Constants.statusBarHeight -
      (Platform.OS === 'ios' ? 20 : 0)
  },

  map: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom:
      Dimensions.get('window').height - Dimensions.get('window').height * 0.8
  },

  spotText: {
    fontSize: wp('9.6%'),
    color: 'white',
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingBottom: hp('1.23%'),
    paddingHorizontal: wp('4.26%'),
    lineHeight: wp('10.93%')
  },

  markerStyle: {
    width: wp('8%'),
    height: wp('8%'),
    resizeMode: 'contain'
  },

  searchBarHolder: {
    paddingTop: hp('1.35%')
  },

  headerLeftBtn: {
    paddingLeft: wp('4.4%')
  }
});

export default styles;
