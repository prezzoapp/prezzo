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
import showGenericAlert from '../GenericAlert';

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
        const itemImage = await props
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
    } catch(err) {
      showAlertWithMessage('Uh-oh!', err);
    }
  };

  deleteImageComponent = () => {
    showGenericAlert(null, 'Are you sure you want to delete this menu item image?', [
      {
        text: 'Yes',
        onPress: () => props.deleteImageComponent()
      },
      {
        text: 'No',
        onPress: () => null,
        style: 'cancel'
      }
    ]);
  };

  return (
    <View style={styles.holder}>
      {props.editable && (
        <TouchableOpacity
          style={styles.closeBtn}
          activeOpacity={0.6}
          onPress={() => deleteImageComponent()}
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
          <Image
            style={styles.itemImage}
            source={
              props.image
                ? { uri: props.image }
                : require('../../../assets/images/default_image_placeholder.png')
            }
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.itemImagePickerBtn}>
          <Image
            style={styles.itemImage}
            source={
              props.image
                ? { uri: props.image }
                : require('../../../assets/images/default_image_placeholder.png')
            }
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
