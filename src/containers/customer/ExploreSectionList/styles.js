import { StyleSheet } from 'react-native';

import { FONT_FAMILY_BOLD } from '../../../services/constants';

const styles = StyleSheet.create({
  threeDotsImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },

  headerStyle: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2B2C2C'
  },

  headerTextStyle: {
    color: 'white',
    fontSize: 17,
    fontFamily: FONT_FAMILY_BOLD
  }
});

export default styles;
