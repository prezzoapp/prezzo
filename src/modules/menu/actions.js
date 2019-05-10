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

import { post, del, put } from '../../utils/api';

export const createMenu = async () => async dispatch => {
  dispatch({ type: MENU_CREATE_REQUEST });
  try {
    const menu = await post('/v1/menus');

    return dispatch({
      type: MENU_CREATE_SUCCESS,
      payload: fromJS(menu)
    });
  } catch (e) {
    dispatch({
      type: MENU_CREATE_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};

export const addCategory = async (
  menuId: string,
  title: string
) => async dispatch => {
  dispatch({ type: MENU_ADD_CATEGORY_REQUEST });

  try {
    console.log("Menu ID: ", menuId);
    const data = await post(`/v1/menus/${menuId}/categories`, {
      title
    });

    return dispatch({
      type: MENU_ADD_CATEGORY_SUCCESS,
      payload: fromJS(data)
    });
  } catch (e) {
    dispatch({ type: MENU_ADD_CATEGORY_FAILURE });
  }
};

export const updateCategory = async (
  menuId: string,
  categoryId: string,
  title: string
) => async dispatch => {
  dispatch({ type: MENU_UPDATE_CATEGORY_REQUEST });

  try {
    const data = await put(`/v1/menus/${menuId}/categories/${categoryId}`, {
      title
    });

    return dispatch({
      type: MENU_UPDATE_CATEGORY_SUCCESS,
      payload: fromJS(data)
    });
  } catch (e) {
    dispatch({ type: MENU_UPDATE_CATEGORY_FAILURE });
  }
};

export const deleteCategory = async (
  menuId: string,
  categoryId: string
) => async dispatch => {
  dispatch({ type: MENU_DELETE_CATEGORY_REQUEST });

  try {
    const data = await del(`/v1/menus/${menuId}/categories/${categoryId}`);

    return dispatch({
      type: MENU_DELETE_CATEGORY_SUCCESS,
      payload: fromJS(data)
    });
  } catch (e) {
    dispatch({ type: MENU_DELETE_CATEGORY_FAILURE });
  }
};

export const addItem = async (
  menuId: string,
  categoryId: string,
  title: string,
  description: string,
  price: number
) => async dispatch => {
  dispatch({ type: MENU_ADD_ITEM_REQUEST });

  try {
    const data = await post(
      `/v1/menus/${menuId}/categories/${categoryId}/items`,
      {
        title,
        description,
        price
      }
    );

    dispatch({
      type: MENU_ADD_ITEM_SUCCESS,
      payload: fromJS({ data })
    });
  } catch (e) {
    dispatch({ type: MENU_ADD_ITEM_FAILURE });
  }
};

export const updateItem = async (
  menuId: string,
  categoryId: string,
  itemId,
  title: string,
  description: string,
  price: number
) => async dispatch => {
  dispatch({ type: MENU_UPDATE_ITEM_REQUEST });

  try {
    const data = await put(
      `/v1/menus/${menuId}/categories/${categoryId}/items/${itemId}`,
      {
        title,
        description,
        price
      }
    );

    dispatch({
      type: MENU_UPDATE_ITEM_SUCCESS,
      payload: fromJS({ data })
    });
  } catch (e) {
    dispatch({ type: MENU_UPDATE_ITEM_FAILURE });
  }
};

export const deleteItem = async (
  menuId: string,
  categoryId: string,
  itemId: string
) => async dispatch => {
  dispatch({ type: MENU_DELETE_ITEM_REQUEST });

  try {
    const data = await del(
      `/v1/menus/${menuId}/categories/${categoryId}/items/${itemId}`
    );

    dispatch({
      type: MENU_DELETE_ITEM_SUCCESS,
      payload: fromJS({ data })
    });
  } catch (e) {
    dispatch({ type: MENU_DELETE_ITEM_FAILURE });
    throw e;
  }
};

export const addImage = async (
  menuId: string,
  categoryId: string,
  itemId: string,
  imageURL: string
) => async dispatch => {
  dispatch({ type: MENU_ADD_IMAGE_REQUEST });

  try {
    const data = await post(
      `/v1/menus/${menuId}/categories/${categoryId}/items/${itemId}/photos`, {
        imageURL
      }
    );

    dispatch({
      type: MENU_ADD_IMAGE_SUCCESS,
      payload: fromJS({ data })
    });
  } catch (e) {
    dispatch({ type: MENU_ADD_IMAGE_FAILURE });
  }
};

export const deleteImage = async (
  menuId: string,
  categoryId: string,
  itemId: string,
  imageURL: string
) => async dispatch => {
  dispatch({ type: MENU_DELETE_IMAGE_REQUEST });

  try {
    const data = await del(
      `/v1/menus/${menuId}/categories/${categoryId}/items/${itemId}/photos`, {
        imageURL
      }
    );

    dispatch({
      type: MENU_DELETE_IMAGE_SUCCESS,
      payload: fromJS({ data })
    });
  } catch (e) {
    dispatch({ type: MENU_DELETE_IMAGE_FAILURE });
    throw e;
  }
};
