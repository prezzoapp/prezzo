// @flow
import {Dimensions, StyleSheet} from 'react-native';
import {
  FONT_FAMILY,
  FONT_FAMILY_BOLD,
  COLOR_BLACK,
  COLOR_GREEN
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
    alignSelf: 'flex-end',
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    height: AVATAR_SIZE,
    resizeMode: 'cover',
    width: AVATAR_SIZE
  },
  avatarContainer: {
    marginBottom: 20
  },
  avatarWrap: {
    alignItems: 'center',
    height: AVATAR_SIZE * 1.2,
    position: 'relative',
    width: AVATAR_SIZE * 1.2
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
    paddingTop: 100,
    paddingBottom: 50
  },
  editAvatarIcon: {
    width: AVATAR_SIZE / 3,
    height: AVATAR_SIZE / 3,
    position: 'absolute',
    top: -1 * (AVATAR_SIZE / 3.2 / 2),
    right: -1 * (AVATAR_SIZE / 3.2 / 2),
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: AVATAR_SIZE / 5,
    backgroundColor: '#484848'
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
