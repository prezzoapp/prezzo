// @flow
import { StyleSheet } from 'react-native';
import { FONT_FAMILY_MEDIUM, COLOR_BLACK } from '../../../services/constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  avatar: {
    alignSelf: 'flex-end',
    borderColor: 'white',
    borderRadius: wp('13.6%'),
    borderWidth: 2,
    height: wp('27.2%'),
    resizeMode: 'cover',
    width: wp('27.2%')
  },
  avatarContainer: {
    height: wp('27.2%'),
    width: wp('27.2%')
  },
  bodyContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    height: 'auto'
  },
  container: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: wp('6.66%'),
    marginBottom: hp('1.23%')
  },
  footerContainer: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    height: 'auto',
    marginTop: hp('2.46%'),
    alignItems: 'flex-end',

    flexDirection: 'row',
    flex: 1
  },
  footerLeft: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginBottom: hp('10%')
  },
  footerRight: {
    alignSelf: 'flex-end',
    marginRight: 5,
    marginBottom: hp('10%')
  },
  footerText: {
    color: 'white',
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('5.33%')
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('2.38%'),
    marginBottom: hp('3.44%')
  },
  parent: {
    alignItems: 'center',
    backgroundColor: COLOR_BLACK,
    flex: 1,
    justifyContent: 'center'
  }
});
