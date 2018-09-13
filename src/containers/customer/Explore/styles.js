// @flow
import { StyleSheet } from 'react-native';
import { FONT_FAMILY, COLOR_WHITE } from '../../../services/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2C2C'
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  message: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: 15,
    marginTop: 20
  }
});
