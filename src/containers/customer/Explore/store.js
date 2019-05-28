// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { listVendors, toggleFilter, updateDistance, updatePrice, getUserCurrentLocation, callWaiterBtnFunc } from '../../../modules/explore';

export const mapStateToProps = state => {
  const filters = state
    .get('explore')
    .get('filters')
    .toJS();
  const distance = state.get('explore').get('distance');
  const pricing = state.get('explore').get('pricing');
  const isBusy = state.get('explore').get('isBusy');
  const minDistance = state.get('explore').get('minDistance');
  const maxDistance = state.get('explore').get('maxDistance');
  const callWaiterBtnState = state.get('explore').get('callWaiterBtnState')
  const userName = state.get('user').get('account').get('fullName');
  const isUserOpenOrder = state.get('userActivity').get('data').size !== 0 ? true : false

  return {
    filters,
    distance,
    pricing,
    isBusy,
    minDistance,
    maxDistance,
    userName,
    callWaiterBtnState,
    isUserOpenOrder
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  listVendors: bindActionCreators(listVendors, dispatch),
  toggleFilter: bindActionCreators(toggleFilter, dispatch),
  updateDistance: bindActionCreators(updateDistance, dispatch),
  updatePrice: bindActionCreators(updatePrice, dispatch),
  getUserCurrentLocation: bindActionCreators(getUserCurrentLocation, dispatch),
  callWaiterBtnFunc: bindActionCreators(callWaiterBtnFunc, dispatch)
});
