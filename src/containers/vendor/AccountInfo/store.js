// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { uploadImage } from '../../../modules/upload';
import { createVendor, updateVendor } from '../../../modules/vendor';

export const mapStateToProps = state => {
  const isBusy =
    state.get('vendor').get('isBusy') ||
    state.get('upload').get('isBusy') ||
    false;
  const vendor = state.get('vendor').get('data');
  const avatarURL =
    vendor && vendor.get('avatarURL') ? vendor.get('avatarURL') : null;

  return {
    avatarURL,
    isBusy,
    vendor
  };
};

export const mapDispatchToProps = dispatch => ({
  createVendor: bindActionCreators(createVendor, dispatch),
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  navigateBack: bindActionCreators(NavigationActions.back, dispatch),
  updateVendor: bindActionCreators(updateVendor, dispatch),
  uploadImage: bindActionCreators(uploadImage, dispatch)
});
