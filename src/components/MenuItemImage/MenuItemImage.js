// @flow
import React, { Component } from 'react';
import { TouchableOpacity, View, ActionSheetIOS, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagePicker, ImageManipulator, Permissions } from 'expo';
import { ActionSheet } from 'native-base';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons'
import { getTimeStampString, showAlertWithMessage } from '../../services/commonFunctions';
import styles from './styles';
import showGenericAlert from '../GenericAlert';
import CacheImage from '../CacheImage';

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
          { format: 'jpeg', compress: 0.8 }
        );

        this.setState({
          selectImageThroughImagePicker: true
        }, async () => {
          try {
            this.setState({ tempImage: resultEdited.uri });
            const fileName = `${getTimeStampString()}.jpeg`;
            const itemImage = await this.props
              .uploadImage(
                resultEdited.uri,
                10,
                'image/jpeg',
                fileName,
                'userAvatar',
                'public-read'
              );

            await this.props.addNewImageComponent(itemImage);

            this.setState({
              selectImageThroughImagePicker: false
            }, () => {
              this.setState({
                tempImage: itemImage
              });
            });
          } catch(err) {
            showAlertWithMessage('Uh-oh!', err);
          }
        });
      }
    } catch(err) {
      showAlertWithMessage('Uh-oh!', err);
    }
  };

  openCamera = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        quality: 0.2
      });

      if (!result.cancelled) {
        const resultEdited = await ImageManipulator.manipulate(
          result.uri,
          [{ resize: { width: 200 }}],
          { format: 'jpeg', compress: 0.8 }
        );

        this.setState({
          selectImageThroughImagePicker: true
        }, async () => {
          try {
            this.setState({ tempImage: resultEdited.uri });
            const fileName = `${getTimeStampString()}.jpeg`;
            const itemImage = await this.props
              .uploadImage(
                resultEdited.uri,
                10,
                'image/jpeg',
                fileName,
                'userAvatar',
                'public-read'
              );

            await this.props.addNewImageComponent(itemImage);

            this.setState({
              selectImageThroughImagePicker: false
            }, () => {
              this.setState({
                tempImage: itemImage
              });
            });
          } catch(err) {
            showAlertWithMessage('Uh-oh!', err);
          }
        });
      }
    } catch(err) {
      showAlertWithMessage('Uh-oh!', err);
    }
  };

  deleteImageComponent = image => {
    showGenericAlert(null, 'Are you sure you want to delete this menu item image?', [
      {
        text: 'Yes',
        onPress: () => this.props.deleteImageComponent(image)
      },
      {
        text: 'No',
        onPress: () => null,
        style: 'cancel'
      }
    ]);
  };

  render() {
    const image = this.state.tempImage || this.props.image || '';

    return (
      <View style={styles.holder}>
        {this.props.editable && (
          <TouchableOpacity
            style={styles.closeBtn}
            activeOpacity={0.6}
            onPress={() => this.deleteImageComponent(image)}
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
            <Image
              style={styles.itemImage}
              source={require('../../../assets/images/default_image_placeholder.png')}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.itemImagePickerBtn}>
            <Image
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
