// @flow
import React, { Component } from 'react';
import { TouchableOpacity, View, ActionSheetIOS, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagePicker, ImageManipulator, Permissions } from 'expo';
import { ActionSheet } from 'native-base';
import PropTypes from 'prop-types';
import { Ionicons } from '../VectorIcons';
import CacheImage from '../CacheImage';
import { getTimeStampString } from '../../services/commonFunctions';
import styles from './styles';

const ItemImagePicker = props => {
  showAvatarActionSheet = () => {
    ActionSheet.show(
      {
        options: ['Take Photo', 'Choose from Library', 'Cancel'],
        cancelButtonIndex: 2,
        title: "Select an Item's Image"
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.requestCameraPermission();
        } else if (buttonIndex === 1) {
          this.requestPhotoLibraryPermission();
        }
      }
    );
  }

  requestPhotoLibraryPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      this.openImageGallery();
    }
  };

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      this.openCamera();
    }
  };

  openImageGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 0.3
    });

    if (!result.cancelled) {
      const resultEdited = await ImageManipulator.manipulate(
        result.uri,
        [{ resize: { width: 200 }}],
        { format: 'jpeg', compress: 0.8 }
      );
      const fileName = `${getTimeStampString()}.jpeg`;
      props
        .uploadImage(
          resultEdited.uri,
          10,
          'image/jpeg',
          fileName,
          'userAvatar',
          'public-read'
        )
        .then(async itemImage => {
          props.addNewImageComponent(itemImage);
        });
    }
  };

  openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.1
    });

    if (!result.cancelled) {
      const resultEdited = await ImageManipulator.manipulate(
        result.uri,
        [{ resize: { width: 200 }}],
        { format: 'jpeg', compress: 0.1 }
      );
      const fileName = `${getTimeStampString()}.jpeg`;
      props
        .uploadImage(
          resultEdited.uri,
          10,
          'image/jpeg',
          fileName,
          'userAvatar',
          'public-read'
        )
        .then(async itemImage => {
          props.addNewImageComponent(itemImage);
        });
    }
  };

  return (
    <View style={styles.holder}>
      {props.editable && (
        <TouchableOpacity
          style={styles.closeBtn}
          activeOpacity={0.6}
          onPress={() => props.deleteImageComponent(props.image)}
        >
          <Ionicons
            title="Delete"
            name="md-close"
            color="black"
            size={wp('3%')}
            style={{ padding: 0, top: wp('0.17%'), position: 'relative', left: wp('0.13%') }}
          />
        </TouchableOpacity>
      )}

      {props.image === '' ? (
        <TouchableOpacity
          onPress={this.showAvatarActionSheet}
          style={styles.itemImagePickerBtn}
        >
          <CacheImage
            style={styles.itemImage}
            type='image'
            source={require('../../../assets/images/default_image_placeholder.png')}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.itemImagePickerBtn}>
          <CacheImage
            style={styles.itemImage}
            type='image'
            source={props.image}
          />
        </View>
      )}
    </View>
  );
}

ItemImagePicker.propTypes = {
  editable: PropTypes.bool,
  addNewImageComponent: PropTypes.func,
  deleteImageComponent: PropTypes.func,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

ItemImagePicker.defaultProps = {
  editable: false,
  addNewImageComponent: null,
  deleteImageComponent: null
};

export default ItemImagePicker;
