// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import {
  addWaiterRequestedItemDetails,
  removeWaiterRequestedItemDetails
} from '../../../modules/vendorActivity';

export const mapStateToProps = state => {
  const waiterRequestedSelectedItem = state.get('vendorActivity').get('waiterRequestedSelectedItem');
  const isBusy = state.get('vendorActivity').get('isBusy');
  const orderFinalStatus = state.get('vendorActivity').get('orderFinalStatus');

  return {
    waiterRequestedSelectedItem,
    isBusy,
    orderFinalStatus
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  addWaiterRequestedItemDetails: bindActionCreators(addWaiterRequestedItemDetails, dispatch),
  removeWaiterRequestedItemDetails: bindActionCreators(removeWaiterRequestedItemDetails, dispatch)
});
