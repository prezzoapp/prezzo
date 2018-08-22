// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { toggleFilter } from '../../../modules/explore';

export const mapStateToProps = state => {
  const filters = state
    .get('explore')
    .get('filters')
    .toJS();

  return {
    filters
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  toggleFilter: bindActionCreators(toggleFilter, dispatch)
});
