// @flow
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  itemImagePickerBtn: {
    borderRadius: 12,
    marginRight: wp('2.66%'),
    elevation: 5,
    width: wp('18.66%'),
    height: wp('18.66%'),
    marginTop: hp('1.84%')
  },
  itemImage: {
    resizeMode: 'cover',
    borderRadius: 8,
    width: wp('18.66%'),
    height: wp('18.66%'),
    borderWidth: 1,
    borderColor: 'rgb(164,164,164)'
  },
  closeBtn: {
    width: wp('4%'),
    height: wp('4%'),
    borderRadius: wp('2%'),
    backgroundColor: 'white',
    position: 'absolute',
    top: wp('1.33%'),
    right: wp('1.06%'),
    zIndex: 9999,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
