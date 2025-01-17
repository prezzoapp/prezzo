// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { uploadImage } from '../../../modules/upload';
import { createVendor, updateVendor } from '../../../modules/vendor';
import { userLogout } from '../../../modules/auth';

export const mapStateToProps = state => {
  const vendorState = state.get('vendor');
  const isBusy =
    vendorState.get('isBusy') || state.get('upload').get('isBusy') || false;
  const vendor = vendorState && vendorState.get('data');
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
  uploadImage: bindActionCreators(uploadImage, dispatch),
  userLogout: bindActionCreators(userLogout, dispatch)
});
