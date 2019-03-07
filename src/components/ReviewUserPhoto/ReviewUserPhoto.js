import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import styles from './styles';
import { COLOR_GREEN } from '../../services/constants';
import CacheImage from '../CacheImage';

class ReviewUserPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.item.images
    };
  }

  componentWillReceiveProps() {
    this.setState(() => ({
      images: this.props.item.images
    }));
  }

  addImageComponent(itemIndex, imageIndex) {
    this.props.callbackFromParent(itemIndex, imageIndex);
  }

  itemSeparatorComponent = () => {
    return <View style={{ backgroundColor: 'transparent', width: wp('4%') }} />;
  }

  render() {
    return (
      <View style={styles.item}>
        <View style={styles.titleHolder}>
          <Text style={styles.title} numberOfLines={2}>
            {this.props.item.title}
          </Text>
        </View>
        <FlatList
          horizontal
<<<<<<< HEAD
          keyExtractor={item => item._id.toString()}
=======
          keyExtractor={item => item}
>>>>>>> - Show loading while fetching data from API for vendor activity tab and all its child components.
          showsHorizontalScrollIndicator={false}
          data={this.props.item.imageURLs}
          extraData={this.state}
          ItemSeparatorComponent={this.itemSeparatorComponent}
          renderItem={({ item }) => (
<<<<<<< HEAD
            <View style={styles.bigImageHolder}>
              <TouchableOpacity
                onPress={() =>
                  this.addImageComponent(this.props.item._id, item._id)
                }
                activeOpacity={0.8}
              >
                <CacheImage
                  source={item.key}
                  type='image'
                  style={[
                    styles.bigImage,
                    {
                      borderColor: item.selected
                        ? COLOR_GREEN
                        : 'rgba(255, 255, 255, 0.5)',
                      borderWidth: item.selected ? 2 : 2
                    }
                  ]}
                />
=======
            <View
              style={[
                styles.bigImageHolder,
                {
                  borderColor: item.selected
                    ? COLOR_GREEN
                    : 'rgba(255, 255, 255, 0.5)',
                  borderWidth: 2
                }
              ]}
            >
              <TouchableOpacity onPress={() => null} activeOpacity={0.8}>
                <Image source={{ uri: item.key }} style={styles.bigImage} />
>>>>>>> - Show loading while fetching data from API for vendor activity tab and all its child components.
                {(() => {
                  if (item.selected) {
                    return (
                      <View style={styles.checkImageContainer}>
                        <CacheImage
                          style={styles.checkImage}
                          type='image'
                          source={require('../../../assets/images/checkMenu.png')}
                        />
                      </View>
                    );
                  }
                  return null;
                })()}
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
}

ReviewUserPhoto.propTypes = {
  item: PropTypes.object.isRequired
};

export default ReviewUserPhoto;
