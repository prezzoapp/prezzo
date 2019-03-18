// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

import { addRemoveItemQuantity, setType } from '../../../modules/restaurant';
import { listCreditCards } from '../../../modules/paymentMethods';
import { userLogout } from '../../../modules/auth';

export const mapStateToProps = state => {
  const data = state.get('restaurant').toJS();
  const type = state.get('restaurant').get('type');
  const paymentType = state.get('restaurant').get('paymentType');
  const newlyAddedCard = state.get('paymentMethods').get('newlyAddedCard');
  const creditCardList = state
    .get('paymentMethods')
    .get('data')
    .toJS();

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
  setType: bindActionCreators(setType, dispatch),
  listCreditCards: bindActionCreators(listCreditCards, dispatch),
  userLogout: bindActionCreators(userLogout, dispatch)
});
