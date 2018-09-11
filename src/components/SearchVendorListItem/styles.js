import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

import { FONT_FAMILY } from '../../services/constants';

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    paddingVertical: hp('3.07%'),
    paddingHorizontal: wp('6.66%'),
    backgroundColor: 'rgba(255,255,255,0.15)'
  },

  vendorImage: {
    width: wp('18.66%'),
    height: wp('18.66%'),
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: wp('6.66%')
  },

  infoHolder: {
    flex: 1
  },

  name: {
    fontSize: wp('5.33%'),
    color: 'rgba(255,255,255,0.7)',
    fontFamily: FONT_FAMILY
  },

  address: {
    fontSize: wp('4.26%'),
    color: 'rgba(255,255,255,0.7)',
    fontFamily: FONT_FAMILY,
    paddingVertical: hp('1.23%')
  }
});

export default styles;
