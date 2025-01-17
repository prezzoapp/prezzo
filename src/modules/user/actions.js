// @flow
import { Map, fromJS } from 'immutable';
import {
  FIND_USER_REQUEST,
  FIND_USER_SUCCESS,
  FIND_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_FACEBOOK_ACCOUNT_REQUEST,
  UPDATE_FACEBOOK_ACCOUNT_SUCCESS,
  UPDATE_FACEBOOK_ACCOUNT_FAILURE
} from './types';
import { get, post, put } from '../../utils/api';

export const findUser = async (id: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: FIND_USER_REQUEST
  });

  try {
    const user = await get(`/v1/users/${id}`);

    dispatch({
      type: FIND_USER_SUCCESS,
      payload: fromJS(user)
    });

    return user;
  } catch (err) {
    dispatch({
      type: FIND_USER_FAILURE,
      payload: err
    });

    throw err;
  }
};

export const updateUser = async (
  avatarURL: string,
  firstName: string,
  lastName: string,
  phone: string,
  address: string,
  zip: string,
  city: string
) => async (
  dispatch: ReduxDispatch,
  getState: GetState
) => {
  dispatch({
    type: UPDATE_USER_REQUEST
  });

  const params = {
    avatarURL,
    firstName,
    lastName,
    phone,
    address,
    zip,
    city
  };

  for (let key in params) {
    if (typeof params[key] === 'undefined') {
      delete params[key];
    }
  }

  try {
    const currentUser = getState().get('user').get('account');
    const updatedUser = await post(`/v1/users/${currentUser.get('_id')}`, params);

    return dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: Map(updatedUser)
    });
  } catch (e) {
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};

export const updateFacebookAccount = async (
  facebookId: string,
  facebookToken: string
) => async (dispatch: ReduxDispatch, getState: GetState) => {
  dispatch({
    type: UPDATE_FACEBOOK_ACCOUNT_REQUEST
  });

  const params = {
    facebookId,
    facebookToken
  };

  try {
    const currentUser = getState()
      .get('user')
      .get('account');
    const userId = currentUser.get('_id');
    const updatedUser = await put(`/v1/users/${userId}/facebook`, params);

    return dispatch({
      type: UPDATE_FACEBOOK_ACCOUNT_SUCCESS,
      payload: Map(updatedUser)
    });
  } catch (e) {
    dispatch({
      type: UPDATE_FACEBOOK_ACCOUNT_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
