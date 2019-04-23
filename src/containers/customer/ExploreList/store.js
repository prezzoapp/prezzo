// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { listVendors, getUserCurrentLocation } from '../../../modules/explore';
import { userLogout } from '../../../modules/auth';

export const mapStateToProps = state => {
  const explore = state.get('explore');
  const restaurants = explore.get('restaurants');
  const filters = state
    .get('explore')
    .get('filters');
  const distance = state.get('explore').get('distance');
  const pricing = state.get('explore').get('pricing');

  return {
    filters,
    distance,
    pricing,
    restaurants
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  listVendors: bindActionCreators(listVendors, dispatch),
  getUserCurrentLocation: bindActionCreators(getUserCurrentLocation, dispatch),
  userLogout: bindActionCreators(userLogout, dispatch)
});
