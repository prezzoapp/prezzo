// @flow
import React, { Component } from 'react';
import {
  View,
  SectionList,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import MenuItem from '../../../components/MenuItem';
import { COLOR_BLACK } from '../../../services/constants';
import styles from './styles';
import MenuListCategoriesHeader from '../../../components/MenuListCategoriesHeader';

export default class CreateMenu extends Component<Props> {
  static navigationOptions = {
    title: 'Create Menu',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: COLOR_BLACK,
      borderBottomWidth: 0
    },
    tabBarIcon: props => (
      <MaterialIcons name="person-outline" size={24} color={props.tintColor} />
    )
  };

  renderListFooter = () => (
    <View style={styles.listFooterHolder}>
      <TouchableOpacity
        style={styles.addAnotherCommonBtn}
        activeOpacity={0.6}
        onPress={() => this.props.addCategory(this.props.menuId, 'Category #7')}
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
        onPress={() =>
          this.props.addItem(
            this.props.menuId,
            categoryId,
            'Item',
            'Description',
            0
          )
        }
      >
        <Text style={styles.addAnotherCommonBtnText}>Add Another Item</Text>
      </TouchableOpacity>
    </View>
  );

  renderSectionHeader = section => (
    <MenuListCategoriesHeader
      section={section}
      deleteCategory={categoryId =>
        this.props.deleteCategory(this.props.menuId, categoryId)
      }
      updateCategory={(categoryId, title) =>
        this.props.updateCategory(this.props.menuId, categoryId, title)}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <SectionList
            showsVerticalScrollIndicator={false}
            extraData={this.props.menu
              ? this.props.menu && this.props.menu.get('categories') &&
                this.props.menu.get('categories').toJS()
              : []
            }
            keyExtractor={(item, index) => item + index}
            sections={
              this.props.menu
                ? this.props.menu && this.props.menu.get('categories') &&
                  this.props.menu.get('categories').toJS()
                : []
            }
            renderSectionHeader={({ section }) =>
              this.renderSectionHeader(section)
            }
            renderSectionFooter={({ section: { _id } }) =>
              this.renderSectionFooter(_id)
            }
            ListFooterComponent={this.renderListFooter}
            stickySectionHeadersEnabled
            renderItem={({ item, section }) =>
              <MenuItem
                item={item}
                updateItem={(title, price, description) =>
                  this.props.updateItem(
                    this.props.menuId,
                    section._id,
                    item._id,
                    title,
                    description,
                    price
                  )
                }
                deleteItem={() =>
                  this.props.deleteItem(
                    this.props.menuId,
                    section._id,
                    item._id
                  )
                }
                addNewImageComponent={imageURL =>
                  this.props.addImage(
                    this.props.menuId,
                    section._id,
                    item._id,
                    imageURL
                  )
                }
                deleteImageComponent={imageURL =>
                  this.props.deleteImage(
                    this.props.menuId,
                    section._id,
                    item._id,
                    imageURL
                  )
                }
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

CreateMenu.propTypes = {
  addCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,

  addItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,

  addImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,

  menuId: PropTypes.string.isRequired,

  isBusy: PropTypes.bool.isRequired,

  menu: PropTypes.any.isRequired
};
