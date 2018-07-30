// @flow
import React, { Component } from 'react';
import { View, SectionList, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MenuItem from '../../../components/MenuItem';
import { COLOR_BLACK, COLOR_DANGER } from '../../../services/constants';
import styles from './styles';
import MenuListCategoriesHeader from '../../../components/MenuListCategoriesHeader';

type Props = {
  addCategory: Function,
  addItem: Function,
  addNewImageComponent: Function,
  editItem: Function,
  updateCategory: Function,
  deleteCategory: Function,
  editCategory: Function,
  updateItem: Function,
  deleteItem: Function,
  addImage: Function,
  changeImage: Function,
  deleteImage: Function,
  menuCategories: Array
};

export default class CreateMenu extends Component<Props> {
  static navigationOptions = {
    title: 'Create Menu',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: COLOR_BLACK,
      borderBottomWidth: 0
    },
    tabBarIcon: props => (
      <Icon name="person-outline" size={24} color={props.tintColor} />
    )
  };

  renderListFooter = () => (
    <View style={styles.listFooterHolder}>
      <TouchableOpacity
        style={styles.addAnotherCommonBtn}
        activeOpacity={0.6}
        onPress={() => this.props.addCategory()}
      >
        <Text style={styles.addAnotherCommonBtnText}>Add Another Category</Text>
      </TouchableOpacity>
    </View>
  );

  renderSectionFooter = categoryId => (
    <View style={styles.sectionFooterHolder}>
      <TouchableOpacity
        style={styles.addAnotherCommonBtn}
        activeOpacity={0.6}
        onPress={() => this.props.addItem(0, categoryId, '', '', 0)}
      >
        <Text style={styles.addAnotherCommonBtnText}>Add Another Item</Text>
      </TouchableOpacity>
    </View>
  );

  renderSectionHeader = section => (
    <View style={styles.sectionHeader}>
      {section.edit ? (
        <TextInput style={styles.textInput} value={section.title} />
      ) : (
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      )}
      {section.edit ? (
        <View style={styles.controlBtnsPanel}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.twoLineIconBtn}
            onPress={() => this.props.updateCategory(0, section.id, '')}
          >
            <Text style={styles.addText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.twoLineIconBtn}
            onPress={() => this.props.deleteCategory(0, section.id)}
          >
            <Text style={[styles.addText, { color: COLOR_DANGER }]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => this.props.editCategory(0, section.id)}
        >
          <Text style={styles.addText}>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
          sections={this.props.menuCategories}
          renderSectionHeader={({ section }) =>
            this.renderSectionHeader(section)
          }
          renderSectionFooter={({ section: { id } }) =>
            this.renderSectionFooter(id)
          }
          ListFooterComponent={this.renderListFooter}
          stickySectionHeadersEnabled
          renderItem={({ item, section }) =>
            <MenuItem
              item={item}
              editItem={() => this.props.editItem(0, section.id, item.id)}
              updateItem={() =>
                this.props.updateItem(0, section.id, '', '', 0, item.id)}
              deleteItem={() => this.props.deleteItem(0, section.id, item.id)}
              addNewImageComponent={() =>
                this.props.addImage(0, section.id, item.id)}
              changeImage={(imageId, imageObjPath) =>
                this.props.changeImage(
                  0,
                  section.id,
                  item.id,
                  imageId,
                  imageObjPath
                )
              }
              deleteImageComponent={imageId =>
                this.props.deleteImage(0, section.id, item.id, imageId)}
            />
          }
        />
        <View style={styles.footerSection}>
          <TouchableOpacity activeOpacity={0.6} style={styles.submitMenuBtn}>
            <Text style={styles.submitBtnText}>Submit Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
