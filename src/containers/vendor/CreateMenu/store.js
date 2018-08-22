// @flow
import { bindActionCreators } from 'redux';
import {
  addCategory,
  updateCategory,
  deleteCategory,
  addItem,
  updateItem,
  deleteItem,
  addImage,
  deleteImage
} from '../../../modules/menu';

export const mapStateToProps = state => ({
  menuId:
    state.get('menu') &&
    state.get('menu').get('data') &&
    state
      .get('menu')
      .get('data')
      .get('_id'),
  isBusy: state.get('menu') && state.get('menu').get('isBusy'),
  menu: state.get('menu') && state.get('menu').get('data')
});

export const mapDispatchToProps = dispatch => ({
  addCategory: bindActionCreators(addCategory, dispatch),
  updateCategory: bindActionCreators(updateCategory, dispatch),
  deleteCategory: bindActionCreators(deleteCategory, dispatch),
  addItem: bindActionCreators(addItem, dispatch),
  updateItem: bindActionCreators(updateItem, dispatch),
  deleteItem: bindActionCreators(deleteItem, dispatch),
  addImage: bindActionCreators(addImage, dispatch),
  deleteImage: bindActionCreators(deleteImage, dispatch)
});
