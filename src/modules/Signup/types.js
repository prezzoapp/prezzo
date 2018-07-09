// @flow
export const UPDATE_FIRST_NAME = 'Signup/UPDATE_FIRST_NAME';
export const UPDATE_LAST_NAME = 'Signup/UPDATE_LAST_NAME';
export const UPDATE_EMAIL = 'Signup/UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'Signup/UPDATE_PASSWORD';
export const UPDATE_AVATAR_URL = 'Signup/UPDATE_AVATAR_URL';
export const UPDATE_FACEBOOK_ID = 'Signup/UPDATE_FACEBOOK_ID';
export const UPDATE_FACEBOOK_TOKEN = 'Signup/UPDATE_FACEBOOK_TOKEN';
export const UPDATE_SUBSCRIPTION_TO_PROMOTIONS = 'Signup/UPDATE_SUBSCRIPTION_TO_PROMOTIONS';
export const CLEAR_ERRORS = 'Signup/CLEAR_ERRORS';

export const SIGNUP_REQUEST = 'Signup/SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'Signup/SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'Signup/SIGNUP_FAILURE';

export const RESET = 'Signup/RESET';

export type State = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  avatarURL: string,
  isSubscribedToPromotions: boolean,
  error: string | null
};

export type UpdateFirstNameAction = {
  type: string,
  payload: string
};

export type UpdateLastNameAction = {
  type: string,
  payload: string
};

export type UpdateEmailNameAction = {
  type: string,
  payload: string
};

export type UpdatePasswordNameAction = {
  type: string,
  payload: string
};

export type UpdateAvatarURLAction = {
  type: string,
  payload: string
};

export type UpdateFacebookIdAction = {
  type: string,
  payload: string
};

export type UpdateFacebookTokenAction = {
  type: string,
  payload: string
};

export type UpdateSubscriptionToPromotionsAction = {
  type: string,
  payload: boolean
};

export type ClearErrorsAction = {
  type: string
};

export type SignupRequestAction = {
  type: string
};

export type SignupSuccessAction = {
  type: string,
  payload: UserType
};

export type SignupFailureAction = {
  type: string,
  payload: string
};

export type ResetAction = {
  type: string
};

export type Action = UpdateFirstNameAction | UpdateLastNameAction
  | UpdateEmailNameAction | UpdatePasswordNameAction | UpdateAvatarURLAction
  | UpdateFacebookIdAction | UpdateFacebookAccessTokenAction
  | UpdateSubscriptionToPromotionsAction | ClearErrorsAction | ResetAction;
