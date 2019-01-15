// @flow
import { StyleSheet } from 'react-native';
// import { Header } from 'react-navigation';
import { FONT_FAMILY, COLOR_BLACK } from '../../../services/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  avatar: {
    alignSelf: 'flex-end',
    borderColor: 'white',
    borderRadius: wp('13.5%'),
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
    marginBottom: hp('9%'),
    marginTop: hp('6%'),
    marginHorizontal: wp('6.66%')
  },
  footerContainer: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 'auto',
    marginTop: hp('2.46%')
  },
  footerLeft: {
    alignSelf: 'flex-start'
  },
  footerRight: {
    alignSelf: 'flex-end'
  },
  footerText: {
    color: 'white',
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.8%')
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: Header.HEIGHT + 10,
    marginTop: hp('1.23%'),
    marginBottom: hp('2.46%')
  },
  parent: {
    alignItems: 'center',
    backgroundColor: COLOR_BLACK,
    flex: 1,
    justifyContent: 'center'
  },
  scrollViewStyle: {
    backgroundColor: COLOR_BLACK,
    width: '100%'
  },
  loaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  headerLeftBtn: {
    marginLeft: wp('4.4%')
  }
});
