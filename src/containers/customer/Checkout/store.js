// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

import { addRemoveItemQuantity } from '../../../modules/restaurant';
import { userLogout } from '../../../modules/auth';

export const mapStateToProps = state => {
  const data = state.get('restaurant');
  const type = state.get('restaurant').get('type');
  const paymentType = state.get('restaurant').get('paymentType');
  const newlyAddedCard = state.get('paymentMethods').get('newlyAddedCard');
  const creditCardList = state
    .get('paymentMethods')
    .get('data');

  return {
    data,
    type,
    paymentType,
    creditCardList,
    newlyAddedCard
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  addRemoveItemQuantity: bindActionCreators(addRemoveItemQuantity, dispatch),
  userLogout: bindActionCreators(userLogout, dispatch)
});
