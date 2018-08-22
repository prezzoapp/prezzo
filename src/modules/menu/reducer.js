// @flow
import { fromJS } from 'immutable';
import {
  MENU_CREATE_REQUEST,
  MENU_CREATE_SUCCESS,
  MENU_CREATE_FAILURE,
  MENU_ADD_CATEGORY_REQUEST,
  MENU_ADD_CATEGORY_SUCCESS,
  MENU_ADD_CATEGORY_FAILURE,
  MENU_UPDATE_CATEGORY_REQUEST,
  MENU_UPDATE_CATEGORY_SUCCESS,
  MENU_UPDATE_CATEGORY_FAILURE,
  MENU_DELETE_CATEGORY_REQUEST,
  MENU_DELETE_CATEGORY_SUCCESS,
  MENU_DELETE_CATEGORY_FAILURE,
  MENU_ADD_ITEM_REQUEST,
  MENU_ADD_ITEM_SUCCESS,
  MENU_ADD_ITEM_FAILURE,
  MENU_UPDATE_ITEM_REQUEST,
  MENU_UPDATE_ITEM_SUCCESS,
  MENU_UPDATE_ITEM_FAILURE,
  MENU_DELETE_ITEM_REQUEST,
  MENU_DELETE_ITEM_SUCCESS,
  MENU_DELETE_ITEM_FAILURE,
  MENU_ADD_IMAGE_REQUEST,
  MENU_ADD_IMAGE_SUCCESS,
  MENU_ADD_IMAGE_FAILURE,
  MENU_DELETE_IMAGE_REQUEST,
  MENU_DELETE_IMAGE_SUCCESS,
  MENU_DELETE_IMAGE_FAILURE
} from './types';

import {
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_FACEBOOK_SUCCESS
} from '../auth/types';

const INITIAL_STATE = fromJS({
  isBusy: false,
  data: null
});

export default (state = INITIAL_STATE, action) => {
  let newState;
  let newCategories;

  switch (action.type) {
    case MENU_CREATE_REQUEST:
      return state.update('isBusy', () => false);
    case MENU_ADD_CATEGORY_REQUEST:
    case MENU_UPDATE_CATEGORY_REQUEST:
    case MENU_DELETE_CATEGORY_REQUEST:
    case MENU_ADD_ITEM_REQUEST:
    case MENU_UPDATE_ITEM_REQUEST:
    case MENU_DELETE_ITEM_REQUEST:
    case MENU_ADD_IMAGE_REQUEST:
    case MENU_DELETE_IMAGE_REQUEST:
      return state.set('isBusy', true);

    case MENU_CREATE_SUCCESS:
      return state
        .update('data', () => action.payload)
        .update('isBusy', () => false);

    case MENU_ADD_CATEGORY_SUCCESS:
    case MENU_UPDATE_CATEGORY_SUCCESS:
    case MENU_DELETE_CATEGORY_SUCCESS:
      newCategories = action.payload
        .get('categories')
        .map(item => item.set('data', item.get('items')).delete('items'));

      newState = state.update('data', () => action.payload);

      return newState
        .update('data', () =>
          newState.get('data').set('categories', newCategories)
        )
        .update('isBusy', () => false);

    case MENU_ADD_ITEM_SUCCESS:
    case MENU_UPDATE_ITEM_SUCCESS:
    case MENU_DELETE_ITEM_SUCCESS:
    case MENU_ADD_IMAGE_SUCCESS:
    case MENU_DELETE_IMAGE_SUCCESS:
      newCategories = action.payload
        .get('data')
        .get('categories')
        .map(item => item.set('data', item.get('items')).delete('items'));

      newState = state.update('data', () => action.payload);

      return newState
        .update('data', () =>
          newState
            .get('data')
            .get('data')
            .set('categories', newCategories)
        )
        .update('isBusy', () => false);

    case MENU_CREATE_FAILURE:
    case MENU_ADD_CATEGORY_FAILURE:
    case MENU_UPDATE_CATEGORY_FAILURE:
    case MENU_DELETE_CATEGORY_FAILURE:
    case MENU_ADD_ITEM_FAILURE:
    case MENU_UPDATE_ITEM_FAILURE:
    case MENU_DELETE_ITEM_FAILURE:
    case MENU_ADD_IMAGE_FAILURE:
    case MENU_DELETE_IMAGE_FAILURE:
      return state.set('isBusy', false);

    case LOGIN_WITH_EMAIL_SUCCESS:
    case LOGIN_WITH_FACEBOOK_SUCCESS: {
      // FILL MENU DATA AFTER LOGIN_WITH_EMAIL_SUCCESS
      if (!action.payload.get('vendor')) {
        return state.set('isBusy', false);
      }

      const menuStateAfterLogin = state.update('data', () =>
        action.payload.get('vendor').get('menu')
      );

      if (!menuStateAfterLogin || !menuStateAfterLogin.get('data')) {
        return menuStateAfterLogin.update('isBusy', () => false);
      }

      newCategories = menuStateAfterLogin
        .get('data')
        .get('categories')
        .map(item => item.set('data', item.get('items')).delete('items'));

      return menuStateAfterLogin
        .update('data', () =>
          menuStateAfterLogin.get('data').set('categories', newCategories)
        )
        .update('isBusy', () => false);
    }

    default:
      return state;
  }
};
