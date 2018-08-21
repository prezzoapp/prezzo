// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { toggleFilter, updateDistance } from '../../../modules/explore';

export const mapStateToProps = state => {
  const filters = state
    .get('explore')
    .get('filters')
    .toJS();
  const minDistance = state.get('explore').get('minDistance');
  const maxDistance = state.get('explore').get('maxDistance');
  const distance = state.get('explore').get('distance');

  return {
    filters,
    minDistance,
    maxDistance,
    distance
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  toggleFilter: bindActionCreators(toggleFilter, dispatch),
  updateDistance: bindActionCreators(updateDistance, dispatch)
});
