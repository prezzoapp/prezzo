// @flow
import React, { Component } from 'react';
import { TouchableOpacity, Image, View, ActionSheetIOS } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import PropTypes from 'prop-types';
import { Ionicons } from '../VectorIcons';
import { getTimeStampString } from '../../services/commonFunctions';
import styles from './styles';

export default class ItemImagePicker extends Component {
  itemPickerActionSheet = () => {
    const options = {
      title: "Select an Item's Image",
      maxWidth: 800,
      quality: 0.3
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image upload');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.props
          .uploadImage(
            response.uri,
            response.fileSize,
            'image/jpeg',
            response.fileName,
            'userAvatar',
            'public-read'
          )
          .then(async itemImage => {
            this.props.addNewImageComponent(itemImage);
          });
      }
    });
  };

  showAvatarActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
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
      const fileName = `${getTimeStampString()}.jpg`;
      this.props
        .uploadImage(
          result.uri,
          10,
          'image/jpeg',
          fileName,
          'userAvatar',
          'public-read'
        )
        .then(async itemImage => {
          this.props.addNewImageComponent(itemImage);
        });
    }
  };

  openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.3
    });

    if (!result.cancelled) {
      const fileName = `${getTimeStampString()}.jpg`;
      this.props
        .uploadImage(
          result.uri,
          10,
          'image/jpeg',
          fileName,
          'userAvatar',
          'public-read'
        )
        .then(async itemImage => {
          this.props.addNewImageComponent(itemImage);
        });
    }
  };

  render() {
    return (
      <View>
        {this.props.editable && (
          <TouchableOpacity
            style={styles.closeBtn}
            activeOpacity={0.6}
            onPress={() => this.props.deleteImageComponent(this.props.image)}
          >
            <Ionicons
              title="Delete"
              name="md-close"
              color="black"
              size={14}
              style={styles.closeBtnIcon}
            />
          </TouchableOpacity>
        )}

        {this.props.image === '' ? (
          <TouchableOpacity
            onPress={this.showAvatarActionSheet}
            style={styles.itemImagePickerBtn}
          >
            <Image
              style={styles.itemImage}
              source={
                this.props.image
                  ? { uri: this.props.image }
                  : require('../../../assets/images/default_image_placeholder.png')
              }
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.itemImagePickerBtn}>
            <Image
              style={styles.itemImage}
              source={
                this.props.image
                  ? { uri: this.props.image }
                  : require('../../../assets/images/default_image_placeholder.png')
              }
            />
          </View>
        )}
      </View>
    );
  }
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
