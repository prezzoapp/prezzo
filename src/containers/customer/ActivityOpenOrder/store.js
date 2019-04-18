import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import {
  listOpenOrders,
  makePaymentAndCompleteOrder,
  checkStatusAndCancelItem,
  checkOrderStatus
} from '../../../modules/userActivity';

export const mapStateToProps = state => {
  const data = state
    .get('userActivity')
    .get('data');

  const userId = state
    .get('user')
    .get('account')
    .get('_id');

  const openOrderFinalStatus = state
    .get('userActivity')
    .get('openOrderFinalStatus');

  const isBusy = state.get('userActivity').get('isBusy');

  return {
    data,
    isBusy,
    userId,
    openOrderFinalStatus
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    listOpenOrders: bindActionCreators(listOpenOrders, dispatch),
    makePaymentAndCompleteOrder: bindActionCreators(
      makePaymentAndCompleteOrder,
      dispatch
    ),
    checkStatusAndCancelItem: bindActionCreators(
      checkStatusAndCancelItem,
      dispatch
    ),
    checkOrderStatus: bindActionCreators(checkOrderStatus, dispatch),
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
  };
};
