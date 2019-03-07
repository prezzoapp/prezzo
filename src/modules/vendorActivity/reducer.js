// @flow
import { fromJS } from 'immutable';
import {
  WAITER_REQUESTED_TABLE_REQUEST,
  WAITER_REQUESTED_TABLE_SUCCESS,
  WAITER_REQUESTED_TABLE_FAILURE,
  PHOTO_REVIEW_TABLE_REQUEST,
  PHOTO_REVIEW_TABLE_SUCCESS,
  PHOTO_REVIEW_TABLE_FAILURE,
  SECTION_CHANGE,
  LAYOUT_CHANGE,
  ADD_WAITER_REQUESTED_ITEM_DETAILS_REQUEST,
  ADD_WAITER_REQUESTED_ITEM_DETAILS_SUCCESS,
  ADD_WAITER_REQUESTED_ITEM_DETAILS_FAILURE,
  REMOVE_WAITER_REQUESTED_ITEM_DETAILS_REQUEST,
  REMOVE_WAITER_REQUESTED_ITEM_DETAILS_SUCCESS,
  REMOVE_WAITER_REQUESTED_ITEM_DETAILS_FAILURE,
  ADD_PHOTO_REVIEW_ITEM_DETAILS_REQUEST,
  ADD_PHOTO_REVIEW_ITEM_DETAILS_SUCCESS,
  ADD_PHOTO_REVIEW_ITEM_DETAILS_FAILURE,
  REMOVE_PHOTO_REVIEW_ITEM_DETAILS_REQUEST,
  REMOVE_PHOTO_REVIEW_ITEM_DETAILS_SUCCESS,
  REMOVE_PHOTO_REVIEW_ITEM_DETAILS_FAILURE
} from './types';

const INITIAL_STATE = fromJS({
  layout: 'list',
  section: 0,
  waiterRequestedTableList: [],
  photoReviewList: [],
  isBusy: false,
  waiterRequestedSelectedItem: null,
  photoReviewSelectedItem: null
});

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WAITER_REQUESTED_TABLE_REQUEST:
    case PHOTO_REVIEW_TABLE_REQUEST:
      return state.update('isBusy', () => true);

    case WAITER_REQUESTED_TABLE_FAILURE:
    case PHOTO_REVIEW_TABLE_FAILURE:
      return state.update('isBusy', () => false);

    case WAITER_REQUESTED_TABLE_SUCCESS:
      return state.update('waiterRequestedTableList', () => action.payload).update('isBusy', () => false);
    case PHOTO_REVIEW_TABLE_SUCCESS:
      return state.update('photoReviewList', () => action.payload).update('isBusy', () => false);

    case SECTION_CHANGE:
      return state.update('section', () => action.payload);

    case LAYOUT_CHANGE:
      return state.update('layout', () => action.payload);

    case REMOVE_WAITER_REQUESTED_ITEM_DETAILS_SUCCESS:
      return state.update('waiterRequestedSelectedItem', () => null);
    case REMOVE_PHOTO_REVIEW_ITEM_DETAILS_SUCCESS:
      return state.update('photoReviewSelectedItem', () => null);

    case ADD_WAITER_REQUESTED_ITEM_DETAILS_SUCCESS:
      return state.update('waiterRequestedSelectedItem', () => action.payload);
    case ADD_PHOTO_REVIEW_ITEM_DETAILS_SUCCESS:
      return state.update('photoReviewSelectedItem', () => action.payload);
    default:
      return state;
  }
};

export default reducer;
