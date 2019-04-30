// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import {
  addRestaurantDetail,
  addRemoveItemQuantity,
  // changeItemRating,
  removeRestaurantDetail,
  clearCartData
} from '../../../modules/restaurant';

export const mapStateToProps = state => {
  const data = state.get('restaurant');
  const type = state.get('restaurant').get('type');

  return {
    data,
    type
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  addRemoveItemQuantity: bindActionCreators(addRemoveItemQuantity, dispatch),
  // changeItemRating: bindActionCreators(changeItemRating, dispatch),
  addRestaurantDetail: bindActionCreators(addRestaurantDetail, dispatch),
  removeRestaurantDetail: bindActionCreators(removeRestaurantDetail, dispatch),
  clearCartData: bindActionCreators(clearCartData, dispatch)
});
