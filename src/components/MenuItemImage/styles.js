// @flow
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  itemImagePickerBtn: {
    borderRadius: 12,
    marginRight: 15,
    elevation: 5,
    width: 81,
    height: 81,
    marginTop: 15
  },
  itemImage: {
    resizeMode: 'cover',
    borderRadius: 8,
    width: 81,
    height: 81,
    borderWidth: 1,
    borderColor: 'rgb(164,164,164)'
  },
  closeBtn: {
    width: 18,
    height: 18,
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 9999,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeBtnIcon: {
    fontWeight: 'bold'
  }
});
