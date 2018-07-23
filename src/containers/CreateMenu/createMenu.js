import React, {PureComponent} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, SectionList} from 'react-native';

import PropTypes from 'prop-types';

import MenuItem from './menuItem';

import {connect} from 'react-redux';

import * as actions from './actions';

import {
    FONT_FAMILY,
    FONT_FAMILY_BOLD,
    COLOR_BLACK,
    COLOR_GREEN
} from '../../services/constants';

class MenuItems extends PureComponent {
  static propTypes = {
    addNewCategory: PropTypes.func.isRequired,
    addNewItemInMenuList: PropTypes.func.isRequired,
    addNewImageComponent: PropTypes.func.isRequired,
    menusListReducer: PropTypes.array.isRequired,
    deleteItem: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired
  }

  static navigationOptions =
  {
    title: 'Create Menu',
    headerStyle: {
      backgroundColor: '#2B2C2C',
      elevation: 0
    },

    headerTitleStyle:
    {

      fontWeight: 'bold',
      fontFamily: FONT_FAMILY
    },

    headerTintColor: '#fff'
  };

  constructor() {
    super();
  }

  renderListFooter = () =>
  {
    return (
        <View style={styles.listFooterHolder}>
            <TouchableOpacity style={styles.addAnotherCommonBtn}
              activeOpacity={0.6}
              onPress={() => this.props.addNewCategory()}>
                <Text style={styles.addAnotherCommonBtnText}>Add Another Category</Text>
            </TouchableOpacity>
        </View>
    );
  }

  renderSectionFooter = (sectionID) => {
    return (
        <View style={styles.sectionFooterHolder}>
            <TouchableOpacity
              style={styles.addAnotherCommonBtn}
              activeOpacity={0.6}
              onPress={() => this.props.addNewItemInMenuList(sectionID)}>
                <Text style={styles.addAnotherCommonBtnText}>Add Another Item</Text>
            </TouchableOpacity>
        </View>
    );
  }

  renderSection = (title) =>
  {
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
            <TouchableOpacity activeOpacity={0.6}>
                <Text style={styles.addText}>Edit</Text>
            </TouchableOpacity>
        </View>
    );
  }

  render() {
    return (
        <View style={styles.container}>
            <SectionList
                keyExtractor={(item, index) => item + index}
                sections={this.props.menusListReducer}
                renderSectionHeader={({section: {title}}) => this.renderSection(title)}
                renderSectionFooter={({section: {id}}) => this.renderSectionFooter(id)}
                ListFooterComponent={this.renderListFooter}
                stickySectionHeadersEnabled={true}
                renderItem={({item, index, section}) =>
                    <MenuItem
                      item={item}
                      deleteMenuItem={() => this.props.deleteItem(section.id, item.id)}
                      editMenuItem={() => this.props.editItem(section.id, item.id)}
                      addNewImageThumbnail={() => this.props.addNewImageComponent(section.id, item.id)} />
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

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor: COLOR_BLACK,
    paddingHorizontal: 20
  },

  sectionHeader:
  {
    borderBottomColor: 'rgb(157,157,157)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: 10,
    backgroundColor: COLOR_BLACK
  },

  sectionHeaderText:
  {
    color: '#fff',
    fontFamily: FONT_FAMILY,
    fontSize: 20
  },

  addText:
  {
    color: COLOR_GREEN,
    fontSize: 16,
    paddingRight: 13,
    fontFamily: FONT_FAMILY
  },

  addAnotherCommonBtn:
  {
    paddingVertical: 10,
    alignSelf: 'flex-start'
  },

  addAnotherCommonBtnText:
  {
    color: 'rgb(147,147,147)',
    fontFamily: FONT_FAMILY,
    fontSize: 18
  },

  footerSection:
  {
    padding: 15,
    justifyContent: 'center'
  },

  submitMenuBtn:
  {
    alignSelf: 'center',
    paddingHorizontal: 40,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgb(15,209,74)',
    elevation: 2
  },

  submitBtnText:
  {
    color: 'white',
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: 15
  }
});

const mapStateToProps = (state) => {
  return {
    menusListReducer: state.get('menusListReducer').get('categories').toJS()
  };
};

export default connect(mapStateToProps, actions)(MenuItems);
