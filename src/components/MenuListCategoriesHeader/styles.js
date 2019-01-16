import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: COLOR_BLACK,
    paddingHorizontal: wp('7.73%')
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
    height: hp('4.31%')
  },

  addText: {
    color: COLOR_GREEN,
    fontSize: wp('4.53%'),
    paddingRight: wp('3.46%'),
    fontFamily: FONT_FAMILY
  },

  textInput: {
    height: hp('4.31%'),
    padding: 0,
    flex: 1,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('5.33%'),
    color: 'white',
    marginVertical: 0,
    textAlignVertical: 'top',
    paddingRight: wp('2.66%')
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
