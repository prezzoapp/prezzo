// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

import { addRemoveItemQuantity, setType } from '../../../modules/restaurant';

export const mapStateToProps = state => {
  const data = state.get('restaurant').toJS();
  const type = state.get('restaurant').get('type');
  const paymentType = state.get('restaurant').get('paymentType');

  return {
    data,
    type,
    paymentType
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  addRemoveItemQuantity: bindActionCreators(addRemoveItemQuantity, dispatch),
  setType: bindActionCreators(setType, dispatch)
});
