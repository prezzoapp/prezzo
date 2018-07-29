// @flow
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MenuItemImage from '../MenuItemImage';
import styles from './styles';
import { COLOR_DANGER } from '../../services/constants';

export default class MenuItem extends Component {
  render() {
    return (
      <View style={styles.menuItem}>
        <View style={styles.controlBtnsPanel}>
          {this.props.item.editable && (
            <View style={styles.controlBtnsPanel}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.props.updateItem()}
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
              !this.props.item.editable && { paddingBottom: 10 }
            ]}
          >
            {this.props.item.editable ? (
              <TextInput
                autoFocus
                underlineColorAndroid="transparent"
                value={this.props.item.name}
                style={styles.textInput}
              />) : (
                <Text style={styles.sectionHeaderText}>
                  {this.props.item.name}
                </Text>)
              }

            {!this.props.item.editable &&
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.props.editItem()}>
                <Text style={styles.addText}>Edit</Text>
              </TouchableOpacity>
            }
          </View>

        <View>
          {this.props.item.editable
            ? <TextInput underlineColorAndroid='transparent' value={this.props.item.price} style={styles.textInput} />
            : (
              <Text style={[styles.sectionHeaderText, styles.paddingBottom_10]}>
                {this.props.item.price}
              </Text>
            )
          }

          {this.props.item.editable
            ? (
              <TextInput
                multiline={true}
                underlineColorAndroid='transparent'
                value={this.props.item.description}
                style={styles.otherInfoTextInput}
              />
          ) : (
            <Text style={[styles.otherInfoText, styles.paddingBottom_10]}>
              {this.props.item.description}
            </Text>
          )}
        </View>

        <View style={[styles.itemImagesWrapper]}>
          {
            this.props.item.itemImages.map((item, index) =>
            (
              <MenuItemImage
                key={index}
                image={item}
                editable={this.props.item.editable}
                parentID={this.props.item.id}
              />
            ))
          }

          <TouchableOpacity
            style={styles.itemImagePickerBtn}
            onPress={() => this.props.addNewImageThumbnail(this.props.item.id)}
          >
              <Icon
                title='Add More'
                name='plus'
                color='rgb(161,161,161)'
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
