// @flow
import {Platform} from 'react-native';
import {fromJS} from 'immutable';
import {
  UPDATE_FIRST_NAME,
  UPDATE_LAST_NAME,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_AVATAR_URL,
  UPDATE_FACEBOOK_ID,
  UPDATE_FACEBOOK_TOKEN,
  UPDATE_SUBSCRIPTION_TO_PROMOTIONS,
  CLEAR_ERRORS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_RESET
} from './types';
import {post} from '../../utils/api';

export const updateFirstName = (firstName: string) => {
  return {
    type: UPDATE_FIRST_NAME,
    payload: firstName
  };
};

export const updateLastName = (lastName: string) => {
  return {
    type: UPDATE_LAST_NAME,
    payload: lastName
  };
};

export const updateEmail = (email: string) => {
  return {
    type: UPDATE_EMAIL,
    payload: email
  };
};

export const updatePassword = (password: string) => {
  return {
    type: UPDATE_PASSWORD,
    payload: password
  };
};

export const updateFacebookId = (id: string) => {
  return {
    type: UPDATE_FACEBOOK_ID,
    payload: id
  };
};

export const updateFacebookToken = (token: string) => {
  return {
    type: UPDATE_FACEBOOK_TOKEN,
    payload: token
  };
};

export const updateAvatarURL = (avatarURL: string) => {
  return {
    type: UPDATE_AVATAR_URL,
    payload: avatarURL
  };
};

export const updateSubscriptionToPromotions = (
  isSubscribedToPromotions: boolean
) => {
  return {
    type: UPDATE_SUBSCRIPTION_TO_PROMOTIONS,
    payload: isSubscribedToPromotions
  };
};

export const signup = async () => async (
  dispatch: ReduxDispatch,
  getState: GetState
) => {
  dispatch({
    type: SIGNUP_REQUEST
  });

  const data = getState().get('signup');
  const firstName = data.get('firstName');
  const lastName = data.get('lastName');
  const email = data.get('email');
  const password = data.get('password');
  const avatarURL = data.get('avatarURL');
  const facebookId = data.get('facebookId');
  const facebookToken = data.get('facebookToken');

  try {
    const user = await post(`/v1/users?login=${Platform.OS}`, {
      firstName,
      lastName,
      email,
      password,
      avatarURL,
      facebookId,
      facebookToken
    });

    return dispatch({
      type: SIGNUP_SUCCESS,
      payload: fromJS(user)
    });
  } catch (e) {
    dispatch({
      type: SIGNUP_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const reset = {
  type: SIGNUP_RESET
};
