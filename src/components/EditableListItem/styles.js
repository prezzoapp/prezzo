// @flow
import { StyleSheet } from 'react-native';
import { FONT_FAMILY } from '../../services/constants';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 'auto',
    justifyContent: 'center',
    width: '100%'
  },
  icon: {
    height: '100%',
    resizeMode: 'contain',
    width: '100%'
  },
  iconContainer: {
    height: 25,
    marginRight: 5,
    width: 25
  },
  text: {
    alignItems: 'center',
    color: '#fff',
    flex: 1,
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5
  },

  expDate: {
    color: '#fff',
    flex: 1,
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5
  }
});
