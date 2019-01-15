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

  return {
    filters,
    distance,
    pricing,
    isBusy
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  listVendors: bindActionCreators(listVendors, dispatch),
  getUserCurrentLocation: bindActionCreators(getUserCurrentLocation, dispatch)
});
