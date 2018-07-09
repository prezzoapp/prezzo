// @flow
export const UPDATE_USER_REQUEST = 'User/UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'User/UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'User/UPDATE_USER_FAILURE';

export type State = {
  account: UserType,
  error: string | null
};
