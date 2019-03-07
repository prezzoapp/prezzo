import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import styles from './styles';
import { COLOR_GREEN } from '../../services/constants';

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
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          data={this.props.item.imageURLs}
          extraData={this.state}
          ItemSeparatorComponent={this.itemSeparatorComponent}
          renderItem={({ item }) => (
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
                {(() => {
                  if (item.selected) {
                    return (
                      <View style={styles.checkImageContainer}>
                        <Image
                          style={styles.checkImage}
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
