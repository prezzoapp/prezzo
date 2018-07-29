// @flow
import React, {Component} from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default class ItemImagePicker extends Component {
  constructor(props) {
    super(props);
    console.log('Array Length: ' + this.props.imagesArrayLength);

    this.state = {itemImage: null};
  }

  componentDidMount() {
    this.setState({itemImage: this.props.image.image_path});
  }

  itemPickerActionSheet = () => {
    const options = {title: 'Select an Item\'s Image'};

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image upload');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('Image URI: ', response.uri);
        this.props.changeImage(this.props.image.id, {uri: response.uri});
      }
    });
  }

  render() {
    return (
      <View>
          {this.props.editable &&
            <TouchableOpacity
              style={styles.closeBtn}
              activeOpacity={0.6}
              onPress={() => this.props.deleteImage(this.props.image.id)}
            >
                <Icon title='Delete' name='md-close' color='black' size={14} style={styles.closeBtnIcon} />
            </TouchableOpacity>
          }

          {this.props.image.image_path === '' || typeof this.props.image.image_path === 'undefined'
            ? (
              <TouchableOpacity onPress={this.itemPickerActionSheet} style={styles.itemImagePickerBtn}>
                <Image style={styles.itemImage}
                    source={(this.props.image.image_path) ? this.props.image.image_path : require('../../../assets/images/default_image_placeholder.png')}
                />
            </TouchableOpacity>
          ) : (
            <View style={styles.itemImagePickerBtn}>
                <Image style={styles.itemImage}
                    source={(this.props.image.image_path) ? this.props.image.image_path : require('../../../assets/images/default_image_placeholder.png')} />
            </View>
          )}
      </View>
    );
  }
}
