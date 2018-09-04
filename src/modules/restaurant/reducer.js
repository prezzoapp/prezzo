import { fromJS } from 'immutable';
import {
  ADD_RESTAURANT_DETAIL_REQUEST,
  ADD_RESTAURANT_DETAIL_SUCCESS,
  ADD_RESTAURANT_DETAIL_FAILURE,
  ADD_REMOVE_ITEM_QUANTITY_REQUEST,
  ADD_REMOVE_ITEM_QUANTITY_SUCCESS,
  ADD_REMOVE_ITEM_QUANTITY_FAILURE,
  CHANGE_ITEM_RATING_REQUEST,
  CHANGE_ITEM_RATING_SUCCESS,
  CHANGE_ITEM_RATING_FAILURE
} from './types';

const INITIAL_STATE = fromJS({
  isBusy: false,
  data: {},
  totalPrice: 0,
  tax: 2.43
});

calculatePrice = (categories) => {
  categories.map(category => {
    console.log(category.get('data').toJS());
  })
};

export default (state = INITIAL_STATE, action) => {
  let restaurant = null;
  let updatedMenuCategories = null;
  let updatedPrice = 0.00;

  switch(action.type) {
    case ADD_RESTAURANT_DETAIL_REQUEST:
    case ADD_RESTAURANT_DETAIL_FAILURE:
    case ADD_REMOVE_ITEM_QUANTITY_REQUEST:
    case ADD_REMOVE_ITEM_QUANTITY_FAILURE:
    case CHANGE_ITEM_RATING_REQUEST:
    case CHANGE_ITEM_RATING_FAILURE:
      return state.update('isBusy', () => true);
    case ADD_RESTAURANT_DETAIL_SUCCESS:
      restaurant = state.update('data', () => action.payload);

      if(restaurant.get('data').has('menu')) {
        updatedMenuCategories = restaurant.get('data').get('menu').get('categories').map((category) => {
          return category.set('data', category.get('items').map((item) => {
            return item.set('quantity', 0).set('rating', 1);
          })).delete('items');
        });

        return restaurant.updateIn(
          ['data', 'menu', 'categories'],
          categories => updatedMenuCategories
        ).update('isBusy', () => false);
      }

      return state
        .update('isBusy', () => false)
        .update('data', () => action.payload);

    case ADD_REMOVE_ITEM_QUANTITY_SUCCESS:
      updatedMenuCategories = state.get('data').get('menu').get('categories').update(
        state.get('data').get('menu').get('categories').findIndex(category => {
          return category.get('_id') === action.payload.sectionId
        }), (categoryItem) => {
          return categoryItem.set('data', categoryItem.get('data').update(
            categoryItem.get('data').findIndex(item => {
              return item.get('_id') === action.payload.itemId;
            }), (menuItem) => {
              if(action.payload.op === 'add') {
                return menuItem.set('quantity', menuItem.get('quantity') + 1);
              }
              return menuItem.set(
                'quantity',
                menuItem.get('quantity') > 0
                  ? menuItem.get('quantity') - 1
                  : menuItem.get('quantity')
              );
            }
          ))
        }
      );

      updatedPrice = calculatePrice(updatedMenuCategories);

      return state.updateIn(
        ['data', 'menu', 'categories'],
        categories => updatedMenuCategories
      ).update('isBusy', () => false);

      case CHANGE_ITEM_RATING_SUCCESS:
        updatedMenuCategories = state.get('data').get('menu').get('categories').update(
          state.get('data').get('menu').get('categories').findIndex(category => {
            return category.get('_id') === action.payload.sectionId
          }), (categoryItem) => {
            return categoryItem.set('data', categoryItem.get('data').update(
              categoryItem.get('data').findIndex(item => {
                return item.get('_id') === action.payload.itemId;
              }), (menuItem) => {
                return menuItem.set('rating', action.payload.rating);
              }
            ))
          }
        );

        return state.updateIn(
          ['data', 'menu', 'categories'],
          categories => updatedMenuCategories
        ).update('isBusy', () => false);

    default:
      return state;
  }
};
