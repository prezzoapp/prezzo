// @flow
import {Map} from 'immutable';
import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from './types';
import {post} from '../../utils/api';

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
