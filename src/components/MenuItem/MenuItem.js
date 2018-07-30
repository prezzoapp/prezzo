// @flow
import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MenuItemImage from '../MenuItemImage';
import styles from './styles';
import { COLOR_DANGER } from '../../services/constants';
import PropTypes from 'prop-types';

const MenuItem = props => (
  <View style={styles.menuItem}>
    <View style={styles.controlBtnsPanel}>
      {props.item.editable && (
        <View style={styles.controlBtnsPanel}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.updateItem()}
            style={styles.twoLineIconBtn}
          >
            <Text style={styles.addText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.twoLineIconBtn}
            onPress={() => props.deleteItem()}
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
          !props.item.editable && { paddingBottom: 10 }
        ]}
      >
        {props.item.editable ? (
          <TextInput
            autoFocus
            underlineColorAndroid="transparent"
            value={props.item.name}
            style={styles.textInput}
          />
        ) : (
          <Text style={styles.sectionHeaderText}>{props.item.name}</Text>
        )}

        {!props.item.editable &&
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.editItem()}>
            <Text style={styles.addText}>Edit</Text>
          </TouchableOpacity>
        }
      </View>
    <View>
        {props.item.editable ? (
          <TextInput
            underlineColorAndroid="transparent"
            value={props.item.price}
            style={styles.textInput}
          />
        ) : (
          <Text style={[styles.sectionHeaderText, styles.paddingBottom_10]}>
            {props.item.price}
          </Text>
        )}

        {props.item.editable ? (
        <TextInput
            multiline
            underlineColorAndroid="transparent"
            value={props.item.description}
            style={styles.otherInfoTextInput}
          />
        ) : (
          <Text style={[styles.otherInfoText, styles.paddingBottom_10]}>
            {props.item.description}
          </Text>
      )}
    </View>

    <View style={[styles.itemImagesWrapper]}>
        {props.item.itemImages.map(item => (
          <MenuItemImage
            key={item.id}
            image={item}
            editable={props.item.editable}
            parentID={props.item.id}
            changeImage={imageObjPath =>
              props.changeImage(item.id, imageObjPath)
            }
            deleteImageComponent={() => props.deleteImageComponent(item.id)}
          />
        ))}

        <TouchableOpacity
          style={styles.itemImagePickerBtn}
          onPress={() => props.addNewImageComponent()}
        >
          <Icon
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

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  editItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  changeImage: PropTypes.func.isRequired,
  addNewImageComponent: PropTypes.func.isRequired
};

export default MenuItem;
