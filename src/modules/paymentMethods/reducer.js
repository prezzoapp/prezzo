import { fromJS } from 'immutable';
import {
  ADD_CREDIT_CARD_REQUEST,
  ADD_CREDIT_CARD_SUCCESS,
  ADD_CREDIT_CARD_FAILURE,
  REMOVE_CREDIT_CARD_REQUEST,
  REMOVE_CREDIT_CARD_SUCCESS,
  REMOVE_CREDIT_CARD_FAILURE,
  LIST_CREDIT_CARDS_REQUEST,
  LIST_CREDIT_CARDS_SUCCESS,
  LIST_CREDIT_CARDS_FAILURE,
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILURE,
  IS_TOKENIZATION_COMPLETE_REQUEST,
  IS_TOKENIZATION_COMPLETE_SUCCESS,
  IS_TOKENIZATION_COMPLETE_FAILURE,
  SHOW_LOADING,
  HIDE_LOADING
} from './types';

const INITIAL_STATE = fromJS({
  isBusy: false,
  data: []
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CREDIT_CARD_REQUEST:
    case REMOVE_CREDIT_CARD_REQUEST:
    case LIST_CREDIT_CARDS_REQUEST:
    case GET_TOKEN_REQUEST:
    case IS_TOKENIZATION_COMPLETE_REQUEST:
    case SHOW_LOADING:
      return state.update('isBusy', () => true);

    case ADD_CREDIT_CARD_FAILURE:
    case REMOVE_CREDIT_CARD_FAILURE:
    case LIST_CREDIT_CARDS_FAILURE:
    case GET_TOKEN_FAILURE:
    case IS_TOKENIZATION_COMPLETE_FAILURE:
    case GET_TOKEN_SUCCESS:
    case IS_TOKENIZATION_COMPLETE_SUCCESS:
    case HIDE_LOADING:
      return state.update('isBusy', () => false);

    case REMOVE_CREDIT_CARD_SUCCESS:
      return state.update('data', () =>
          state.get('data').filter(item => item.get('_id') !== action.payload)
        )
        .update('isBusy', () => false);

    case ADD_CREDIT_CARD_SUCCESS:
      if (action.payload.get('defaultPayment')) {
        return state
          .update('data', array =>
            array.map(item => {
              return item.set('isDefault', false);
              })
              .push(action.payload.get('cardInfo'))
          )
          .update('isBusy', () => false);
      }

      return state
        .update('data', array => array.push(action.payload.get('cardInfo')))
        .update('isBusy', () => false);

    case LIST_CREDIT_CARDS_SUCCESS:
      return state
        .update('data', () => action.payload)
        .update('isBusy', () => false);
    default:
      return state;
  }
};
