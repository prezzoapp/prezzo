// @flow
import {Platform} from 'react-native';
import {Map} from 'immutable';
import {
  LOGIN_WITH_EMAIL_REQUEST,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_FAILURE,
  LOGIN_WITH_FACEBOOK_REQUEST,
  LOGIN_WITH_FACEBOOK_SUCCESS,
  LOGIN_WITH_FACEBOOK_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from './types';
import {post} from '../../utils/api';

export const loginWithEmail = async (email: string, password: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: LOGIN_WITH_EMAIL_REQUEST
  });

  try {
    const type = Platform.OS;
    const user = await post('/v1/auth/login', {
      email,
      password,
      type
    });

    return dispatch({
      type: LOGIN_WITH_EMAIL_SUCCESS,
      payload: user
    });
  } catch (e) {
    dispatch({
      type: LOGIN_WITH_EMAIL_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};

export const loginWithFacebook = async (
  facebookId: string,
  facebookToken: string
) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: LOGIN_WITH_FACEBOOK_REQUEST
  });

  try {
    const type = Platform.OS;
    const user = await post('/v1/auth/facebook', {
      facebookId,
      facebookToken,
      type
    });

    return dispatch({
      type: LOGIN_WITH_FACEBOOK_SUCCESS,
      payload: Map(user)
    });
  } catch (e) {
    dispatch({
      type: LOGIN_WITH_FACEBOOK_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
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

  try {
    const currentUser = getState().get('auth').get('user');
    const updatedUser = await post(`/v1/users/${currentUser.get('_id')}`, {
      avatarURL,
      firstName,
      lastName,
      phone,
      address,
      zip,
      city
    });

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
