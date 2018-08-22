// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { createMenu } from '../../../modules/menu';

export const mapStateToProps = state => {
  const vendor = state.get('vendor') && state.get('vendor').get('data');
  const avatarURL = vendor && vendor.get('avatarURL');

  return {
    vendor,
    avatarURL,
    menu: state.get('menu').get('data')
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  createMenu: bindActionCreators(createMenu, dispatch)
});
