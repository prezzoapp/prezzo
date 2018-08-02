import { StyleSheet } from 'react-native';

import { FONT_FAMILY, FONT_FAMILY_MEDIUM } from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2C2C',
    justifyContent: 'flex-end'
  },

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  listItemBtn: {
    paddingHorizontal: 15,
    paddingVertical: 15
  },

  titleHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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

  statusImage: {
    height: 18,
    width: 18,
    resizeMode: 'contain'
  },

  searchSpotHolder: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 50,
    zIndex: 999
  },

  spotText: {
    fontSize: 22,
    color: 'white',
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingBottom: 10,
    paddingHorizontal: 12
  },

  filteredRestaurantsListHolder: {
    backgroundColor: 'rgb(51,51,51)',
    flex: 0.35,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 5
  }
});

export default styles;
