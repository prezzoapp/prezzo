// @flow
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons'
import PropTypes from 'prop-types';
import MenuItemImage from '../MenuItemImage';
import styles from './styles';
import { COLOR_DANGER } from '../../services/constants';
import {
  getTimeStampString,
  showAlertWithMessage,
  manuallyLogout
} from '../../services/commonFunctions';
import showGenericAlert from '../GenericAlert';
import CacheImage from '../CacheImage';

const menuItemImageRef = React.createRef();

export default class MenuItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editItem: false,
      title: this.props.item.title,
      price: this.props.item.price,
      description: this.props.item.description,
      imageArray: this.props.item.imageURLs
    };

    this.editItem = this.editItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.updateEntries = this.updateEntries.bind(this);
    this.addImageComponent = this.addImageComponent.bind(this);

    // this._active = new Animated.Value(0);

    // this._style = {
    //   ...Platform.select({
    //     ios: {
    //       transform: [{
    //         scale: this._active.interpolate({
    //           inputRange: [0, 1],
    //           outputRange: [1, 1.1],
    //         }),
    //       }],
    //       shadowRadius: this._active.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: [2, 10],
    //       }),
    //     },
    //
    //     android: {
    //       transform: [{
    //         scale: this._active.interpolate({
    //           inputRange: [0, 1],
    //           outputRange: [1, 1.07],
    //         }),
    //       }],
    //       elevation: this._active.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: [2, 6],
    //       }),
    //     },
    //   })
    // };
  }

  componentWillReceiveProps(nextProps) {
    const item = this.props.item;
    const nextItem = nextProps.item;

    if(item.title !== nextItem.title) this.setState({ title: nextItem.title });
    if(item.price !== nextItem.price) this.setState({ price: nextItem.price });
    if(item.description !== nextItem.description) this.setState({ description: nextItem.description });

    if (nextProps !== this.props) {
      const resetImages = this.state.resetImages;
      const imageArray = [ ... this.state.imageArray ];
      const nextPropsImageURLs = nextProps.item.imageURLs;
      for (var i = 0, len = imageArray.length; i < len; i++) {
        if (nextPropsImageURLs[i]) {
          imageArray[i] = nextPropsImageURLs[i];
        }
      }

      this.setState(() => {
        return {
          imageArray: resetImages ? nextPropsImageURLs : imageArray
        }
      });
    }

    // if (this.props.active !== nextProps.active) {
    //   Animated.timing(this._active, {
    //     duration: 300,
    //     easing: Easing.bounce,
    //     toValue: Number(nextProps.active)
    //   }).start();
    // }
  }

  reloadImages() {
    this.setState({ imageArray: [ ...this.props.item.imageURLs ] }, () => {
      console.log(this.state.imageArray);
    });
  }

  editItem() {
    if(this.state.editItem) {
      this.setState(() => ({
        editItem: false
      }));
    } else {
      this.setState(() => ({
        editItem: true
      }));
    }
  }

  deleteItem() {
    showGenericAlert(null, 'Are you sure you want to delete this menu item?', [
      {
        text: 'Yes',
        onPress: () => this.props.deleteItem()
      },
      {
        text: 'No',
        onPress: () => null,
        style: 'cancel'
      }
    ]);
  }

  updateEntries(inputType, text) {
    if(inputType === 'TITLE') {
      this.setState(() => ({
        title: text
      }));
    } else if(inputType === 'PRICE') {
      this.setState(() =>({
        price: text
      }));
    } else {
      this.setState(() =>({
        description: text
      }));
    }
  }

  updateItem(title, price, description) {
    // this.editItem();
    this.props.updateItem(title, parseFloat(price), description);
  }

  addImageComponent() {
    const imageArray = this.state.imageArray;

    // this makes sure to not add another image placeholder
    // if the last image is a placeholder
    if (imageArray.length && !imageArray[imageArray.length - 1]) {
      return;
    }

    this.setState(() => {
      return {
        imageArray: [...this.state.imageArray, '']
      }
    }, () => {
      menuItemImageRef.current.showAvatarActionSheet();
    });
  }

  deleteImageComponent(imageURL) {
    this.props.deleteImageComponent(imageURL)
    .then(() => {
      this.reloadImages();
    }).catch(err => {
      if(err.code === 401) {
        this.props.enableBtns();
        manuallyLogout(err, () => this.props.userLogout());
      } else {
        showAlertWithMessage('Uh-oh!', err, () => {
          this.props.enableBtns();
        });
      }
    });
  }

  render() {
    const itemImages = this.state.imageArray;

    return (
      <View style={styles.menuItem}>
        <View style={styles.controlBtnsPanel}>
          {this.state.editItem && (
            <View style={styles.controlBtnsPanel}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  this.updateItem(
                    this.state.title,
                    this.state.price,
                    this.state.description
                  )
                }
                style={[styles.twoLineIconBtn, styles.controlBtnsStyle]}
              >
                <Text style={styles.addText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.twoLineIconBtn, styles.controlBtnsStyle]}
                onPress={() => this.deleteItem()}
              >
                <Text style={[styles.addText, { color: COLOR_DANGER }]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity activeOpacity={0.6} style={styles.twoLineIconBtn}>
            <CacheImage
              source={require('../../../assets/images/two-lines-icon.png')}
              type='image'
              style={styles.twoLineIconBtnImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.itemContainer}>
          <View
            style={[
              styles.sectionHeader,
              !this.state.editItem && styles.paddingBottom_21
            ]}
          >
            {this.state.editItem ? (
              <TextInput
                underlineColorAndroid="transparent"
                value={this.state.title}
                style={[styles.textInput, styles.paddingBottom_21]}
                onChangeText={text => this.updateEntries('TITLE', text)}
              />
            ) : (
              <Text
                style={styles.sectionHeaderText}
                numberOfLines={2}
              >{this.state.title}</Text>
            )}

            {!this.state.editItem &&
              <TouchableOpacity activeOpacity={0.6} onPress={this.editItem}>
                <Text style={styles.addText}>Edit</Text>
              </TouchableOpacity>
            }
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: this.state.editItem ? 'center' : 'flex-start'
              }}
            >
              <Text
                style={[
                  styles.sectionHeaderText,
                  this.state.editItem ? styles.extra$TextStyle : null,
                  styles.paddingBottom_21,
                  {
                    flex: 0,
                    paddingRight: 2
                  }
                ]}
              >
                $
              </Text>
              {this.state.editItem ? (
                <TextInput
                  underlineColorAndroid="transparent"
                  value={this.state.price.toString()}
                  keyboardType="numeric"
                  style={[styles.textInput, styles.paddingBottom_21]}
                  onChangeText={text => this.updateEntries('PRICE', text)}
                />
              ) : (
                <Text
                  style={[styles.sectionHeaderText, styles.paddingBottom_21]}
                >
                  {this.state.price}
                </Text>
              )}
            </View>
            {this.state.editItem ? (
              <TextInput
                underlineColorAndroid="transparent"
                value={this.state.description}
                style={[styles.otherInfoTextInput, styles.paddingBottom_21]}
                onChangeText={text => this.updateEntries('DESC', text)}
              />
            ) : (
              <Text
                style={[styles.otherInfoText, styles.paddingBottom_21]}
                numberOfLines={3}
              >
                {this.state.description}
              </Text>
            )}
          </View>

          <View style={[styles.itemImagesWrapper]}>
            {itemImages && itemImages.map((item, index) => (
              <MenuItemImage
                ref={menuItemImageRef}
                key={index}
                editable={this.state.editItem}
                image={item}
                addNewImageComponent={imageURL =>
                  this.props.addNewImageComponent(imageURL)
                }
                deleteImageComponent={imageURL => this.deleteImageComponent(imageURL)}
                uploadImage={(uri, size, mime, name, type, acl) => {
                  this.state.imageArray[index] = uri;
                  return this.props.uploadImage(uri, size, mime, name, type, acl)
                }}
              />
            ))}

            <TouchableOpacity
              style={styles.itemImagePickerBtn}
              onPress={this.addImageComponent}
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
        </View>
      </View>
    );
  }
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  addNewImageComponent: PropTypes.func.isRequired,
  deleteImageComponent: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};
