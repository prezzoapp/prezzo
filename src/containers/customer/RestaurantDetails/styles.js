import { StyleSheet } from 'react-native';

import { FONT_FAMILY, COLOR_WHITE } from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: 'black'
  },

  transparent: {
    backgroundColor: 'transparent'
  },

  photo_back: {
    position: 'absolute',
    height: '40%',
    width: null,
    left: 0,
    right: 0,
    top: 0
  },

  LinearGradientStyle: {
    flex: 1
  },

  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20
  },

  headerTextContainer: {
    flex: 1,
    paddingLeft: 15
  },

  headerTitleText: {
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    fontSize: 20,
    lineHeight: 22
  },

  headerContentTextContainer: {
    flexDirection: 'row',
    paddingTop: 11
  },

  headerContentText: {
    color: COLOR_WHITE,
    fontSize: 18,
    paddingLeft: 19
  },

  listHeaderText: {
    fontSize: 30,
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    paddingBottom: 10
  },

  logo: {
    height: 110,
    width: 110
  },

  buttonStyle: {
    backgroundColor: '#0DD24A',
    borderColor: '#0DD24A'
  },

  buttonText: {}
});

export default styles;
