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
      Dimensions.get('window').height - Dimensions.get('window').height * 0.75
  },

  spotText: {
    fontSize: 22,
    color: 'white',
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingBottom: 10,
    paddingHorizontal: wp('4.26%')
  },

  markerStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },

  searchBarHolder: {
    paddingTop: hp('1.35%')
  },

  headerLeftBtn: {
    paddingLeft: wp('2%')
  }
});

export default styles;
