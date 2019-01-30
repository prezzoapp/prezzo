// @flow
import { StyleSheet } from 'react-native';
import { FONT_FAMILY, COLOR_BLACK } from '../../../services/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getBottomSpace } from 'react-native-iphone-x-helper';

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
    paddingBottom: getBottomSpace() + 49,
    marginTop: hp('7.75%'),
    paddingHorizontal: wp('7.2%')
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
    backgroundColor: COLOR_BLACK,
    flex: 1
  },
  scrollViewStyle: {
    marginTop: hp('2.58%'),
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
  },
  ccIcon: {
    width: wp('11.2%'),
    height: hp('3.44%'),
    resizeMode: 'contain',
    marginRight: wp('5.33%')
  }
});
