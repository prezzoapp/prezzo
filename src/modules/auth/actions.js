// @flow
import {Platform} from 'react-native';
import {
  LOGIN_WITH_EMAIL_REQUEST,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_FAILURE,
  LOGIN_WITH_FACEBOOK_REQUEST,
  LOGIN_WITH_FACEBOOK_SUCCESS,
  LOGIN_WITH_FACEBOOK_FAILURE
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
      payload: user
    });
  } catch (e) {
    dispatch({
      type: LOGIN_WITH_FACEBOOK_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
