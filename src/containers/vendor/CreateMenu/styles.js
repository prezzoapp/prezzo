// @flow
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  FONT_FAMILY,
  COLOR_BLACK,
  COLOR_GREEN,
  SF_PRO_TEXT_BOLD
} from '../../../services/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BLACK,
    paddingHorizontal: wp('7.46%')
  },

  sectionListStyle: {
    paddingTop: hp('2%')
  },

  spinnerView: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },

  sectionHeader: {
    borderBottomColor: 'rgb(157,157,157)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: COLOR_BLACK
  },

  sectionHeaderText: {
    color: '#fff',
    fontFamily: FONT_FAMILY,
    fontSize: 20
  },

  addText: {
    color: COLOR_GREEN,
    fontSize: 16,
    paddingRight: 13,
    fontFamily: FONT_FAMILY
  },

  addAnotherCommonBtn: {
    paddingVertical: 10,
    alignSelf: 'flex-start'
  },

  addAnotherCommonBtnText: {
    color: 'rgb(147,147,147)',
    fontFamily: FONT_FAMILY,
    fontSize: 18
  },

  footerSection: {
    padding: 15,
    justifyContent: 'center'
  },

  submitMenuBtn: {
    alignSelf: 'center',
    paddingHorizontal: 40,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgb(15,209,74)',
    elevation: 2
  },

  submitBtnText: {
    color: 'white',
    fontFamily: SF_PRO_TEXT_BOLD,
    fontSize: 15
  },

  controlBtnsPanel: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  textInput: {
    minHeight: 35,
    padding: 0,
    flex: 1,
    fontFamily: FONT_FAMILY,
    fontSize: 20,
    color: 'white',
    marginVertical: 0,
    textAlignVertical: 'top'
  },

  headerLeftBtn: {
    marginLeft: wp('4.4%')
  },

  innerContainer: {
    flex: 1,
    marginBottom: hp('9%')
  }
});
