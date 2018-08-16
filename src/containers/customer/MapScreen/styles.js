import { StyleSheet } from 'react-native';
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
    flex: 1,
    width: '100%',
    height: '100%'
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
  }
});

export default styles;
