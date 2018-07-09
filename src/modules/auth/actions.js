// @flow
import {Platform} from 'react-native';
import {fromJS} from 'immutable';
import {Buffer} from 'buffer';
import {
  LOGIN_WITH_EMAIL_REQUEST,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_FAILURE,
  LOGIN_WITH_FACEBOOK_REQUEST,
  LOGIN_WITH_FACEBOOK_SUCCESS,
  LOGIN_WITH_FACEBOOK_FAILURE,
  SET_AUTHENTICATION_TOKEN,
  CLEAR_AUTHENTICATION_TOKEN
} from './types';
import {post} from '../../utils/api';
import {setAuthenticationToken as cacheToken} from '../../utils/authentication';

export const setAuthenticationToken = async user => {
  const userId = user.get('_id');
  const sessions = user.get('sessions');
  const session = sessions.get(0);
  const sessionId = session.get('_id');
  const preCodedToken = `${userId}:${sessionId}`;
  const encodedToken = Buffer.from(preCodedToken).toString('base64');
  const finalToken = `Basic ${encodedToken}`;

  await cacheToken(finalToken);

  return {
    type: SET_AUTHENTICATION_TOKEN,
    payload: finalToken
  };
};

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
      payload: fromJS(user)
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
) => async (dispatch: ReduxDispatch) => {
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
      payload: fromJS(user)
    });
  } catch (e) {
    dispatch({
      type: LOGIN_WITH_FACEBOOK_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
