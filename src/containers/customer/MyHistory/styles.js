import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { COLOR_BLACK, COLOR_WHITE, FONT_FAMILY } from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BLACK,
    paddingLeft: wp('5%')
  },
  headerLeftBtn: {
    marginLeft: wp('4.4%')
  },

  contentContainerStyle: {
    paddingTop: wp('10.66%'),
    flexGrow: 1,
    paddingBottom: getBottomSpace() + 49 + wp('5%')
  },

  message: {
    fontSize: wp('5.33%'),
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    textAlign: 'center'
  }
});

export default styles;
