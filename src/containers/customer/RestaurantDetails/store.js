// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import {
  addRestaurantDetail,
  addRemoveItemQuantity,
  changeItemRating,
  removeRestaurantDetail,
  clearCartData,
  showLoadingWhileAnimatingScreen,
  hideLoadingAfterScreenAnimationComplete
} from '../../../modules/restaurant';

export const mapStateToProps = state => {
  const data = state.get('restaurant').toJS();
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
  addRemoveItemQuantity: bindActionCreators(addRemoveItemQuantity, dispatch),
  changeItemRating: bindActionCreators(changeItemRating, dispatch),
  addRestaurantDetail: bindActionCreators(addRestaurantDetail, dispatch),
  removeRestaurantDetail: bindActionCreators(removeRestaurantDetail, dispatch),
  clearCartData: bindActionCreators(clearCartData, dispatch),
  showLoadingWhileAnimatingScreen: bindActionCreators(showLoadingWhileAnimatingScreen, dispatch),
  hideLoadingAfterScreenAnimationComplete: bindActionCreators(hideLoadingAfterScreenAnimationComplete, dispatch)
});
