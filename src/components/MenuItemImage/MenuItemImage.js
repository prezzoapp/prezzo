// @flow
import React, { Component } from 'react';
import { TouchableOpacity, View, ActionSheetIOS, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagePicker, ImageManipulator, Permissions } from 'expo';
import { ActionSheet } from 'native-base';
import PropTypes from 'prop-types';
import { Ionicons } from '../VectorIcons';
import { getTimeStampString, showAlertWithMessage } from '../../services/commonFunctions';
import CacheImage from '../CacheImage';
import styles from './styles';

class ItemImagePicker extends React.Component<Props> {
  state = {
    selectImageThroughImagePicker: false
  };

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
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        quality: 0.1
      });

      if (!result.cancelled) {
        const resultEdited = await ImageManipulator.manipulate(
          result.uri,
          [{ resize: { width: 200 }}],
          { format: 'jpeg', compress: 0.1 }
        );

        this.setState({
          selectImageThroughImagePicker: true
        }, () => {
          this.setState({ tempImage: resultEdited.uri });

          const fileName = `${getTimeStampString()}.jpeg`;
          this.props
            .uploadImage(
              resultEdited.uri,
              10,
              'image/jpeg',
              fileName,
              'userAvatar',
              'public-read'
            )
            .then(async itemImage => {
              this.props.addNewImageComponent(itemImage).then(() => {
                this.setState({
                  selectImageThroughImagePicker: false
                }, () => {
                  this.setState({
                    tempImage: itemImage
                  });
                });
              }).catch(err => {});
            });
        });
      }
    } catch(err) {
      showAlertWithMessage('Uh-oh!', err);
    }
  };

  openCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 0.3
      });

      if (!result.cancelled) {
        const resultEdited = await ImageManipulator.manipulate(
          result.uri,
          [{ resize: { width: 200 }}],
          { format: 'jpeg', compress: 0.1 }
        );

        this.setState({
          selectImageThroughImagePicker: true
        }, () => {
          this.setState({ tempImage: resultEdited.uri });

          const fileName = `${getTimeStampString()}.jpeg`;
          this.props
            .uploadImage(
              resultEdited.uri,
              10,
              'image/jpeg',
              fileName,
              'userAvatar',
              'public-read'
            )
            .then(async itemImage => {
              this.props.addNewImageComponent(itemImage).then(() => {
                this.setState({
                  selectImageThroughImagePicker: false
                }, () => {
                  this.setState({
                    tempImage: itemImage
                  });
                });
              }).catch(err => {});
            });
        });
      }
    } catch(err) {
      showAlertWithMessage('Uh-oh!', err);
    }
  };

  openCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 0.3
      });

      if (!result.cancelled) {
        const resultEdited = await ImageManipulator.manipulate(
          result.uri,
          [{ resize: { width: 200 }}],
          { format: 'jpeg', compress: 0.1 }
        );
        const fileName = `${getTimeStampString()}.jpeg`;
        this.props
          .uploadImage(
            resultEdited.uri,
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
    } catch(err) {
      showAlertWithMessage('Uh-oh!', err);
    }
  };

  render() {
    const image = this.state.tempImage || this.props.image || '';

    return (
      <View style={styles.holder}>
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
              size={wp('3%')}
              style={{ padding: 0, top: wp('0.17%'), position: 'relative', left: wp('0.13%') }}
            />
          </TouchableOpacity>
        )}

        {image === '' ? (
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
              selectImageThroughImagePicker={this.state.selectImageThroughImagePicker}
              source={image}
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

export default ItemImagePicker;
