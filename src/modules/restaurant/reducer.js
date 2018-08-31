import { fromJS } from 'immutable';
import {
  ADD_RESTAURANT_DETAIL_REQUEST,
  ADD_RESTAURANT_DETAIL_SUCCESS,
  ADD_RESTAURANT_DETAIL_FAILURE,
  ADD_SELECTED_ITEM_REQUEST,
  ADD_SELECTED_ITEM_SUCCESS,
  ADD_SELECTED_ITEM_FAILURE
} from './types';

const INITIAL_STATE = fromJS({
  isBusy: false,
  data: {
    restaurantName: '',
    location: {},
    selectedItems: [
      {
        id: 1,
        name: 'Cucumber Salad',
        quantity: 1
      },
      {
        id: 2,
        name: 'Sushi Sampler',
        quantity: 1
      },
      {
        id: 3,
        name: 'Original Poke',
        quantity: 1
      },
      {
        id: 4,
        name: 'Cucumber Salad',
        quantity: 1
      },
      {
        id: 5,
        name: 'Sushi Sampler',
        quantity: 1
      },
      {
        id: 6,
        name: 'Original Poke',
        quantity: 1
      },
      {
        id: 7,
        name: 'Cucumber Salad',
        quantity: 1
      },
      {
        id: 8,
        name: 'Sushi Sampler',
        quantity: 1
      },
      {
        id: 9,
        name: 'Original Poke',
        quantity: 1
      }
    ],
    subtotal: 0,
    total: 0
  }
});

export default (state = INITIAL_STATE, action) => {
  return state;
};
