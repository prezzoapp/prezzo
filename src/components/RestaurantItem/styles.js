import { StyleSheet } from 'react-native';

import {
  COLOR_WHITE,
  COLOR_GREEN,
  FONT_FAMILY_MEDIUM
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
  }
});

export default styles;
