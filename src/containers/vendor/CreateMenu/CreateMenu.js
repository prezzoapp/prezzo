import React, { Component } from 'react';
import {
  View,
  SectionList,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MaterialIcons, Feather } from '../../../components/VectorIcons';
import MenuItem from '../../../components/MenuItem';
import { COLOR_BLACK, FONT_FAMILY_MEDIUM } from '../../../services/constants';
import styles from './styles';
import MenuListCategoriesHeader from '../../../components/MenuListCategoriesHeader';
import LoadingComponent from '../../../components/LoadingComponent';

export default class CreateMenu extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Create Menu',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: COLOR_BLACK,
      borderBottomWidth: 0
    },
    headerTitleStyle: {
      fontFamily: FONT_FAMILY_MEDIUM,
      fontSize: wp('6.4%')
    },
    tabBarIcon: props => (
      <MaterialIcons name="person-outline" size={24} color={props.tintColor} />
    ),
    headerLeft: (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={styles.headerLeftBtn}>
        <Feather
          title="Back"
          name="chevron-left"
          color="white"
          size={wp('8%')}
        />
      </TouchableOpacity>
    )
  });

  addCategory(length) {
    const categoryName = `Category # ${length + 1}`;
    const tempArray = this.props.menu
     ? this.props.menu.get('categories') &&
       this.props.menu.get('categories').toJS()
     : [];

    const found = tempArray.some(item => item.title === categoryName);

    if(found) {
      length += 1;
      this.addCategory(length);
    } else {
      this.props.addCategory(this.props.menuId, categoryName);
    }
  }

  renderListFooter = () => (
    <View style={styles.listFooterHolder}>
      <TouchableOpacity
        style={styles.addAnotherCommonBtn}
        activeOpacity={0.6}
        onPress={() => {
          const tempArray = this.props.menu
            ? this.props.menu.get('categories') &&
              this.props.menu.get('categories').toJS()
            : [];
          this.addCategory(tempArray.length);
        }}
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
    const array = this.props.menu
      ? this.props.menu.get('categories') &&
        this.props.menu.get('categories').toJS()
      : [];

    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.innerContainer}>
          <SectionList
            showsVerticalScrollIndicator={false}
            extraData={array}
            contentContainerStyle={styles.sectionListStyle}
            keyExtractor={(item, index) => item + index}
            sections={array}
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
                uploadImage={(uri, size, mime, name, type, acl) =>
                  this.props.uploadImage(uri, size, mime, name, type, acl)
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

        <LoadingComponent visible={this.props.isBusy || this.props.uploadIsBusy} />
      </KeyboardAvoidingView>
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

  uploadImage: PropTypes.func.isRequired,
  addImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,

  menuId: PropTypes.string.isRequired,

  isBusy: PropTypes.bool.isRequired,

  uploadIsBusy: PropTypes.bool.isRequired,

  menu: PropTypes.any.isRequired
};
