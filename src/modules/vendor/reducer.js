// @flow
import {Map} from 'immutable'
import {
  CREATE_VENDOR_REQUEST,
  CREATE_VENDOR_SUCCESS,
  CREATE_VENDOR_FAILURE,
  UPDATE_VENDOR_REQUEST,
  UPDATE_VENDOR_SUCCESS,
  UPDATE_VENDOR_FAILURE
} from './types';
import {UPDATE_USER_SUCCESS} from '../user/types';
import {
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_FACEBOOK_SUCCESS
} from '../auth/types';
import type State from './types';

const INITIAL_STATE: State = Map({
  isBusy: false,
  data: {
    name: 'Sage Bistro',

    categories: [
    {
      name: 'Vegan'
    }],

    hours: [
    {
      dayOfWeek: 1,
      closeTimeHour: 6,
      closeTimeMinutes: 0,
      openTimeHour: 9,
      openTimeMinutes: 0
    }],

    location: {
      address: '631 Washington Blvd',
      city: 'Los Angeles',
      country: 'United States',
      region: 'CA',
      postalCode: 90292,
      latitude: 0.0,
      longitude: 0.0
    },

    website: 'sagebistro.com'
  },
  error: null
});

const reducer = (state: State = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case CREATE_VENDOR_REQUEST:
      console.log("Create Vendor request");
    break;
    case UPDATE_VENDOR_REQUEST:
      return state.update('isBusy', () => true);
    case CREATE_VENDOR_FAILURE:
    case UPDATE_VENDOR_FAILURE:
      return state.update('isBusy', () => false);
    case CREATE_VENDOR_SUCCESS:
    case UPDATE_VENDOR_SUCCESS:
      return state.update('data', () => payload)
        .update('isBusy', () => false);
    case UPDATE_USER_SUCCESS:
    case LOGIN_WITH_EMAIL_SUCCESS:
    case LOGIN_WITH_FACEBOOK_SUCCESS:
      console.log('got payload', payload);
      console.log('payload vendor', payload.get('vendor'));
      return state.update('data', () => payload.get('vendor'))
        .update('isBusy', () => false);
    default:
      return state;
  }
};

export default reducer;
