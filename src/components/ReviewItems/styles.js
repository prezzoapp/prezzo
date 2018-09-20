import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { COLOR_WHITE, FONT_FAMILY } from '../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)'
  },

  listHeader: {
    alignItems: 'center'
  },

  listFooter: {
    alignItems: 'center'
  },

  modalHolder: {
    marginHorizontal: wp('3.73%'),
    paddingHorizontal: wp('3.2%'),
    overflow: 'hidden',
    flex: 1,
    marginVertical: hp('5.41%')
  },

  blurView: {
    position: 'absolute',
    borderRadius: 12,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },

  imageIcon: {
    width: wp('38.66%'),
    resizeMode: 'contain',
    marginTop: hp('9.48%')
  },

  title: {
    fontSize: wp('9.6%'),
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    textAlign: 'center',
    marginTop: hp('3.69%'),
    marginBottom: hp('3.44%')
  },

  message: {
    fontSize: wp('5.33%'),
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    textAlign: 'center'
  }
});

export default styles;
