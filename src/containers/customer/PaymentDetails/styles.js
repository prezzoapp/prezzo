import { StyleSheet, Platform } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { FONT_FAMILY } from '../../../services/constants';
import { Header } from 'react-navigation';
import { Constants } from 'expo';

const checkboxSize: number = 25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2C2C',
    paddingTop: Header.HEIGHT + Constants.statusBarHeight - (Platform.OS === 'ios' ? 20 : 0)
  },

  scrollView: {
    paddingTop: hp('3.69%'),
    backgroundColor: 'transparent'
  },

  textStyle: {
    fontFamily: FONT_FAMILY,
    color: 'white'
  },

  containerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },

  promotionsContainer: {
    width: '100%',
    height: 'auto',
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  checkbox: {
    // width: checkboxSize,
    // height: checkboxSize,
    marginRight: wp('4%')
  },

  promotionalText: {
    fontSize: 18,
    lineHeight: 30,
    fontFamily: FONT_FAMILY,
    color: '#fff',
    backgroundColor: 'transparent'
  },

  btnHolder: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  loaderView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  headerLeftBtn: {
    marginLeft: wp('4.4%')
  }
});

export default styles;
