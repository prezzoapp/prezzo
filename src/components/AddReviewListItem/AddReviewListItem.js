import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo';
import PropTypes from 'prop-types';
import { Feather } from '../VectorIcons';
import styles from './styles';
import MenuItemImage from '../MenuItemImage';
import RatingBar from '../RatingBar';

class AddReviewListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.item.images
    }
  }

  addImageComponent() {
    this.setState(() => {
      return {
        images: [...this.state.images, '']
      }
    });
  }

  render() {
    return (
      <View style={styles.item}>
        <View style={styles.bigImageHolder}>
          <ImageBackground
            source={{ uri: this.props.item.images[0] }}
            style={styles.bigImage}
          >
            <LinearGradient
              colors={['transparent', '#1E1E1E']}
              locations={[0, 0.8]}
              style={styles.linearGradient}
            >
              <Text style={styles.name}>{this.props.item.name}</Text>
            </LinearGradient>
          </ImageBackground>
        </View>

        <Text style={styles.addPhotoText}>Add a Photo</Text>

        <View style={styles.itemImagesHolder}>
          {this.state.images &&
            this.state.images.map((image, index) => (
              <MenuItemImage key={index} image={image} />
            ))}
          <TouchableOpacity
            style={styles.itemImagePickerBtn}
            onPress={() => this.addImageComponent()}
          >
            <Feather
              title="Add More"
              name="plus"
              color="rgb(161,161,161)"
              size={28}
              style={styles.closeBtnIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.ratingPanel}>
          <Text style={styles.addPhotoText}>Add a Rating</Text>
          <RatingBar itemRating={3} />
        </View>
      </View>
    );
  }
}

AddReviewListItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default AddReviewListItem;
