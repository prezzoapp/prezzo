import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from './styles';

import PropTypes from 'prop-types';

class MenuListCategoriesHeader extends Component {
  static propTypes = {
    updateCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = { editMode: false, title: this.props.section.title }

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.enableEditMode = this.enableEditMode.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.saveAndUpdateCategory = this.saveAndUpdateCategory.bind(this);
  }

  onChangeTitle(text) {
    this.setState({ title: text });
  }

  enableEditMode() {
    this.setState({ editMode: true });
  }

  deleteCategory() {
    this.setState({ editMode: false }, () => {
      this.props.deleteCategory(this.props.section._id);
    })
  }

  saveAndUpdateCategory() {
    this.setState({ editMode: false }, () => {
      this.props.updateCategory(this.props.section._id, this.state.title);
    });
  }

  render() {
    return (
      <View style={styles.sectionHeader}>
        {this.state.editMode ? (
          <TextInput
            style={styles.textInput}
            value={this.state.title}
            onChangeText={text => this.onChangeTitle(text)}
          />
        ) : (
          <Text style={styles.sectionHeaderText} numberOfLines={1}>
            {this.state.title}
          </Text>
        )}
        {this.state.editMode ? (
          <View style={styles.controlBtnsPanel}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.twoLineIconBtn}
              onPress={this.saveAndUpdateCategory}
            >
              <Text style={styles.addText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.twoLineIconBtn}
              onPress={this.deleteCategory}
            >
              <Text style={[styles.addText, styles.colorDanger]}>Delete</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity activeOpacity={0.6} onPress={this.enableEditMode}>
            <Text style={styles.addText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default MenuListCategoriesHeader;
