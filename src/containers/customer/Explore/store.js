// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { listVendors } from '../../../modules/explore';

export const mapStateToProps = state => {
  const filters = state
    .get('explore')
    .get('filters')
    .toJS();
  const minDistance = state.get('explore').get('minDistance');
  const maxDistance = state.get('explore').get('maxDistance');
  const distance = state.get('explore').get('distance');
  const pricing = state.get('explore').get('pricing');
  const isBusy = state.get('explore').get('isBusy');

  return {
    filters,
    minDistance,
    maxDistance,
    distance,
    pricing,
    isBusy
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  listVendors: bindActionCreators(listVendors, dispatch)
});
