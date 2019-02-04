import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  FONT_FAMILY,
  COLOR_BLACK,
  COLOR_GREEN,
  COLOR_DANGER,
  FONT_FAMILY_MEDIUM
} from '../../services/constants';

export default StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 10,
    paddingBottom: wp('4.4%'),
    // paddingBottom: wp('2.58%'),
    backgroundColor: COLOR_BLACK,
    paddingHorizontal: wp('7.73%'),
    paddingTop: wp('1.8%')
  },

  separator: {
    position: 'absolute',
    left: wp('7.33%'),
    right: wp('7.33%'),
    height: 1,
    bottom: 0,
    backgroundColor: 'rgb(157,157,157)'
  },

  sectionHeaderText: {
    color: '#fff',
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('5.33%'),
    flex: 1,
    paddingRight: wp('2.66%'),
    height: wp('9%')
  },

  addText: {
    color: COLOR_GREEN,
    fontSize: wp('4.53%'),
    paddingRight: wp('3.46%'),
    fontFamily: FONT_FAMILY,
    top: -2
  },

  textInput: {
    // height: hp('4.31%'),
    height: wp('9%'),
    padding: 0,
    flex: 1,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('5.33%'),
    color: 'white',
    marginVertical: 0,
    textAlignVertical: 'top',
    paddingRight: wp('2.66%'),
    top: -3
  },

  controlBtnsPanel: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  colorDanger: {
    color: COLOR_DANGER
  }
});
