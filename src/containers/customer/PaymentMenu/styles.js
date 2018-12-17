// @flow
import { StyleSheet } from 'react-native';
// import { Header } from 'react-navigation';
import { FONT_FAMILY, COLOR_BLACK } from '../../../services/constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  avatar: {
    alignSelf: 'flex-end',
    borderColor: 'white',
    borderRadius: 51,
    borderWidth: 2,
    height: 102,
    resizeMode: 'cover',
    width: 102
  },
  avatarContainer: {
    height: 102,
    width: 102
  },
  bodyContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    height: 'auto'
  },
  container: {
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 25
  },
  footerContainer: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 'auto',
    marginTop: 20
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
    fontSize: 18
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: Header.HEIGHT + 10,
    marginTop: 10,
    marginBottom: 20
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
