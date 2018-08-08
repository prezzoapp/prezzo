// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { createMenu } from '../../../modules/menu';

export const mapStateToProps = state => ({
  vendor: state.get('vendor').get('data'),
  menu: state.get('menu').get('menuData')
});

export const mapDispatchToProps = dispatch => {
  return {
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    createMenu: bindActionCreators(createMenu, dispatch)
  };
};
