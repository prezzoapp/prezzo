import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY,
  COLOR_WHITE
} from '../../../services/constants';

const styles = StyleSheet.create({
  threeDotsImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },

  headerStyle: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2B2C2C'
  },

  headerTextStyle: {
    color: 'white',
    fontSize: 17,
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
    fontSize: 20,
    textAlign: 'center'
  },

  flatListStyle: {
    marginHorizontal: 15,
    paddingTop: 10,
    paddingBottom: hp('9%')
  }
});

export default styles;
