import { StyleSheet } from 'react-native';

import { FONT_FAMILY } from '../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B2C2C'
  },

  text: {
    fontFamily: FONT_FAMILY,
    fontSize: 25,
    color: 'white'
  }
});

export default styles;
