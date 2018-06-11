// @flow
import {Platform} from 'react-native';
import {
  UPDATE_FIRST_NAME,
  UPDATE_LAST_NAME,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_AVATAR_URL,
  UPDATE_SUBSCRIPTION_TO_PROMOTIONS,
  CLEAR_ERRORS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  RESET
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

export const updateAvatar = (avatarURL: string) => {
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

export const signup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  avatarURL: string
) => async (dispatch: ReduxDispatch) => {
  dispatch({
    type: SIGNUP_REQUEST
  });

  try {
    const user = await post(`/v1/users?login=${Platform.OS}`, {
      firstName,
      lastName,
      email,
      password,
      avatarURL
    });

    return dispatch({
      type: SIGNUP_SUCCESS,
      payload: user
    });
  } catch (e) {
    return dispatch({
      type: SIGNUP_FAILURE,
      payload: e && e.message ? e.message : e
    });
  }
};

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const reset = {
  type: RESET
};
