// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

export const mapStateToProps = state => {
  const explore = state.get('explore');
  const restaurants = explore.get('restaurants').toJS();
  const sections = explore.get('sections').toJS();

  return {
    restaurants,
    sections
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch)
});
