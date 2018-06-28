// @flow
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {createVendor, updateVendor} from '../../modules/vendor';

export const mapStateToProps = state => {
  const avatarURL = state.get('user').get('account').get('avatarURL');
  const isBusy = state.get('vendor').get('isBusy');
  const vendor = state.get('vendor').get('data');

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
    updateVendor: bindActionCreators(updateVendor, dispatch)
  };
};
