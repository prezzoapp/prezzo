// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

export const mapStateToProps = state => {
  const explore = state.get('explore');
  const restaurants = explore.get('restaurants').toJS();
  const exploreRestaurants = explore.get('exploreRestaurants').toJS();

  return {
    restaurants,
    exploreRestaurants
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch)
});
