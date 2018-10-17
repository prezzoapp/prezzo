import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { COLOR_WHITE, FONT_FAMILY } from '../../services/constants';
import { COLOR_GREEN } from '../../services/constants';


const styles = StyleSheet.create({
  item: {
    backgroundColor: '#292828',
    paddingTop: hp('1.47%'),
    paddingBottom: hp('3.44%'),
    paddingHorizontal: wp('3.44%'),
    borderRadius: 8,
    marginTop: hp('3.07%'),
    marginLeft: 16,
    marginRight: 10
  },

  bigImageHolder: {
    height: wp('36%'),
    backgroundColor: 'transparent',
    width: wp('38%'),
    marginTop: 10
  },

  linearGradient: {
    flex: 0.5
  },

  bigImage: {
    height: wp('32%'),
    width: wp('32%'),
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    marginTop:10,
    marginLeft: 11
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
    textAlign: 'center'
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
