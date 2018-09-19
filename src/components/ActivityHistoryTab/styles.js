import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { FONT_FAMILY } from '../../services/constants';

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: hp('3%')
  },

  textHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  text: {
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.8%'),
    color: 'white'
  },

  price: {
    textAlign: 'center'
  },

  extraStyle: {
    paddingVertical: hp('3.20%')
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: '#2ED573',
    marginHorizontal: -wp('1.2%'),
    paddingHorizontal: wp('2.4%'),
    paddingTop: hp('3.69%'),
    paddingBottom: hp('6.77%')
  }
});

export default styles;
