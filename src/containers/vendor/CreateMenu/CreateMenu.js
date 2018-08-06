// @flow
import React, { Component } from 'react';
import { View, SectionList, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from 'react-navigation';

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
  menu: any
};

export default class CreateMenu extends Component<Props> {
  static navigationOptions = {
    title: 'Create Menu',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: COLOR_BLACK,
      borderBottomWidth: 0,
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
        onPress={() =>
          this.props.addCategory('5b67e45fb60a83004be0bc38', 'Category #7')
        }
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
    <MenuListCategoriesHeader
      section={section}
      deleteCategory={categoryId =>
        this.props.deleteCategory('5b67e45fb60a83004be0bc38', categoryId)
      }
      updateCategory={(categoryId, title) =>
        this.props.updateCategory('5b67e45fb60a83004be0bc38', categoryId, title)}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <SectionList
            showsVerticalScrollIndicator={false}
            extraData={this.props.menu
              ? this.props.menu.get('categories') &&
                this.props.menu.get('categories').toJS()
              : []
            }
            keyExtractor={(item, index) => item + index}
            sections={
              this.props.menu
                ? this.props.menu.get('categories') &&
                  this.props.menu.get('categories').toJS()
                : []
            }
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

        {this.props.isBusy ? (
          <View style={styles.spinnerView}>
            <ActivityIndicator size="large" color="white"/>
          </View>
        ) : null}
      </View>
    );
  }
}
