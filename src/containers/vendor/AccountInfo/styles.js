// @flow
import { Dimensions, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import {
  FONT_FAMILY,
  COLOR_BLACK,
  COLOR_GREEN,
  SF_PRO_DISPLAY_REGULAR
} from '../../../services/constants';

const AVATAR_SIZE: number = wp('21.33%');
const SECTION_WIDTH: number = Dimensions.get('window').width - wp('7.46%');

export default StyleSheet.create({
  addressContainer: {
    paddingHorizontal: wp('8.53%'),
    width: '100%'
  },
  addText: {
    color: COLOR_GREEN,
    marginTop: hp('1.72%'),
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.53%'),
    lineHeight: wp('5.86%')
  },
  editBtnText: {
    color: COLOR_GREEN,
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.53%'),
    lineHeight: wp('5.86%'),
    marginBottom: wp('3.2%')
  },
  addTextContainer: {
    alignSelf: 'flex-end'
  },
  avatarWrap: {
    alignItems: 'flex-start',
    height: wp('24.06%'),
    width: wp('24.06%'),
    backgroundColor: COLOR_BLACK,
    borderRadius: 8,
    position: 'relative',
    justifyContent: 'flex-end'
  },
  imageHolder: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 8,
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    overflow: 'hidden'
  },
  avatar: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
  },
  editAvatarIcon: {
    width: wp('7.46%'),
    height: wp('7.46%'),
    position: 'absolute',
    top: 0,
    right: 0,
    // borderWidth: 1,
    // borderColor: '#6A696A',
    // borderRadius: AVATAR_SIZE / 6,
    // tintColor: '#6A696A',
    resizeMode: 'contain'
  },
  header: {
    marginTop: wp('4.53%'),
    marginBottom: wp('12%'),
    paddingHorizontal: wp('8.53%'),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  categoriesContainer: {
    paddingHorizontal: wp('8.53%'),
    width: '100%'
  },

  bottomSeparator: {
    height: getBottomSpace() + 49
  },
  // categoriesSectionBody: {
  //   paddingBottom: 5,
  //   paddingTop: 5
  // },
  contactContainer: {
    paddingHorizontal: wp('8.53%'),
    width: '100%'
  },
  container: {
    backgroundColor: '#2B2C2C'
  },
  containerContentStyle: {
    alignItems: 'center',
    paddingTop: hp('2%')
  },
  hoursContainer: {
    marginBottom: 25,
    paddingHorizontal: wp('8.53%'),
    width: '100%'
  },
  hoursPicker: {
    borderColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    height: 34,
    width: wp('24%'),
    alignItems: 'center'
  },
  hoursPickerText: {
    color: '#fff',
    fontSize: wp('5.33%'),
    fontFamily: FONT_FAMILY,
    paddingLeft: wp('2%'),
    paddingRight: wp('8%'),
    lineHeight: 20,
    paddingTop: 1
  },
  pickerContainer: {
    height: 'auto',
    justifyContent: 'space-between',
    width: '100%'
  },
  sectionBody: {
    // paddingBottom: hp('0.61%')
  },
  sectionHeader: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    // marginBottom: hp('2.58%'),
    marginBottom: wp('4.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  sectionHeaderText: {
    color: '#fff',
    fontFamily: FONT_FAMILY,
    fontSize: wp('5.33%'),
    lineHeight: wp('5.86%'),
    // marginBottom: hp('0.98%')
    marginBottom: wp('3.2%')
  },

  filtersContainer: {
    paddingTop: 30,
    paddingHorizontal: wp('8.53%'),
    width: '100%'
  },

  sectionSubHeaderText: {
    color: 'rgba(255,255,255,0.5)',
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.53%'),
    lineHeight: wp('5.86%')
  },

  commonFilterPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },

  filtersHolder: {
    paddingTop: hp('2.46%')
  },

  filter: {
    height: 60,
    width: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },

  filterImage: {
    height: 28,
    width: 28,
    resizeMode: 'cover'
  },

  filterName: {
    color: 'rgb(255,251,245)',
    fontSize: 11,
    textAlign: 'center',
    paddingTop: 3
  },

  editInfoHolder: {
    marginLeft: wp('6.13%')
  },

  editBtn: {
    marginTop: 5
  },

  editText: {
    fontFamily: FONT_FAMILY,
    fontSize: wp('5.33%'),
    color: COLOR_GREEN,
    lineHeight: wp('5.86%')
  },

  headerLeftBtn: {
    marginLeft: wp('4.4%')
  },

  slidersHolder: {
    position: 'relative'
  },

  priceBarIndicator: {
    width: 2,
    height: 12,
    zIndex: 1,
    backgroundColor: 'white'
  },

  priceSliderContainer: {
    height: 31,
    marginTop: wp('4.26%'),
    marginRight: wp('5.6%'),
    // marginRight: wp('10.66%'),
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  priceSliderHolder: {
    height: 31,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -10.5
  },

  dollarTextStyle: {
    color: COLOR_GREEN,
    fontSize: wp('2.66%'),
    width: wp('13.33%'),
    height: 20,
    fontFamily: SF_PRO_DISPLAY_REGULAR
  },

  extra4Padding: {
    paddingTop: wp('1.06%')
  },

  footerSection: {
    paddingBottom: wp('5.33%'),
    alignItems: 'center'
  }
});

export const stylesRaw = {
  pickerIcon: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 0,
    position: 'absolute',
    right: wp('1.3%')
  }
};
