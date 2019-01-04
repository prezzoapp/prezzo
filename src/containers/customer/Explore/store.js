// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { listVendors, getUserCurrentLocation } from '../../../modules/explore';

export const mapStateToProps = state => {
  const filters = state
    .get('explore')
    .get('filters')
    .toJS();
  const distance = state.get('explore').get('distance');
  const pricing = state.get('explore').get('pricing');
  const isBusy = state.get('explore').get('isBusy');
  // const currentLocation = state.get('explore').get('currentLocation') &&
  //   state.get('explore').get('currentLocation').toJS()

  return {
    filters,
    distance,
    pricing,
    isBusy,
    // currentLocation
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  listVendors: bindActionCreators(listVendors, dispatch),
  getUserCurrentLocation: bindActionCreators(getUserCurrentLocation, dispatch)
});
