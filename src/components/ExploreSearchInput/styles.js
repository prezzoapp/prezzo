import { StyleSheet } from 'react-native';

import {
  FONT_FAMILY
} from '../../services/constants';

const styles = StyleSheet.create({
  searchInputHolder: {
    marginHorizontal: 15
  },

  searchTextInput: {
    flex: 1,
    padding: 0,
    margin: 0,
    paddingHorizontal: 10,
    fontSize: 15,
    color: 'white',
    alignSelf: 'stretch'
  },

  LinearGradientStyle: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    position: 'relative',
    elevation: 2
  },

  placeholder: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center'
  },

  searchText: {
    fontSize: 18,
    justifyContent: 'center',
    color: 'rgb(151, 151, 151)',
    fontFamily: FONT_FAMILY
  }
});

export default styles;
