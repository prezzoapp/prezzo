import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { listOpenOrders } from '../../../modules/userActivity';
import { makePaymentAndCompleteOrder } from '../../../modules/userActivity';

export const mapStateToProps = state => {
  const data = state
    .get('userActivity')
    .get('data')
    .toJS();

  const isBusy = state.get('userActivity').get('isBusy');

  return {
    data,
    isBusy
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    listOpenOrders: bindActionCreators(listOpenOrders, dispatch),
    makePaymentAndCompleteOrder: bindActionCreators(
      makePaymentAndCompleteOrder,
      dispatch
    ),
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
  };
};
