// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { addRestaurantDetail } from '../../../modules/restaurant';

export const mapStateToProps = state => {
  const explore = state.get('explore');
  const restaurants = explore.get('restaurants').toJS();

  return {
    restaurants
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  addRestaurantDetail: bindActionCreators(addRestaurantDetail, dispatch)
});
