// @flow
import { Dimensions, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import {
  FONT_FAMILY,
  COLOR_BLACK,
  COLOR_GREEN
} from '../../../services/constants';

const AVATAR_SIZE: number = 80;
const SECTION_WIDTH: number = 0.85 * Dimensions.get('window').width;

export default StyleSheet.create({
  addressContainer: {
    paddingHorizontal: wp('7.46%'),
    width: '100%'
  },
  addText: {
    color: COLOR_GREEN,
    marginTop: 10
  },
  addTextContainer: {
    alignSelf: 'flex-end'
  },
  avatar: {
    alignSelf: 'flex-start',
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    height: AVATAR_SIZE,
    resizeMode: 'cover',
    width: AVATAR_SIZE
  },
  header: {
    marginTop: 20,
    marginVertical: 30,
    paddingHorizontal: wp('7.46%'),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatarWrap: {
    alignItems: 'center',
    height: AVATAR_SIZE,
    position: 'relative',
    width: AVATAR_SIZE,
    backgroundColor: COLOR_BLACK,
    borderRadius: 8
  },
  categoriesContainer: {
    paddingHorizontal: wp('7.46%'),
    width: '100%'
  },
  categoriesSectionBody: {
    paddingBottom: 5,
    paddingTop: 5
  },
  contactContainer: {
    paddingHorizontal: wp('7.46%'),
    width: '100%'
  },
  container: {
    backgroundColor: '#2B2C2C',
    paddingBottom: hp('7.51%')
  },
  containerContentStyle: {
    alignItems: 'center',
    paddingTop: hp('2%'),
    paddingBottom: hp('11%')
  },
  editAvatarIcon: {
    width: AVATAR_SIZE / 3,
    height: AVATAR_SIZE / 3,
    position: 'absolute',
    top: -1 * (AVATAR_SIZE / 4.5 / 2),
    right: -1 * (AVATAR_SIZE / 4.5 / 2),
    borderWidth: 1,
    borderColor: '#6A696A',
    borderRadius: AVATAR_SIZE / 6,
    backgroundColor: '#E1E1E1',
    tintColor: '#6A696A',
    resizeMode: 'contain'
  },
  hoursContainer: {
    marginBottom: 25,
    paddingHorizontal: wp('7.46%'),
    width: '100%'
  },
  hoursPicker: {
    borderColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    height: 35,
    marginTop: 5
  },
  hoursPickerText: {
    color: '#fff',
    fontSize: 16
  },
  hoursSectionBody: {
    paddingBottom: 5,
    paddingTop: 5
  },
  pickerContainer: {
    flexDirection: 'row',
    height: 'auto',
    justifyContent: 'space-between',
    paddingBottom: 5,
    paddingTop: 5,
    width: '100%'
  },
  sectionBody: {
    paddingBottom: 5,
    paddingTop: 5
  },
  sectionHeader: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  sectionHeaderText: {
    color: '#fff',
    fontFamily: FONT_FAMILY,
    fontSize: 20,
    marginBottom: 5
  },

  filtersContainer: {
    paddingTop: 30,
    paddingHorizontal: wp('7.46%'),
    width: '100%'
  },

  sectionSubHeaderText: {
    color: 'rgba(255,255,255,0.5)',
    fontFamily: FONT_FAMILY,
    fontSize: 17,
    marginTop: 10
  },

  commonFilterPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },

  filtersHolder: {
    paddingTop: 20
  },

  filter: {
    height: 60,
    width: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
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
    marginLeft: 30
  },

  editBtn: {
    marginTop: 5
  },

  editText: {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    color: COLOR_GREEN
  },

  priceBarIndicator: {
    width: 2,
    height: hp('1.97%'),
    zIndex: 1,
    backgroundColor: 'white'
  },

  dollarTextStyle: {
    fontSize: 17,
    width: wp('13.33%'),
    height: 20,
    fontFamily: FONT_FAMILY
  },

  headerLeftBtn: {
    marginLeft: wp('4.4%')
  }
});

export const stylesRaw = {
  pickerIcon: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 0,
    marginRight:5,
  },
  spinnerContainer: {
    position: 'absolute',
    right: 14,
    top: 60
  }
};

export const avatarShadowProps = {
  x: 0,
  y: 4,
  width: 80,
  height: 80,
  color: '#000000',
  radius: 8,
  border: 12,
  opacity: 0.35
};
