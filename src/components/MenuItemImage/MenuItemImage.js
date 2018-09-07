// @flow
import React, { Component } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
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

  render() {
    return (
      <View>
        {this.props.editable && (
          <TouchableOpacity
            style={styles.closeBtn}
            activeOpacity={0.6}
            onPress={() => this.props.deleteImageComponent(this.props.image)}
          >
            <Icon
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
            onPress={this.itemPickerActionSheet}
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
  editable: PropTypes.bool.isRequired,
  addNewImageComponent: PropTypes.func.isRequired,
  deleteImageComponent: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired
};
