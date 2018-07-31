import { StyleSheet } from 'react-native';

import { FONT_FAMILY, FONT_FAMILY_MEDIUM } from '../../services/constants';

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 128,
    elevation: 5
  },

  restaurantName: {
    fontSize: 15,
    color: 'white',
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingTop: 8
  },

  cityName: {
    paddingTop: 6,
    fontSize: 15,
    color: '#959595',
    fontFamily: FONT_FAMILY
  }
});

export default styles;
