import { StyleSheet } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { FONT_FAMILY } from '../../services/constants';

const styles = StyleSheet.create({
  searchInputHolder: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('5.17%'),
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },

  searchTextInput: {
    flex: 1,
    padding: 0,
    margin: 0,
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 5,
    color: 'white',
    alignSelf: 'stretch'
  },

  LinearGradientStyle: {
    height: hp('3.69%'),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    position: 'relative'
  },

  placeholder: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },

  searchText: {
    fontSize: 16,
    justifyContent: 'center',
    color: 'rgb(151, 151, 151)',
    fontFamily: FONT_FAMILY,
    top: -1,
    paddingLeft: 3
  },

  cancelBtn: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'transparent',
    height: 28,
    justifyContent: 'center'
  },

  cancelBtnText: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 16,
    fontFamily: FONT_FAMILY
  }
});

export default styles;
