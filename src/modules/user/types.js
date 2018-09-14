// @flow
export const FIND_USER_REQUEST = 'user/FIND_USER_REQUEST';
export const FIND_USER_SUCCESS = 'user/FIND_USER_SUCCESS';
export const FIND_USER_FAILURE = 'user/FIND_USER_FAILURE';

export const UPDATE_USER_REQUEST = 'user/UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'user/UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'user/UPDATE_USER_FAILURE';

export type State = {
  account: UserType,
  error: string | null
};
