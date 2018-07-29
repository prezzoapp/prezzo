// @flow
import React, { Component } from 'react';
import { View, SectionList, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MenuItem from '../../../components/MenuItem';
import { COLOR_BLACK, COLOR_DANGER } from '../../../services/constants';
import styles from './styles';

type Props = {
  addCategory: Function,
  addItem: Function,
  addNewImageComponent: Function
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

  renderSectionHeader = (title, categoryId, edit) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
      {edit ?
        (<View style={styles.controlBtnsPanel}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.twoLineIconBtn}
            onPress={() => this.props.updateCategory(0, categoryId, '')}>
              <Text style={styles.addText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.twoLineIconBtn}
            onPress={() => this.props.deleteCategory(0, categoryId)}
          >
            <Text style={[styles.addText, { color: COLOR_DANGER }]}>Delete</Text>
          </TouchableOpacity>
        </View>) :
        (<TouchableOpacity activeOpacity={0.6} onPress={() => this.props.editCategory(0, categoryId)}>
          <Text style={styles.addText}>Edit</Text>
        </TouchableOpacity>)
      }
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
          sections={this.props.menuCategories}
          renderSectionHeader={({ section: { title, id, edit } }) =>
            this.renderSectionHeader(title, id, edit)
          }
          renderSectionFooter={({ section: { id } }) =>
            this.renderSectionFooter(id)
          }
          ListFooterComponent={this.renderListFooter}
          stickySectionHeadersEnabled
          renderItem={({ item, index, section }) =>
            <MenuItem
              item={item}
              editItem={() => this.props.editItem(0, section.id, item.id)}
              updateItem={() => this.props.updateItem(0, section.id, '', '', 0, item.id)}
              deleteItem={() => this.props.deleteItem(0, section.id, item.id)}
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
