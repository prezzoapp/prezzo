import { StyleSheet } from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { ifIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper';

import { SF_PRO_DISPLAY_REGULAR } from '../../services/constants';

const styles = StyleSheet.create({
  searchInputHolder: {
    marginHorizontal: wp('4%'),
    flexDirection: 'row',
    alignItems: 'center',
    ...ifIphoneX(
      {
        marginTop: getStatusBarHeight(['safe'])
      },
      {
        marginTop: getStatusBarHeight() + wp('1%')
      }
    ),
    height: wp('8%'),
    zIndex: 99
  },

  searchTextInput: {
    flex: 1,
    padding: 0,
    margin: 0,
    fontSize: wp('4.26%'),
    paddingLeft: wp('2.66%'),
    paddingRight: 5,
    color: 'white',
    alignSelf: 'stretch'
  },

  LinearGradientStyle: {
    height: wp('8%'),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    position: 'relative'
  },

  placeholder: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center'
  },

  searchText: {
    fontSize: wp('4.26%'),
    justifyContent: 'center',
    color: 'rgb(151, 151, 151)',
    fontFamily: SF_PRO_DISPLAY_REGULAR,
    top: -1,
    paddingLeft: 3
  },

  cancelBtn: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },

  cancelBtnText: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: wp('4.26%'),
    fontFamily: SF_PRO_DISPLAY_REGULAR
  }
});

export default styles;
