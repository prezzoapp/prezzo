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
  isBusy: state.get('menu').get('isBusy'),
  menu: state.get('menu').get('menu_data')
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
