// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { userLogout } from '../../../modules/auth';

export const mapStateToProps = state => {
  const vendor = state.get('vendor') && state.get('vendor').get('data');
  const avatarURL = vendor && vendor.get('avatarURL');
  const menu = state.get('menu').get('data');

  return {
    vendor,
    avatarURL,
    menu
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  userLogout: bindActionCreators(userLogout, dispatch)
});
