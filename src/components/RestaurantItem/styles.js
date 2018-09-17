import { StyleSheet } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {
  COLOR_WHITE,
  COLOR_GREEN,
  FONT_FAMILY_MEDIUM,
  FONT_FAMILY
} from '../../services/constants';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10
  },

  itemTitle: {
    color: COLOR_GREEN,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: 20
  },

  itemIngradients: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: 20
  },

  leftSideContainer: {
    paddingRight: 55,
    flex: 1
  },

  rightSideContainer: {
    paddingRight: 10
  },

  itemTitleInPhotoMode: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: 18,
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 20
  },

  itemImage: {
    flex: 1,
    height: 250,
    marginHorizontal: 10,
    borderRadius: 13,
    overflow: 'hidden',
    justifyContent: 'flex-end'
  },

  itemContainer: {
    height: 250
  },

  itemImageLinearGradient: {
    flex: 0.4
  },

  bottomContentHolder: {
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 15,
    left: 30,
    right: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },

  controlButtons: {
    paddingHorizontal: 13,
    height: hp('4.55%'),
    backgroundColor: 'rgba(46,213,115, 0.7)',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  quantityTextStyleInPhotoMode: {
    fontSize: 16,
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    paddingHorizontal: 7
  }
});

export default styles;
