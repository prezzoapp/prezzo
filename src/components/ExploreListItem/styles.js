import { StyleSheet } from 'react-native';

import { SF_PRO_TEXT_MEDIUM } from '../../services/constants';

const styles = StyleSheet.create({
  restaurantName: {
    fontSize: 17,
    color: 'white',
    fontFamily: SF_PRO_TEXT_MEDIUM,
    paddingTop: 8
  },

  cityName: {
    paddingTop: 6,
    fontSize: 14,
    color: '#959595',
    fontFamily: SF_PRO_TEXT_MEDIUM
  },

  image: {
    width: '100%',
    height: 150
  }
});

export default styles;
