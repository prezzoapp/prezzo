// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

export const mapStateToProps = state => {
  const restaurants = state
    .get('explore')
    .get('restaurants')
    .toJS();

  return {
    restaurants
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch)
});
