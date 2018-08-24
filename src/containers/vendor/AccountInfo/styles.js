// @flow
import { Dimensions, StyleSheet } from 'react-native';
import {
  FONT_FAMILY,
  COLOR_BLACK,
  COLOR_GREEN,
  COLOR_WHITE
} from '../../../services/constants';

const AVATAR_SIZE: number = 80;
const SECTION_WIDTH: number = 0.85 * Dimensions.get('window').width;

export default StyleSheet.create({
  addressContainer: {
    width: SECTION_WIDTH
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
    width: SECTION_WIDTH,
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatarWrap: {
    alignItems: 'center',
    height: AVATAR_SIZE,
    position: 'relative',
    width: AVATAR_SIZE
  },
  categoriesContainer: {
    width: SECTION_WIDTH
  },
  categoriesSectionBody: {
    paddingBottom: 5,
    paddingTop: 5
  },
  contactContainer: {
    width: SECTION_WIDTH
  },
  container: {
    backgroundColor: COLOR_BLACK,
    flex: 1
  },
  containerContentStyle: {
    alignItems: 'center',
    paddingBottom: 50
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
    width: SECTION_WIDTH
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
    justifyContent: 'space-between',
  },
  sectionHeaderText: {
    color: '#fff',
    fontFamily: FONT_FAMILY,
    fontSize: 20,
    marginBottom: 5
  },

  filtersContainer: {
    paddingTop: 30,
    width: SECTION_WIDTH
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
    width: SECTION_WIDTH
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
  }
});

export const stylesRaw = {
  pickerIcon: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 0
  },
  spinnerContainer: {
    position: 'absolute',
    right: 10,
    top: 60
  }
};
