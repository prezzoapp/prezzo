// @flow
import { bindActionCreators } from 'redux';
import {
  addCategory,
  editCategory,
  updateCategory,
  deleteCategory,
  addItem,
  editItem,
  updateItem,
  deleteItem,
  addImage,
  changeImage,
  deleteImage
} from '../../../modules/menu';

export const mapStateToProps = state => ({
  menu: state.get('menu').get('data'),
  menuCategories: state
    .get('menu')
    .get('menus')
    .first()
    .get('categories')
    .toJS()
});

export const mapDispatchToProps = dispatch => ({
  addCategory: bindActionCreators(addCategory, dispatch),
  editCategory: bindActionCreators(editCategory, dispatch),
  updateCategory: bindActionCreators(updateCategory, dispatch),
  deleteCategory: bindActionCreators(deleteCategory, dispatch),
  addItem: bindActionCreators(addItem, dispatch),
  editItem: bindActionCreators(editItem, dispatch),
  updateItem: bindActionCreators(updateItem, dispatch),
  deleteItem: bindActionCreators(deleteItem, dispatch),
  addImage: bindActionCreators(addImage, dispatch),
  changeImage: bindActionCreators(changeImage, dispatch),
  deleteImage: bindActionCreators(deleteImage, dispatch)
});
