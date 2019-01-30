// import { StyleSheet, Dimensions } from 'react-native';
// import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
//
// import {
//   FONT_FAMILY,
//   FONT_FAMILY_MEDIUM,
//   COLOR_WHITE
// } from '../../services/constants';
//
// const { width } = Dimensions.get('window');
//
// const styles = StyleSheet.create({
//   item: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     // paddingBottom: hp('2.83%')
//     // paddingBottom: wp('2.66%')
//     paddingBottom: wp(`${2300 / width}`)
//   },
//
//   leftSide: {
//     alignItems: 'center'
//   },
//
//   rightSide: {
//     // paddingLeft: wp('6%'),
//     paddingLeft: wp(`${2266 / width}`),
//     // paddingBottom: wp'3.46%'),
//     paddingBottom: wp(`${1300 / width}`),
//     flex: 1,
//     position: 'relative'
//   },
//
//   statusImage: {
//     resizeMode: 'contain',
//     // width: wp('9.33%'),
//     // height: wp('9.33%')
//     width: wp(`${3500 / width}`),
//     height: wp(`${3500 / width}`)
//   },
//
//   status: {
//     // fontSize: wp('3.46%'),
//     // lineHeight: wp('4.8%'),
//     fontSize: wp(`${1300 / width}`),
//     lineHeight: wp(`${1800 / width}`),
//     // marginTop: 1.5,
//     fontFamily: FONT_FAMILY_MEDIUM,
//     color: COLOR_WHITE,
//     // top: wp('0.26%')
//     top: 2
//   },
//
//   name: {
//     // paddingVertical: hp('0.8%'),
//     // paddingTop: wp('1.86%'),
//     // paddingBottom: wp('2.13%'),
//     paddingTop: wp(`${700 / width}`),
//     paddingBottom: wp(`${800 / width}`),
//     // fontSize: wp('4.53%'),
//     fontSize: wp(`${1700 / width}`),
//     fontFamily: FONT_FAMILY_MEDIUM,
//     color: COLOR_WHITE,
//     lineHeight: wp(`${2200 / width}`)
//     // lineHeight: wp('5.86%')
//   },
//
//   info: {
//     // fontSize: wp('4.26%'),
//     fontSize: wp(`${1600 / width}`),
//     fontFamily: FONT_FAMILY,
//     color: '#959595',
//     // lineHeight: wp('5.6%')
//     lineHeight: wp(`${2100 / width}`)
//   },
//
//   editIcon: {
//     flex: 1
//   },
//
//   editBtn: {
//     height: wp('6%'),
//     width: wp('6%'),
//     // width: wp(`${1400 / width}`),
//     // height: wp(`${1400 / width}`),
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//
//   sideBorder: {
//     flex: 1,
//     width: 1,
//     backgroundColor: '#EFEFF4',
//     // top: -wp('0.53%')
//     top: -wp(`${200 / width}`)
//   }
// });
//
// export default styles;

import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import {
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE
} from '../../services/constants';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // paddingBottom: hp('2.83%')
    paddingBottom: wp('2.66%')
  },

  leftSide: {
    alignItems: 'center'
  },

  rightSide: {
    paddingLeft: wp('6%'),
    paddingBottom: wp('3.46%'),
    flex: 1,
    position: 'relative'
  },

  statusImage: {
    resizeMode: 'contain',
    width: wp('9.33%'),
    height: wp('9.33%')
  },

  status: {
    fontSize: wp('3.46%'),
    lineHeight: wp('4.8%'),
    // marginTop: 1.5,
    fontFamily: FONT_FAMILY_MEDIUM,
    color: COLOR_WHITE,
    top: wp('0.26%')
  },

  name: {
    // paddingVertical: hp('0.8%'),
    paddingTop: wp('1.86%'),
    paddingBottom: wp('2.13%'),
    fontSize: wp('4.53%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: COLOR_WHITE,
    lineHeight: wp('5.86%')
  },

  info: {
    fontSize: wp('4.26%'),
    fontFamily: FONT_FAMILY,
    color: '#959595',
    lineHeight: wp('5.6%')
  },

  editIcon: {
    flex: 1
  },

  editBtn: {
    height: wp('6%'),
    width: wp('6%'),
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },

  sideBorder: {
    flex: 1,
    width: 1,
    backgroundColor: '#EFEFF4',
    top: -wp('0.53%')
  }
});

export default styles;
