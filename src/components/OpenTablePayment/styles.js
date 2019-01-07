import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import {
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM,
  SF_PRO_TEXT_REGULAR
} from '../../services/constants';

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

  name: {
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('4.8%'),
    color: 'white'
  },

  price: {
    fontFamily: SF_PRO_TEXT_REGULAR,
    fontSize: wp('4.8%'),
    color: 'white',
    textAlign: 'right'
  },

  cardTitle: {
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.53%'),
    color: '#959595'
  },

  cardValue: {
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('5.33%'),
    color: 'white'
  },

  subTotalTaxLabel: {
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('4.8%'),
    color: 'white'
  },

  subTotalTaxValue: {
    fontFamily: FONT_FAMILY,
    color: 'white',
    fontSize: wp('4.8%')
  },

  total: {
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('4.8%'),
    color: 'white',
    textAlign: 'right'
  }
});

export default styles;
