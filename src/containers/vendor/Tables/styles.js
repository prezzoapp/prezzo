import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { FONT_FAMILY, COLOR_WHITE } from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2C2C'
  },

  tabBarUnderLineStyle: {
    backgroundColor: '#2ED573'
  },

  tabBarTextStyle: {
    fontSize: 15
  },

  innerContainer: {
    marginTop: hp('20.68%'),
    width: '100%',
    flex: 1
  },

  flatListStyle: {
    paddingTop: hp('0.65%'),
    paddingBottom: hp('11%'),
    paddingHorizontal: wp('4.26%')
  },
  loaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },

  separator: {
    height: 1,
    backgroundColor: 'rgba(46, 213, 115, 0.3)',
    width: '100%'
  },

  message: {
    fontSize: wp('5.33%'),
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    textAlign: 'center'
  }
});

export default styles;
