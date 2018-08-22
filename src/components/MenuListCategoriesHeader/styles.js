import {StyleSheet} from 'react-native';
import { FONT_FAMILY, COLOR_BLACK, COLOR_GREEN, COLOR_DANGER } from '../../services/constants';

export default StyleSheet.create({
  sectionHeader: {
    borderBottomColor: 'rgb(157,157,157)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: COLOR_BLACK
  },

  sectionHeaderText: {
    color: '#fff',
    fontFamily: FONT_FAMILY,
    fontSize: 20,
    flex: 1,
    paddingRight: 10
  },

  addText: {
    color: COLOR_GREEN,
    fontSize: 16,
    paddingRight: 13,
    fontFamily: FONT_FAMILY
  },

  textInput: {
    minHeight: 35,
    padding: 0,
    flex: 1,
    fontFamily: FONT_FAMILY,
    fontSize: 20,
    color: 'white',
    marginVertical: 0,
    textAlignVertical: 'top',
    paddingRight: 10
  },

  controlBtnsPanel: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  colorDanger: {
    color: COLOR_DANGER
  }
});
