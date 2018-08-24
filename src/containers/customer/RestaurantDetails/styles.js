import { StyleSheet } from 'react-native';

import { Header } from 'react-navigation';

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
    width: 110,
    borderRadius: 15
  },

  buttonStyle: {
    backgroundColor: '#0DD24A',
    borderColor: '#0DD24A'
  },

  buttonText: {},

  toggleBtnsSection: {
    alignItems: 'center',
    paddingBottom: 20
  },

  buttonHolder: {
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.31)',
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerBtns: {
    paddingVertical: 3,
    alignItems: 'center',
    width: 80,
    borderRadius: 15,
    justifyContent: 'center'
  },

  headerBtnText: {
    color: 'white',
    fontFamily: FONT_FAMILY,
    fontSize: 14
  },

  toggleView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 80,
    borderRadius: 15
  },

  linearGradientBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  selectedBtnText: {
    color: '#0DD24A',
    fontSize: 14,
    fontFamily: FONT_FAMILY
  },

  bottomViewHolder: {
    paddingHorizontal: 15,
    height: 65,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2ED573'
  },

  totalPrice: {
    fontSize: 14,
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    marginRight: 40
  }
});

export default styles;
