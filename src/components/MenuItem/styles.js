// @flow
import {StyleSheet} from 'react-native';
import {
  FONT_FAMILY,
  COLOR_GREEN
} from '../../services/constants';

export default StyleSheet.create({
  menuItem: {
    marginBottom: 8
  },
  twoLineIconBtn: {
    paddingLeft: 10,
    paddingRight: 15,
    paddingVertical: 10
  },
  itemContainer: {
    paddingHorizontal: 15,
    backgroundColor: '#404040',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    paddingBottom: 15
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingTop: 10
  },
  sectionHeaderText: {
    color: '#fff',
    fontFamily: FONT_FAMILY,
    fontSize: 17,
    flex: 1
  },
  otherInfoText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: FONT_FAMILY
  },
  otherInfoTextInput: {
    fontSize: 15,
    color: '#fff',
    fontFamily: FONT_FAMILY,
    minHeight: 50,
    // backgroundColor: 'red',
    textAlignVertical: 'top',
    padding: 0
  },

  addText: {
    color: COLOR_GREEN,
    fontSize: 15,
    fontFamily: FONT_FAMILY
  },
  paddingBottom_10: {
    paddingBottom: 10
  },
  itemImagesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }, itemImagePickerBtn: {
    borderRadius: 8,
    marginRight: 15,
    width: 81,
    height: 81,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  controlBtnsPanel: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  textInput: {
    minHeight: 35,
    padding: 0,
    flex: 1,
    fontFamily: FONT_FAMILY,
    fontSize: 17,
    color: 'white',
    marginVertical: 0,
    textAlignVertical: 'top'
  }
});
