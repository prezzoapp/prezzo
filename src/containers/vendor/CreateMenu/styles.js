// @flow
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getBottomSpace } from 'react-native-iphone-x-helper';
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
    paddingTop: wp('6%')
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

  // sectionListContentContainerStyle: {
  //   paddingBottom: 150
  // },
  //
  // sectionListStyle: {
  //   marginBottom: getBottomSpace() + 49
  // },

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
    paddingBottom: hp('2.21%'),
    alignSelf: 'flex-start'
  },

  addAnotherCommonBtnText: {
    color: 'rgb(147,147,147)',
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.53%')
  },

  footerSection: {
    paddingVertical: wp('5.86%'),
    justifyContent: 'center',
    alignItems: 'center'
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
    backgroundColor: COLOR_BLACK,
    position: 'relative',
    paddingBottom: getBottomSpace() + 49
  },

  listFooterHolder: {
    paddingHorizontal: wp('7.33%'),
    // paddingBottom: getBottomSpace() + wp('21.32%') + 49
  },

  sectionFooterHolder: {
    paddingHorizontal: wp('7.33%')
  }
});
