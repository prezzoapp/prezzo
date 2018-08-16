import { StyleSheet } from 'react-native';

import { FONT_FAMILY, COLOR_WHITE } from '../../services/constants';

const styles = StyleSheet.create({
  filteredRestaurantsBottomCardHolder: {
    backgroundColor: 'rgb(51,51,51)',
    flex: 0.4,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 5
  },

  listItemBtn: {
    paddingHorizontal: 15,
    paddingVertical: 15
  },

  titleHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  statusImage: {
    height: 18,
    width: 18,
    resizeMode: 'contain'
  },

  name: {
    fontSize: 20,
    fontFamily: FONT_FAMILY,
    color: 'white',
    flex: 1,
    paddingRight: 5
  },

  distance: {
    fontSize: 18,
    fontFamily: FONT_FAMILY,
    color: 'white'
  },

  status: {
    color: 'rgb(46,214,116)',
    fontFamily: FONT_FAMILY,
    paddingLeft: 15,
    position: 'relative',
    top: -4
  },

  statusHolder: {
    flexDirection: 'row',
    paddingTop: 10
  },

  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgb(59,97,74)'
  },

  vendorInfoHolder: {
    flex: 1,
    padding: 15
  },

  contentHolder: {
    flexDirection: 'row',
    paddingHorizontal: 15
  },

  vendorIconHolder: {
    height: 48,
    width: 48,
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: 5
  },

  vendorIcon: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
    resizeMode: 'cover'
  },

  vendorContentHolder: {
    paddingLeft: 30,
    flex: 1
  },

  vendorName: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: 25,
    lineHeight: 30,
    top: -5
  },

  vendorAddress: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: 15,
    lineHeight: 22,
    top: -2,
    padding: 0,
    margin: 0
  },

  vendorInfoSectionSeparator: {
    marginVertical: 15,
    alignSelf: 'stretch',
    height: 1,
    backgroundColor: 'rgb(59,97,74)'
  },

  milesText: {
    color: '#959595',
    paddingLeft: 10,
    fontFamily: FONT_FAMILY,
    fontSize: 17
  },

  iconTextHolder: {
    alignItems: 'center',
    flexDirection: 'row'
  }
});

export default styles;
