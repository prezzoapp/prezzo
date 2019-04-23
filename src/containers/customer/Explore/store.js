// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import {
  listVendors,
  toggleFilter,
  updateDistance,
  updatePrice,
  getUserCurrentLocation
} from '../../../modules/explore';
import { userLogout } from '../../../modules/auth';

export const mapStateToProps = state => {
  const filters = state
    .get('explore')
    .get('filters');
  const distance = state.get('explore').get('distance');
  const pricing = state.get('explore').get('pricing');
  const isBusy = state.get('explore').get('isBusy') ||
    state.get('paymentMethods').get('isBusy');
  const minDistance = state.get('explore').get('minDistance');
  const maxDistance = state.get('explore').get('maxDistance');

  return {
    filters,
    distance,
    pricing,
    isBusy,
    minDistance,
    maxDistance
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  listVendors: bindActionCreators(listVendors, dispatch),
  toggleFilter: bindActionCreators(toggleFilter, dispatch),
  updateDistance: bindActionCreators(updateDistance, dispatch),
  updatePrice: bindActionCreators(updatePrice, dispatch),
  getUserCurrentLocation: bindActionCreators(getUserCurrentLocation, dispatch),
  userLogout: bindActionCreators(userLogout, dispatch)
});
