import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { FONT_FAMILY } from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2C2C',
    borderTopColor: '#2ED573',
    borderTopWidth: 1,
    marginTop: hp('2.58%')
  },

  tabStyle: {
    backgroundColor: '#2B2C2C'
  },

  tabViewStyle: {
    backgroundColor: '#2B2C2C',
    paddingHorizontal: wp('6.66%')
  },

  tabTextStyle: {
    color: '#9B9B9B',
    fontFamily: FONT_FAMILY,
    fontSize: wp('3.46%')
  },

  activeTabTextStyle: {
    color: 'white',
    fontFamily: FONT_FAMILY,
    fontSize: wp('3.46%')
  }
});

export default styles;
