// @flow
export const CREATE_VENDOR_REQUEST = 'vendor/CREATE_VENDOR_REQUEST';
export const CREATE_VENDOR_SUCCESS = 'vendor/CREATE_VENDOR_SUCCESS';
export const CREATE_VENDOR_FAILURE = 'vendor/CREATE_VENDOR_FAILURE';

export const UPDATE_VENDOR_REQUEST = 'vendor/UPDATE_VENDOR_REQUEST';
export const UPDATE_VENDOR_SUCCESS = 'vendor/UPDATE_VENDOR_SUCCESS';
export const UPDATE_VENDOR_FAILURE = 'vendor/UPDATE_VENDOR_FAILURE';

export type State = {
  error: string | null,
  data: any,
  isBusy: boolean
};
