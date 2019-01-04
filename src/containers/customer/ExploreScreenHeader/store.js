// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { toggleFilter, updateDistance, updatePrice, listVendors, getUserCurrentLocation } from '../../../modules/explore';

export const mapStateToProps = state => {
  const filters = state
    .get('explore')
    .get('filters')
    .toJS();
  const minDistance = state.get('explore').get('minDistance');
  const maxDistance = state.get('explore').get('maxDistance');
  const distance = state.get('explore').get('distance');
  const pricing = state.get('explore').get('pricing');
  // const currentLocation = state.get('explore').get('currentLocation') &&
  //   state.get('explore').get('currentLocation').toJS();

  return {
    filters,
    minDistance,
    maxDistance,
    distance,
    pricing,
    // currentLocation
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  toggleFilter: bindActionCreators(toggleFilter, dispatch),
  updateDistance: bindActionCreators(updateDistance, dispatch),
  updatePrice: bindActionCreators(updatePrice, dispatch),
  listVendors: bindActionCreators(listVendors, dispatch),
  getUserCurrentLocation: bindActionCreators(getUserCurrentLocation, dispatch)
});
