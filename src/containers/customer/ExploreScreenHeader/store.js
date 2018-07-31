// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { toggleFilter } from '../../../modules/exploreFilter';

export const mapStateToProps = state => {
  const filtersReducer = state.get('filters').toJS();

  return {
    filtersReducer
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  toggleFilter: bindActionCreators(toggleFilter, dispatch)
});
