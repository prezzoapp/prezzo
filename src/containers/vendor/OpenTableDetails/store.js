// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { openTableItemDetails, checkStatusAndCancelItem, checkOpenOrderStatus, makePaymentAndCompleteOrder } from '../../../modules/table';

export const mapStateToProps = state => {
  const openTableSelectedItem =
    state.get('table').get('openTableSelectedItem') &&
    state.get('table').get('openTableSelectedItem').toJS();
  const isBusy = state.get('table').get('isBusy');
  const openOrderFinalStatus = state.get('table').get('openOrderFinalStatus');

  return {
    openTableSelectedItem,
    isBusy,
    openOrderFinalStatus
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  openTableItemDetails: bindActionCreators(openTableItemDetails, dispatch),
  checkStatusAndCancelItem: bindActionCreators(checkStatusAndCancelItem, dispatch),
  checkOpenOrderStatus: bindActionCreators(checkOpenOrderStatus, dispatch),
  makePaymentAndCompleteOrder: bindActionCreators(makePaymentAndCompleteOrder, dispatch)
});