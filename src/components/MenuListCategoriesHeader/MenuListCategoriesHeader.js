import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import showGenericAlert from '../GenericAlert';

export default class MenuListCategoriesHeader extends Component {
  constructor(props) {
    super(props);

    this.state = { editMode: false, title: this.props.section.title }

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.enableEditMode = this.enableEditMode.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.saveAndUpdateCategory = this.saveAndUpdateCategory.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.section.title !== nextProps.section.title) {
      this.setState(() => {
        return {
          title: nextProps.section.title
        }
      });
    }
  }

  onChangeTitle(text) {
    this.setState({ title: text });
  }

  enableEditMode() {
    this.setState({ editMode: true });
  }

  deleteCategory() {
    showGenericAlert(null, 'Are you sure you want to delete this category?', [
      {
        text: 'Yes',
        onPress: () => {
          this.setState({ editMode: false }, () => {
            this.props.deleteCategory(this.props.section._id);
          })
        }
      },
      {
        text: 'No',
        onPress: () => null,
        style: 'cancel'
      }
    ]);
  }

  saveAndUpdateCategory() {
    this.setState({ editMode: false }, () => {
      this.props.updateCategory(this.props.section._id, this.state.title);
    });
  }

  render() {
    return (
      <View style={styles.sectionHeader}>
        <View style={styles.separator} />
        {this.state.editMode ? (
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.textInput}
            value={this.state.title}
            onChangeText={text => this.onChangeTitle(text)}
          />
        ) : (
          <View style={styles.sectionHeaderView}>
            <Text style={styles.sectionHeaderText} numberOfLines={1}>
              {this.state.title}
            </Text>
          </View>
        )}
        {this.state.editMode ? (
          <View style={styles.controlBtnsPanel}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.editBtn}
              onPress={this.saveAndUpdateCategory}
            >
              <Text style={styles.addText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.editBtn}
              onPress={this.deleteCategory}
            >
              <Text style={[styles.addText, styles.colorDanger]}>Delete</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={this.enableEditMode}
            style={styles.editBtn}
          >
            <Text style={styles.addText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

MenuListCategoriesHeader.propTypes = {
  updateCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  section: PropTypes.any.isRequired
};
