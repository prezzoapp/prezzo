// @flow
import { bindActionCreators } from 'redux';
import {
  createMenu,
  addCategory,
  updateCategory,
  deleteCategory,
  addItem,
  updateItem,
  deleteItem,
  addImage,
  deleteImage
} from '../../../modules/menu';

import { uploadImage } from '../../../modules/upload';

import { userLogout } from '../../../modules/auth';

export const mapStateToProps = state => ({
  menuId:
    state.get('menu') &&
    state.get('menu').get('data') &&
    state
      .get('menu')
      .get('data')
      .get('_id'),
  isBusy: state.get('menu') && state.get('menu').get('isBusy'),
  menu: state.get('menu') && state.get('menu').get('data'),
  uploadIsBusy: state.get('upload') && state.get('upload').get('isBusy')
});

export const mapDispatchToProps = dispatch => ({
  createMenu: bindActionCreators(createMenu, dispatch),
  addCategory: bindActionCreators(addCategory, dispatch),
  updateCategory: bindActionCreators(updateCategory, dispatch),
  deleteCategory: bindActionCreators(deleteCategory, dispatch),
  addItem: bindActionCreators(addItem, dispatch),
  updateItem: bindActionCreators(updateItem, dispatch),
  deleteItem: bindActionCreators(deleteItem, dispatch),
  addImage: bindActionCreators(addImage, dispatch),
  deleteImage: bindActionCreators(deleteImage, dispatch),
  uploadImage: bindActionCreators(uploadImage, dispatch),
  userLogout: bindActionCreators(userLogout, dispatch)
});
