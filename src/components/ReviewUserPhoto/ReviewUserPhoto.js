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
    console.log('render called', this.props.item.images);

    return (
      <View style={styles.item}>
        <Text style={styles.addPhotoText}>{this.props.item.name}</Text>
        <FlatList
          horizontal
          keyExtractor={item => item._id.toString()}
          showsHorizontalScrollIndicator={false}
          data={this.state.images}
          extraData={this.state}
          ItemSeparatorComponent={this.itemSeparatorComponent}
          renderItem={({ item }) => (
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
