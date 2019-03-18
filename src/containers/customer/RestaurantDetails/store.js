// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import {
  addRestaurantDetail,
  addRemoveItemQuantity,
  removeRestaurantDetail,
  clearCartData,
  createOrder
} from '../../../modules/restaurant';
import { userLogout } from '../../../modules/auth';

export const mapStateToProps = state => {
  const data = state.get('restaurant');
  const type = state.get('restaurant').get('type');
  const isBusy = state.get('restaurant').get('isBusy');

  return {
    data,
    type,
    isBusy
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  createOrder: bindActionCreators(createOrder, dispatch),
  addRemoveItemQuantity: bindActionCreators(addRemoveItemQuantity, dispatch),
  addRestaurantDetail: bindActionCreators(addRestaurantDetail, dispatch),
  removeRestaurantDetail: bindActionCreators(removeRestaurantDetail, dispatch),
  clearCartData: bindActionCreators(clearCartData, dispatch),
  userLogout: bindActionCreators(userLogout, dispatch)
});
