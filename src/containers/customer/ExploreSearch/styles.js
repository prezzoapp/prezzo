import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { FONT_FAMILY, COLOR_WHITE } from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },

  listHolder: {
    flex: 1,
    marginTop: hp('11.57%')
  },

  listSeparator: {
    height: 1,
    backgroundColor: '#979797'
  },

  loaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  message: {
    color: COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: 20
  },

  flatListStyle: {
    paddingBottom: hp('9%')
  }
});

export default styles;
