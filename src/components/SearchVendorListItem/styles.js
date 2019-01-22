import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

import { FONT_FAMILY } from '../../services/constants';

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    paddingTop: wp('6.66%'),
    paddingBottom: wp('7.2%'),
    paddingHorizontal: wp('5.33%'),
    backgroundColor: 'rgba(255,255,255,0.15)'
  },

  vendorImage: {
    width: wp('18.66%'),
    height: wp('18.66%'),
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: wp('5.33%')
  },

  infoHolder: {
    flex: 1
  },

  name: {
    fontSize: wp('5.33%'),
    color: 'rgba(255,255,255,0.7)',
    fontFamily: FONT_FAMILY,
    lineHeight: wp('7.2%')
  },

  address: {
    fontSize: wp('4.26%'),
    color: 'rgba(255,255,255,0.7)',
    fontFamily: FONT_FAMILY,
    paddingTop: wp('1.86%'),
    paddingBottom: wp('2.66%'),
    lineHeight: wp('5.6%')
  },

  ratingHolder: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  ratingText: {
    fontSize: wp('3.73%'),
    paddingLeft: 10,
    color: 'rgba(255,255,255,0.8)'
  }
});

export default styles;
