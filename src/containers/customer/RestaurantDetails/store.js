// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import {
  addRestaurantDetail,
  addRemoveItemQuantity,
  changeItemRating,
  removeRestaurantDetail
} from '../../../modules/restaurant';

export const mapStateToProps = state => {
  const data = state.get('restaurant').toJS();

  return {
    data
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  addRemoveItemQuantity: bindActionCreators(addRemoveItemQuantity, dispatch),
  changeItemRating: bindActionCreators(changeItemRating, dispatch),
  addRestaurantDetail: bindActionCreators(addRestaurantDetail, dispatch),
  removeRestaurantDetail: bindActionCreators(removeRestaurantDetail, dispatch)
});
