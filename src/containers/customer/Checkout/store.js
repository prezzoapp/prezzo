// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

import { addRemoveItemQuantity } from '../../../modules/restaurant';

export const mapStateToProps = state => {
  const data = state
    .get('restaurant')
    .get('data')
    .get('menu')
    .get('categories')
    .toJS();

  return {
    data
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  addRemoveItemQuantity: bindActionCreators(addRemoveItemQuantity, dispatch)
});
