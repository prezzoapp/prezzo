import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import { LinearGradient } from 'expo';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuItemImage from '../MenuItemImage';
import { COLOR_GREEN } from '../../services/constants';

class ReviewUserPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.item.images
    };
  }

  componentWillReceiveProps() {
    // console.log('components will receive props', this.props);
    this.setState(
      () => ({
        images: this.props.item.images
      }),
      () => {
        // console.log(this.state.data)
      }
    );
  }

  addImageComponent(itemIndex, imageIndex) {
    this.props.callbackFromParent(itemIndex, imageIndex);
  }

  render() {
    console.log('render called', this.props.item.images);

    return (
      <View style={styles.item}>
        <Text
          style={styles.addPhotoText}
          onPress={() => this.addImageComponent(0, 0)}
        >
          {this.props.item.name}
        </Text>

        <View style={{ backgroundColor: 'transparent' }}>
          <FlatList
            horizontal
            keyExtractor={item => item.index}
            data={this.state.images}
            extraData={this.state}
            renderItem={({ item }) => (
              <View style={styles.bigImageHolder}>
                <TouchableOpacity
                  onPress={() =>
                    this.addImageComponent(this.props.item.index, item.index)
                  }
                >
                  <View
                    style={{
                      position: 'relative',
                      backgroundColor: 'transparent',
                      height: '100%'
                    }}
                  >
                    <ImageBackground
                      source={{ uri: item.key }}
                      blurRadius={1}
                      style={[
                        styles.bigImage,
                        {
                          borderColor:
                            item.selected == true
                              ? COLOR_GREEN
                              : 'rgba(255, 255, 255, 0.5)',
                          borderWidth: item.selected == true ? 3 : 2
                        }
                      ]}
                    />
                    {(() => {
                      if (item.selected) {
                        return (
                          <View
                            style={{
                              height: 30,
                              width: 30,
                              backgroundColor: 'transparent',
                              position: 'absolute',
                              top: 0,
                              right: 0
                            }}
                          >
                            <Image
                              style={{ width: 30, height: 30 }}
                              source={require('../../../assets/images/checkMenu.png')}
                            />
                          </View>
                        );
                      }
                      return null;
                    })()}
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

ReviewUserPhoto.propTypes = {
  item: PropTypes.object.isRequired
};

export default ReviewUserPhoto;
