// @flow
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FONT_FAMILY, COLOR_GREEN, FONT_FAMILY_MEDIUM } from '../../services/constants';

export default StyleSheet.create({
  menuItem: {
    marginBottom: hp('3.69%'),
    marginHorizontal: wp('7.73%')
  },
  twoLineIconBtn: {
    paddingLeft: 10,
    paddingRight: 15,
    paddingVertical: 10
  },
  twoLineIconBtnImage: {
    width: wp('5.86%'),
    height: hp('1.23%'),
    resizeMode: 'contain'
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
    fontSize: 17,
    flex: 1
  },
  otherInfoText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: FONT_FAMILY
  },
  otherInfoTextInput: {
    fontSize: 15,
    color: '#fff',
    fontFamily: FONT_FAMILY,
    minHeight: 50,
    textAlignVertical: 'top',
    padding: 0
  },

  addText: {
    color: COLOR_GREEN,
    fontSize: 15,
    fontFamily: FONT_FAMILY
  },
  paddingBottom_10: {
    paddingBottom: hp('2.58%')
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
    alignItems: 'center'
  },
  textInput: {
    minHeight: 35,
    padding: 0,
    flex: 1,
    fontFamily: FONT_FAMILY,
    fontSize: 17,
    color: 'white',
    marginVertical: 0,
    textAlignVertical: 'top'
  }
});
