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
  CHANGE_ITEM_RATING_FAILURE,
  REMOVE_RESTAURANT_DETAIL_REQUEST,
  REMOVE_RESTAURANT_DETAIL_SUCCESS,
  REMOVE_RESTAURANT_DETAIL_FAILURE,
  CLEAR_CART_DATA_REQUEST,
  CLEAR_CART_DATA_SUCCESS,
  CLEAR_CART_DATA_FAILURE,

  SET_TYPE_REQUEST,
  SET_TYPE_SUCCESS,
  SET_TYPE_FAILURE

  // SET_PAYMENT_TYPE_REQUEST,
  // SET_PAYMENT_TYPE_SUCCESS,
  // SET_PAYMENT_TYPE_FAILURE,
  //
  // CREATE_ORDER_REQUEST,
  // CREATE_ORDER_SUCCESS,
  // CREATE_ORDER_FAILURE
} from './types';

const INITIAL_STATE = fromJS({
  isBusy: false,
  data: null,
  totalPrice: 0.0,
  type: 'table',
  paymentType: '',
  vendor: null,
  paymentMethod: null,

  // currentOrder: null
});

calculateFinalPrice = categories => {
  let price = 0;

  categories.map(category => {
    category.get('data').map(item => {
      price += item.get('quantity') * item.get('price')
    });
  });

  return parseFloat(price);
}

export default (state = INITIAL_STATE, action) => {
  let restaurant = null;
  let updatedMenuCategories = null;

  switch(action.type) {
    case ADD_RESTAURANT_DETAIL_REQUEST:
    case REMOVE_RESTAURANT_DETAIL_REQUEST:
    case ADD_REMOVE_ITEM_QUANTITY_REQUEST:
    case CHANGE_ITEM_RATING_REQUEST:
    case CLEAR_CART_DATA_REQUEST:
    case SET_TYPE_REQUEST:
    // case SET_PAYMENT_TYPE_REQUEST:
    // case CREATE_ORDER_REQUEST:
      return state.update('isBusy', () => true);

    case ADD_RESTAURANT_DETAIL_FAILURE:
    case REMOVE_RESTAURANT_DETAIL_FAILURE:
    case ADD_REMOVE_ITEM_QUANTITY_FAILURE:
    case CHANGE_ITEM_RATING_FAILURE:
    case CLEAR_CART_DATA_FAILURE:
    case SET_TYPE_FAILURE:
    // case SET_PAYMENT_TYPE_FAILURE:
    // case CREATE_ORDER_FAILURE:
      return state.update('isBusy', () => false);

    // case CREATE_ORDER_SUCCESS:
    //   return state
    //     .update('currentOrder', () => action.payload)
    //     .update('isBusy', () => false);

    case ADD_RESTAURANT_DETAIL_SUCCESS:
      restaurant = state.set('data', action.payload);

      if(restaurant.get('data').hasIn(['menu'])) {
        if(restaurant.get('data').hasIn(['menu', 'categories'])) {
          if (
            restaurant
              .get('data')
              .get('menu')
              .get('categories').size !== 0
          ) {
            updatedMenuCategories = restaurant
              .get('data')
              .get('menu')
              .get('categories')
              .map(category => {
                return category
                  .set(
                    'data',
                    category.get('items').map(item => {
                      return item.set('quantity', 0).set('rating', 1);
                    })
                  )
                  .delete('items');
              });

            return restaurant.updateIn(
                ['data', 'menu', 'categories'],
                categories => updatedMenuCategories
              )
              .update('isBusy', () => false)
              .update('totalPrice', () => 0.0);
          }
        }
      }

      return restaurant.set('isBusy', false).update('totalPrice', () => 0.0);

    case REMOVE_RESTAURANT_DETAIL_SUCCESS:
      return state.set('data', null);

    case ADD_REMOVE_ITEM_QUANTITY_SUCCESS:
      updatedMenuCategories = state
        .get('data')
        .get('menu')
        .get('categories')
        .update(
          state
            .get('data')
            .get('menu')
            .get('categories')
            .findIndex(category => {
              return category.get('_id') === action.payload.sectionId;
            }),
          categoryItem => {
            return categoryItem.set(
              'data',
              categoryItem.get('data').update(
            categoryItem.get('data').findIndex(item => {
              return item.get('_id') === action.payload.itemId;
                }),
                menuItem => {
                  if (action.payload.op === 'add') {
                    return menuItem.set(
                      'quantity',
                      menuItem.get('quantity') + 1
                    );
                  }
                  return menuItem.set(
                    'quantity',
                    menuItem.get('quantity') > 0
                      ? menuItem.get('quantity') - 1
                      : menuItem.get('quantity')
                  );
                }
              )
            );
          }
        );

      return state.updateIn(
        ['data', 'menu', 'categories'],
        categories => updatedMenuCategories
        )
        .update('totalPrice', () =>
          this.calculateFinalPrice(updatedMenuCategories)
        )
        .update('isBusy', () => false);

    case CHANGE_ITEM_RATING_SUCCESS:
      updatedMenuCategories = state
        .get('data')
        .get('menu')
        .get('categories')
        .update(
          state
            .get('data')
            .get('menu')
            .get('categories')
            .findIndex(category => {
              return category.get('_id') === action.payload.sectionId;
            }),
          categoryItem => {
            return categoryItem.set(
              'data',
              categoryItem.get('data').update(
                categoryItem.get('data').findIndex(item => {
                  return item.get('_id') === action.payload.itemId;
                }),
                menuItem => {
                  return menuItem.set('rating', action.payload.rating);
                }
              )
            );
          }
        );

      return state.updateIn(
          ['data', 'menu', 'categories'],
          categories => updatedMenuCategories
        )
        .update('isBusy', () => false);

    case SET_TYPE_SUCCESS:
      return state.update('type', () => action.payload.type);
    default:
      return state;

    case CLEAR_CART_DATA_SUCCESS:
      if(state.get('data').hasIn(['menu'])) {
        if(state.get('data').hasIn(['menu', 'categories'])) {
          if (
            state
              .get('data')
              .get('menu')
              .get('categories').size !== 0
          ) {
            updatedMenuCategories = state
              .get('data')
              .get('menu')
              .get('categories')
              .map(category => {
                return category.set(
                  'data',
                  category.get('data').map(item => {
                return item.set('quantity', 0).set('rating', 1);
                  })
                );
            });

            return state.updateIn(
              ['data', 'menu', 'categories'],
              categories => updatedMenuCategories
              )
              .update('isBusy', () => false)
              .update('totalPrice', () => 0.0);
          }
        }
      }
  }
};
