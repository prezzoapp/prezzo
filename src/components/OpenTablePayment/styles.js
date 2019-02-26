import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import {
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM,
  SF_PRO_TEXT_REGULAR,
  COLOR_GREEN
} from '../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2C2C'
  },

  topContainer: {
    flex: 1,
    marginTop: 0,
    borderBottomColor: COLOR_GREEN,
    borderBottomWidth: 1,
    marginHorizontal: wp('4.26%')
  },

  middleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // height: hp('16.25%'),
    height: wp('35.2%'),
    borderBottomColor: COLOR_GREEN,
    borderBottomWidth: 1,
    marginHorizontal: wp('4.26%')
  },

  bottomContainer: {
    // height: hp('23.39%'),
    height: wp('50.66%'),
    justifyContent: 'center',
    paddingHorizontal: wp('7.46%')
  },

  bottomTextContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  middleTextContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingHorizontal: wp('4.27%'),
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  extraStyleForMiddleTextContainer: {
    // paddingTop: hp('2.95%')
    paddingTop: wp('6.4%')
  },

  flatListStyle: {
    paddingTop: hp('2%')
  },

  flatListContentContainerStyle: {
    paddingTop: hp('2.43%'),
    paddingHorizontal: wp('4.27%')
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
    color: 'white',
    lineHeight: wp('5.86%'),
    flex: 1,
    paddingRight: wp('5.33%')
  },

  price: {
    fontFamily: SF_PRO_TEXT_REGULAR,
    fontSize: wp('4.8%'),
    color: 'white',
    textAlign: 'right',
    lineHeight: wp('5.86%')
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
  },

  separator: {
    height: hp('4.18%')
  }
});

export default styles;
