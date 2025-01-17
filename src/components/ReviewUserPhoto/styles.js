import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { COLOR_WHITE, FONT_FAMILY } from '../../services/constants';

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#292828',
    paddingTop: hp('1.97%'),
    paddingBottom: wp('7.46%'),
    paddingHorizontal: wp('7.46%'),
    marginTop: hp('3.07%'),
    marginHorizontal: wp('3.73%'),
    borderRadius: 8
  },

  bigImageHolder: {
    marginTop: hp('2.15%'),
    height: wp('31.46%'),
    width: wp('31.46%'),
    borderRadius: 8,
    overflow: 'hidden'
  },

  linearGradient: {
    flex: 0.5
  },

  bigImage: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    marginTop: 10,
    marginRight: wp('2.66%'),
    resizeMode: 'cover'
  },

  name: {
    fontSize: wp('5.33%'),
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    backgroundColor: 'transparent',
    paddingHorizontal: wp('2.4%'),
    paddingVertical: hp('1%')
  },

  titleHolder: {
    alignItems: 'center'
  },

  title: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: wp('5.33%'),
    paddingHorizontal: 1,
    lineHeight: wp('5.86%'),
    backgroundColor: 'transparent'
  },

  itemImagesHolder: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  itemImagePickerBtn: {
    borderRadius: 8,
    marginRight: 15,
    width: 81,
    height: 81,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },

  ratingPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },

  checkImageContainer: {
    height: wp('8%'),
    width: wp('8%'),
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    right: 0
  },

  checkImage: {
    height: wp('8%'),
    width: wp('8%'),
    resizeMode: 'contain'
  }
});

export default styles;
