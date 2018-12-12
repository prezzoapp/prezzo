import { StyleSheet, Dimensions } from 'react-native';
import { Header } from 'react-navigation';

import { FONT_FAMILY_MEDIUM } from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2C2C',
    justifyContent: 'space-between',
    paddingTop: Header.HEIGHT + 5
  },

  map: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom:
      Dimensions.get('window').height - Dimensions.get('window').height * 0.75
  },

  spotText: {
    fontSize: 22,
    color: 'white',
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingBottom: 10,
    paddingHorizontal: 12
  },

  sliderHolder: {
    marginTop: 60,
    paddingHorizontal: 30
  },

  sliderTitleText: {
    color: 'rgb(255,251,245)',
    fontSize: 11
  },

  sliderTitleHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  markerStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },

  searchBarHolder: {
    backgroundColor: 'transparent'
  }
});

export default styles;
