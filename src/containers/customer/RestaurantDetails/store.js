// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import {
  addRestaurantDetail,
  addSelectedItem
} from '../../../modules/restaurant';

export const mapStateToProps = state => {
  const data = state.get('restaurant').toJS();

  return {
    data
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  addRestaurantDetail: bindActionCreators(addRestaurantDetail, dispatch),
  addSelectedItem: bindActionCreators(addSelectedItem, dispatch)
});
