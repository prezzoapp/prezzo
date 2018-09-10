// @flow
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons'
import PropTypes from 'prop-types';
import MenuItemImage from '../MenuItemImage';
import styles from './styles';
import { COLOR_DANGER } from '../../services/constants';

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
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props) {
      this.setState(() => {
        return {
          title: nextProps.item.title,
          price: nextProps.item.price,
          description: nextProps.item.description,
          editItem: false,
          imageArray: nextProps.item.imageURLs
        }
      });
    }
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
    this.editItem();
    this.props.updateItem(title, parseFloat(price), description);
  }

  addImageComponent() {
    this.setState(() => {
      return {
        imageArray: [...this.state.imageArray, '']
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
                style={styles.twoLineIconBtn}
              >
                <Text style={styles.addText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.twoLineIconBtn}
                onPress={() => this.props.deleteItem()}
              >
                <Text style={[styles.addText, { color: COLOR_DANGER }]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity activeOpacity={0.6} style={styles.twoLineIconBtn}>
            <Image
              source={require('../../../assets/images/two-lines-icon.png')}
              style={{ width: 30, height: 10 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.itemContainer}>
          <View
            style={[
              styles.sectionHeader,
              !this.state.editItem && { paddingBottom: 10 }
            ]}
          >
            {this.state.editItem ? (
              <TextInput
                autoFocus
                underlineColorAndroid="transparent"
                value={this.state.title}
                style={styles.textInput}
                onChangeText={text => this.updateEntries('TITLE', text)}
              />
            ) : (
              <Text style={styles.sectionHeaderText}>{this.state.title}</Text>
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
              <Text style={[styles.sectionHeaderText, { flex: 0, paddingRight: 2 }]}>$</Text>
              {this.state.editItem ? (
                <TextInput
                  underlineColorAndroid="transparent"
                  value={this.state.price.toString()}
                  keyboardType="numeric"
                  style={styles.textInput}
                  onChangeText={text => this.updateEntries('PRICE', text)}
                />
              ) : (
                <Text
                  style={[styles.sectionHeaderText, styles.paddingBottom_10]}
                >
                  {this.state.price}
                </Text>
              )}
            </View>
            {this.state.editItem ? (
              <TextInput
                multiline
                underlineColorAndroid="transparent"
                value={this.state.description}
                style={styles.otherInfoTextInput}
                onChangeText={text => this.updateEntries('DESC', text)}
              />
            ) : (
              <Text style={[styles.otherInfoText, styles.paddingBottom_10]}>
                {this.state.description}
              </Text>
            )}
          </View>

          <View style={[styles.itemImagesWrapper]}>
            {itemImages && itemImages.map((item, index) => (
                <MenuItemImage
                  key={index}
                  editable={this.state.editItem}
                  image={item}
                  addNewImageComponent={imageURL =>
                    this.props.addNewImageComponent(imageURL)
                  }
                  deleteImageComponent={imageURL =>
                    this.props.deleteImageComponent(imageURL)
                  }
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
  deleteImageComponent: PropTypes.func.isRequired
};
