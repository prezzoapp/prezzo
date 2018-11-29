// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { openTableItemDetails, checkStatusAndCancelItem, checkOrderStatus, makePaymentAndCompleteOrder } from '../../../modules/table';

export const mapStateToProps = state => {
  const openTableSelectedItem =
    state.get('table').get('openTableSelectedItem') &&
    state.get('table').get('openTableSelectedItem').toJS();
  const isBusy = state.get('table').get('isBusy');

  return {
    openTableSelectedItem,
    isBusy
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  openTableItemDetails: bindActionCreators(openTableItemDetails, dispatch),
  checkStatusAndCancelItem: bindActionCreators(checkStatusAndCancelItem, dispatch),
  checkOrderStatus: bindActionCreators(checkOrderStatus, dispatch),
  makePaymentAndCompleteOrder: bindActionCreators(makePaymentAndCompleteOrder, dispatch)
});
