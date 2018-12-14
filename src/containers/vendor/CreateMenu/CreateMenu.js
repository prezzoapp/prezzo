// // @flow
// import React, { PureComponent } from 'react';
// import {
//   View,
//   SectionList,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import PropTypes from 'prop-types';
// import SortableList from 'react-native-sortable-list';
// import MenuItem from '../../../components/MenuItem';
// import { COLOR_BLACK } from '../../../services/constants';
// import styles from './styles';
// import MenuListCategoriesHeader from '../../../components/MenuListCategoriesHeader';
//
// export default class CreateMenu extends PureComponent {
//   static navigationOptions = {
//     title: 'Create Menu',
//     headerTintColor: 'white',
//     headerStyle: {
//       backgroundColor: COLOR_BLACK,
//       borderBottomWidth: 0
//     },
//     tabBarIcon: props => (
//       <Icon name="person-outline" size={24} color={props.tintColor} />
//     )
//   };
//
//   onActivateRow = () => {
//     if(this.sectionList) {
//       this.sectionList.setNativeProps({ scrollEnabled: false });
//     }
//   }
//
//   onReleaseRow = () => {
//     if(this.sectionList) {
//       this.sectionList.setNativeProps({ scrollEnabled: true });
//     }
//   }
//
//   onChangeOrder = nextOrder => {
//     //console.log(nextOrder);
//   }
//
//   renderListFooter = () => (
//     <View style={styles.listFooterHolder}>
//       <TouchableOpacity
//         style={styles.addAnotherCommonBtn}
//         activeOpacity={0.6}
//         onPress={() => this.props.addCategory(this.props.menuId, 'Category #7')}
//       >
//         <Text style={styles.addAnotherCommonBtnText}>Add Another Category</Text>
//       </TouchableOpacity>
//     </View>
//   );
//
//   renderSectionFooter = categoryId => (
//     <View style={styles.sectionFooterHolder}>
//       <TouchableOpacity
//         style={styles.addAnotherCommonBtn}
//         activeOpacity={0.6}
//         onPress={() =>
//           this.props.addItem(
//             this.props.menuId,
//             categoryId,
//             'Item',
//             'Description',
//             0
//           )
//         }
//       >
//         <Text style={styles.addAnotherCommonBtnText}>Add Another Item</Text>
//       </TouchableOpacity>
//     </View>
//   );
//
//   renderSectionHeader = section => (
//     <MenuListCategoriesHeader
//       section={section}
//       deleteCategory={categoryId =>
//         this.props.deleteCategory(this.props.menuId, categoryId)
//       }
//       updateCategory={(categoryId, title) =>
//         this.props.updateCategory(this.props.menuId, categoryId, title)}
//     />
//   );
//
//   render() {
//     const array = this.props.menu
//       ? this.props.menu.get('categories') &&
//         this.props.menu.get('categories').toJS()
//       : [];
//
//     return (
//       <View style={styles.container}>
//         <View style={{ flex: 1 }}>
//           <SectionList
//             ref={sectionList => (this.sectionList = sectionList)}
//             showsVerticalScrollIndicator={false}
//             extraData={array}
//             keyExtractor={item => item._id}
//             sections={array}
//             renderSectionHeader={({ section }) =>
//               this.renderSectionHeader(section)
//             }
//             renderSectionFooter={({ section: { _id } }) =>
//               this.renderSectionFooter(_id)
//             }
//             ListFooterComponent={this.renderListFooter}
//             stickySectionHeadersEnabled
//             renderItem={({ item, section }) =>
//               <SortableList
//                 data={Object.assign({}, section.data[0].items)}
//                 renderRow={({ data, active }) =>
//                   <MenuItem
//                     item={data}
//                     active={active}
//                     updateItem={(title, price, description) =>
//                       this.props.updateItem(
//                         this.props.menuId,
//                         section._id,
//                         item._id,
//                         title,
//                         description,
//                         price
//                       )
//                     }
//                     deleteItem={() =>
//                       this.props.deleteItem(
//                         this.props.menuId,
//                         section._id,
//                         item._id
//                       )
//                     }
//                     addNewImageComponent={imageURL =>
//                       this.props.addImage(
//                         this.props.menuId,
//                         section._id,
//                         item._id,
//                         imageURL
//                       )
//                     }
//                     deleteImageComponent={imageURL =>
//                       this.props.deleteImage(
//                         this.props.menuId,
//                         section._id,
//                         item._id,
//                         imageURL
//                       )
//                     }
//                     uploadImage={(uri, size, mime, name, type, acl) =>
//                       this.props.uploadImage(uri, size, mime, name, type, acl)
//                     }
//                   />
//                 }
//                 manuallyActivateRows={false}
//                 scrollEnabled={false}
//                 onActivateRow={this.onActivateRow}
//                 onReleaseRow={this.onReleaseRow}
//                 onChangeOrder={this.onChangeOrder}
//               />
//             }
//           />
//
//           <View style={styles.footerSection}>
//             <TouchableOpacity activeOpacity={0.6} style={styles.submitMenuBtn}>
//               <Text style={styles.submitBtnText}>SUBMIT MENU</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//
//         {this.props.isBusy || this.props.uploadIsBusy ? (
//           <View style={styles.spinnerView}>
//             <ActivityIndicator size="large" color="white"/>
//           </View>
//         ) : null}
//       </View>
//     );
//   }
// }
//
// CreateMenu.propTypes = {
//   addCategory: PropTypes.func.isRequired,
//   updateCategory: PropTypes.func.isRequired,
//   deleteCategory: PropTypes.func.isRequired,
//
//   addItem: PropTypes.func.isRequired,
//   updateItem: PropTypes.func.isRequired,
//   deleteItem: PropTypes.func.isRequired,
//
//   uploadImage: PropTypes.func.isRequired,
//   addImage: PropTypes.func.isRequired,
//   deleteImage: PropTypes.func.isRequired,
//
//   menuId: PropTypes.string.isRequired,
//
//   isBusy: PropTypes.bool.isRequired,
//
//   uploadIsBusy: PropTypes.bool.isRequired,
//
//   menu: PropTypes.any.isRequired
// };

import React, { Component } from 'react';
import {
  View,
  SectionList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MaterialIcons, Feather } from '../../../components/VectorIcons';
import MenuItem from '../../../components/MenuItem';
import { COLOR_BLACK, FONT_FAMILY_MEDIUM } from '../../../services/constants';
import styles from './styles';
import MenuListCategoriesHeader from '../../../components/MenuListCategoriesHeader';

export default class CreateMenu extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Create Menu',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: COLOR_BLACK,
      borderBottomWidth: 0
    },
    headerTitleStyle: {
      fontFamily: Expo.Font.processFontFamily(FONT_FAMILY_MEDIUM),
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
              var length = tempArray.length;
              this.addCategory(length);

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


 addCategory(length){
   var categoryName = `Category # ${length+1}`;
   console.log("Add category",length);
   const tempArray = this.props.menu
     ? this.props.menu.get('categories') &&
       this.props.menu.get('categories').toJS()
     : [];
     var found = false;
     for(let i = 0; i < tempArray.length; i++){
       console.log("category array:- ",tempArray[i].title);
       if(tempArray[i].title === categoryName)
       {
         found = true;
       }

     }
     if(found === true)
     {
       length = length + 1;
       this.addCategory(length);
     }else{
       this.props.addCategory(this.props.menuId, categoryName);

     }
 }

  render() {
    const array = this.props.menu
      ? this.props.menu.get('categories') &&
        this.props.menu.get('categories').toJS()
      : [];

    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' keyboardVerticalOffset={40}>
        <View style={{ flex: 1 }}>
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

        {this.props.isBusy || this.props.uploadIsBusy ? (
          <View style={styles.spinnerView}>
            <ActivityIndicator size="large" color="white"/>
          </View>
        ) : null}
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
