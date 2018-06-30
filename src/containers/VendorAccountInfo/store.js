// @flow
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {createVendor, updateVendor} from '../../modules/vendor';

export const mapStateToProps = state => {
  const isBusy = state.get('vendor').get('isBusy');
  const user = state.get('user').get('account');
  const vendor = state.get('vendor').get('data');
  const avatarURL = vendor.get('avatarURL') || user.get('avatarURL') || null;

  return {
    avatarURL,
    isBusy,
    vendor
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    createVendor: bindActionCreators(createVendor, dispatch),
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    navigateBack: bindActionCreators(NavigationActions.back, dispatch),
    updateVendor: bindActionCreators(updateVendor, dispatch)
  };
};
