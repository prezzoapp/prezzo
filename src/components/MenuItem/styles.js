// @flow
import { StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FONT_FAMILY, COLOR_GREEN, FONT_FAMILY_MEDIUM } from '../../services/constants';

export default StyleSheet.create({
  menuItem: {
    // marginBottom: hp('3.69%'),
    marginBottom: wp('3.86%'),
    marginHorizontal: wp('7.73%')
  },
  twoLineIconBtn: {
    paddingLeft: wp('2.66%'),
    paddingRight: wp('4%'),
    // paddingTop: wp('4.13%'),
    // paddingBottom: wp('4.66%')
  },
  twoLineIconBtnImage: {
    width: wp('5.86%'),
    height: hp('1.23%'),
    resizeMode: 'contain'
  },
  controlBtnsStyle: {
    // lineHeight: wp('5.86%')
  },
  itemContainer: {
    paddingHorizontal: wp('3.2%'),
    backgroundColor: '#404040',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    paddingVertical: wp('3.2%')
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  sectionHeaderText: {
    color: '#fff',
    fontFamily: FONT_FAMILY,
    fontSize: wp('5.33%'),
    flex: 1,
    lineHeight: wp('5.86%')
  },
  otherInfoText: {
    fontSize: wp('5.33%'),
    color: '#fff',
    fontFamily: FONT_FAMILY
  },
  otherInfoTextInput: {
    fontSize: wp('5.33%'),
    color: '#fff',
    fontFamily: FONT_FAMILY,
    minHeight: wp('6.13%'),
    // minHeight: 50,
    textAlignVertical: 'top',
    padding: 0
  },

  addText: {
    color: COLOR_GREEN,
    fontSize: wp('4.53%'),
    fontFamily: FONT_FAMILY,
    lineHeight: wp('5.7%')
  },

  paddingBottom_21: {
    // paddingBottom: hp('2.58%')
    paddingBottom: wp('5.6%')
  },
  itemImagesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  itemImagePickerBtn: {
    borderRadius: 8,
    marginRight: wp('2.66%'),
    width: wp('18.66%'),
    height: wp('18.66%'),
    marginTop: hp('1.84%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  controlBtnsPanel: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: wp('11.36%')
  },
  textInput: {
    minHeight: wp('6.13%'),
    padding: 0,
    flex: 1,
    fontFamily: FONT_FAMILY,
    fontSize: wp('5.33%'),
    color: 'white',
    marginVertical: 0,
    textAlignVertical: 'top'
  },
  extra$TextStyle: {
    paddingTop: Platform.OS === 'ios' ? wp('1%') : 0
  }
});
