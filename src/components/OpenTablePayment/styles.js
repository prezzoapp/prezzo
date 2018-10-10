import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { FONT_FAMILY } from '../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2B2C2C'
  },

  sectionHeader: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  sectionHeaderText: {
    color: '#fff',
    fontFamily: FONT_FAMILY,
    fontSize: 20,
    marginBottom: 5
  },

  text: {
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.8%'),
    color: 'white'
  },

  cardTitle: {
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.53%'),
    color: '#959595'
  },

  cardValue: {
    fontFamily: FONT_FAMILY,
    fontSize: wp('5.33%'),
    color: 'white'
  }
});

export default styles;
