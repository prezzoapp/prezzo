import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { COLOR_WHITE, FONT_FAMILY } from '../../services/constants';

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#292828',
    paddingTop: hp('1.47%'),
    paddingBottom: hp('3.44%'),
    paddingHorizontal: wp('3.2%'),
    borderRadius: 8,
    marginTop: hp('3.07%')
  },

  bigImageHolder: {
    height: hp('12.68%'),
    justifyContent: 'flex-end'
  },

  linearGradient: {
    flex: 0.5
  },

  bigImage: {
    height: hp('12.68%'),
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end'
  },

  name: {
    fontSize: wp('5.33%'),
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    backgroundColor: 'transparent',
    paddingHorizontal: wp('2.4%'),
    paddingVertical: hp('1%')
  },

  addPhotoText: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: wp('5.33%'),
    backgroundColor: 'transparent',
    paddingTop: hp('1.5%'),
    paddingHorizontal: wp('2.4%')
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
  }
});

export default styles;
