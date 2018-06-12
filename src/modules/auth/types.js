// @flow
export const LOGIN_WITH_EMAIL_REQUEST = 'Login/LOGIN_WITH_EMAIL_REQUEST';
export const LOGIN_WITH_EMAIL_SUCCESS = 'Login/LOGIN_WITH_EMAIL_SUCCESS';
export const LOGIN_WITH_EMAIL_FAILURE = 'Login/LOGIN_WITH_EMAIL_FAILURE';

export type State = {
  user: UserType,
  error: string | null
};
