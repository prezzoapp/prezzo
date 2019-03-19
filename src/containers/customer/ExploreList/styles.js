import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { getBottomSpace } from 'react-native-iphone-x-helper';

import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY,
  COLOR_WHITE
} from '../../../services/constants';

const styles = StyleSheet.create({
  threeDotsImage: {
    width: wp('5%'),
    height: wp('4%'),
    resizeMode: 'contain'
  },

  headerStyle: {
    padding: wp('4%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2B2C2C'
  },

  headerTextStyle: {
    color: 'white',
    fontSize: wp('4.53%'),
    fontFamily: FONT_FAMILY_BOLD
  },

  notFoundHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  message: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: wp('5.33%'),
    textAlign: 'center'
  },

  flatListContentContainerStyle: {
    marginHorizontal: wp('4%'),
    marginTop: wp('2%'),
    paddingBottom: getBottomSpace() + 49 + wp('5%'),
    flexGrow: 1
  },

  flatListStyle: {
    // ...ifIphoneX(
    //   {
    //     marginTop: wp('41.6%')
    //   },
    //   {
    //     marginTop: wp('35.2%')
    //   }
    // )
  },

  seperator: {
    paddingBottom: wp('6.66%')
  }
});

export default styles;
