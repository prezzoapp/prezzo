import { fromJS } from 'immutable';
import {
  ADD_RESTAURANT_ITEM_REQUEST,
  ADD_RESTAURANT_ITEM_SUCCESS,
  ADD_RESTAURANT_ITEM_FAILURE
} from './types';

const INITIAL_STATE = fromJS({
  isBusy: false,
  data: null
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_RESTAURANT_ITEM_REQUEST:
      return state.update('isBusy', () => true);

    case ADD_RESTAURANT_ITEM_SUCCESS:
      return state
        .update('data', () => action.payload)
        .update('isBusy', () => false);

    case ADD_RESTAURANT_ITEM_FAILURE:
      return state.set('isBusy', false);

    default:
      return state;
  }
};
