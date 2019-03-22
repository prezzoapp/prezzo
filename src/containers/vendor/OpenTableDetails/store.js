// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import {
  openTableItemDetails,
  removeTableItemDetails,
  checkStatusAndCancelItem,
  checkOpenOrderStatus,
  makePaymentAndCompleteOrder
} from '../../../modules/table';
import { userLogout } from '../../../modules/auth';

export const mapStateToProps = state => {
  const openTableSelectedItem =
    state.get('table').get('openTableSelectedItem') &&
    state.get('table').get('openTableSelectedItem');
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
  removeTableItemDetails: bindActionCreators(removeTableItemDetails, dispatch),
  checkStatusAndCancelItem: bindActionCreators(checkStatusAndCancelItem, dispatch),
  checkOpenOrderStatus: bindActionCreators(checkOpenOrderStatus, dispatch),
  makePaymentAndCompleteOrder: bindActionCreators(makePaymentAndCompleteOrder, dispatch),
  userLogout: bindActionCreators(userLogout, dispatch)
});
