// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { listVendors, getUserCurrentLocation } from '../../../modules/explore';
import { userLogout } from '../../../modules/auth';

export const mapStateToProps = state => {
  const explore = state.get('explore');
  const restaurants = explore.get('restaurants').toJS();
  const isBusy = explore.get('isBusy');
  const filters = state
    .get('explore')
    .get('filters')
    .toJS();
  const distance = state.get('explore').get('distance');
  const pricing = state.get('explore').get('pricing');
  const currentLocation = state.get('explore').get('currentLocation') &&
    state.get('explore').get('currentLocation').toJS()

  return {
    filters,
    distance,
    pricing,
    restaurants,
    isBusy
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  listVendors: bindActionCreators(listVendors, dispatch),
  getUserCurrentLocation: bindActionCreators(getUserCurrentLocation, dispatch),
  userLogout: bindActionCreators(userLogout, dispatch)
});
