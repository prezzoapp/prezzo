import { StyleSheet } from 'react-native';

import { FONT_FAMILY, FONT_FAMILY_MEDIUM } from '../../services/constants';

const styles = StyleSheet.create({
  restaurantName: {
    fontSize: 17,
    color: 'white',
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingTop: 8
  },

  cityName: {
    paddingTop: 6,
    fontSize: 14,
    color: '#959595',
    fontFamily: FONT_FAMILY
  },

  image: {
    width: '100%',
    height: 150
  }
});

export default styles;
