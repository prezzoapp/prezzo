// @flow
import { fromJS } from 'immutable';

import {
  MENU_CREATE_REQUEST,
  MENU_CREATE_SUCCESS,
  MENU_CREATE_FAILURE,
  MENU_ADD_CATEGORY_REQUEST,
  MENU_ADD_CATEGORY_SUCCESS,
  MENU_ADD_CATEGORY_FAILURE,
  EDIT_CATEGORY,
  MENU_UPDATE_CATEGORY_REQUEST,
  MENU_UPDATE_CATEGORY_SUCCESS,
  MENU_UPDATE_CATEGORY_FAILURE,
  MENU_DELETE_CATEGORY_REQUEST,
  MENU_DELETE_CATEGORY_SUCCESS,
  MENU_DELETE_CATEGORY_FAILURE,
  MENU_ADD_ITEM_REQUEST,
  MENU_ADD_ITEM_SUCCESS,
  MENU_ADD_ITEM_FAILURE,
  EDIT_ITEM,
  MENU_UPDATE_ITEM_REQUEST,
  MENU_UPDATE_ITEM_SUCCESS,
  MENU_UPDATE_ITEM_FAILURE,
  MENU_DELETE_ITEM_REQUEST,
  MENU_DELETE_ITEM_SUCCESS,
  MENU_DELETE_ITEM_FAILURE,
  MENU_ADD_IMAGE_REQUEST,
  MENU_ADD_IMAGE_SUCCESS,
  MENU_ADD_IMAGE_FAILURE,
  CHANGE_IMAGE,
  MENU_DELETE_IMAGE_REQUEST,
  MENU_DELETE_IMAGE_SUCCESS,
  MENU_DELETE_IMAGE_FAILURE
} from './types';

import { post } from '../../utils/api';

export const createMenu = async () => async dispatch => {
  dispatch({ type: MENU_CREATE_REQUEST });
  try {
    const { menu } = await post('/v1/menus');

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
    dispatch({ type: MENU_ADD_CATEGORY_SUCCESS });
  } catch (e) {
    dispatch({ type: MENU_ADD_CATEGORY_FAILURE });
  }
};

export const editCategory = async (
  menuId: string,
  categoryId: string
) => async dispatch => {
  dispatch({
    type: EDIT_CATEGORY,
    payload: { categoryId }
  });
};

export const updateCategory = async (
  menuId: string,
  categoryId: string,
  title: string
) => async dispatch => {
  dispatch({ type: MENU_UPDATE_CATEGORY_REQUEST });
  try {
    dispatch({
      type: MENU_UPDATE_CATEGORY_SUCCESS,
      payload: { categoryId }
    });
  } catch (e) {
    dispatch({ type: MENU_UPDATE_CATEGORY_FAILURE });
  }
};

export const deleteCategory = async (
  menuId: string,
  categoryId: number
) => async dispatch => {
  dispatch({type: MENU_DELETE_CATEGORY_REQUEST});
  try {
    dispatch({
      type: MENU_DELETE_CATEGORY_SUCCESS,
      payload: { categoryId }
    });
  } catch (e) {
    dispatch({type: MENU_DELETE_CATEGORY_FAILURE});
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
    dispatch({
      type: MENU_ADD_ITEM_SUCCESS,
      payload: categoryId
    });
  } catch (e) {
    dispatch({ type: MENU_ADD_ITEM_FAILURE });
  }
};

export const editItem = async (
  menuId: string,
  categoryId: string,
  itemId: string
) => async dispatch => {
  dispatch({
    type: EDIT_ITEM,
    payload: { categoryId, itemId }
  });
}

export const updateItem = async (
  menuId: string,
  categoryId: string,
  title: string,
  description: string,
  price: number,
  itemId: string
) => async dispatch => {
  dispatch({ type: MENU_UPDATE_ITEM_REQUEST });
  try {
    dispatch({
      type: MENU_UPDATE_ITEM_SUCCESS,
      payload: { categoryId, itemId }
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
    dispatch({
      type: MENU_DELETE_ITEM_SUCCESS,
      payload: { categoryId, itemId }
    });
  } catch (e) {
    dispatch({ type: MENU_DELETE_ITEM_FAILURE });
  }
};

export const addImage = async (
  menuId: string,
  categoryId: string,
  itemId: string
) => async dispatch => {
  dispatch({ type: MENU_ADD_IMAGE_REQUEST });
  try {
    dispatch({
      type: MENU_ADD_IMAGE_SUCCESS,
      payload: { categoryId, itemId }
    });
  } catch (e) {
    dispatch({ type: MENU_ADD_IMAGE_FAILURE });
  }
};

export const changeImage = async (
  menuId: string,
  categoryId: stirng,
  itemId: string,
  imageId: string,
  imageObjPath: any
) => async dispatch => {
  dispatch({
    type: CHANGE_IMAGE,
    payload: { categoryId, itemId, imageId, imageObjPath }
  });
};

export const deleteImage = async (
  menuId: string,
  categoryId: string,
  itemId: string,
  imageId: string
) => async dispatch => {
  dispatch({ type: MENU_DELETE_IMAGE_REQUEST });
  try {
    dispatch({
      type: MENU_DELETE_IMAGE_SUCCESS,
      payload: { categoryId, itemId, imageId }
    });
  } catch (e) {
    dispatch({ type: MENU_DELETE_IMAGE_FAILURE });
  }
};
