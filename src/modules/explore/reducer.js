// @flow
import { fromJS } from 'immutable';
import {
  TOGGLE_FILTER_REQUEST,
  TOGGLE_FILTER_SUCCESS,
  TOGGLE_FILTER_FAILURE,
  LIST_VENDORS_REQUEST,
  LIST_VENDORS_SUCCESS,
  LIST_VENDORS_FAILURE,
  UPDATE_DISTANCE_REQUEST,
  UPDATE_DISTANCE_SUCCESS,
  UPDATE_DISTANCE_FAILURE,
  UPDATE_PRICE_FILTER_REQUEST,
  UPDATE_PRICE_FILTER_SUCCESS,
  UPDATE_PRICE_FILTER_FAILURE,
  DISABLE_VENDOR_LIST_ITEM,
  GET_USER_CURRENT_LOCATION_REQUEST,
  GET_USER_CURRENT_LOCATION_SUCCESS,
  GET_USER_CURRENT_LOCATION_FAILURE
} from './types';

const restaurants = [];

const INITIAL_STATE = fromJS({
  isBusy: false,
  filters: [
    {
      _id: 0,
      filterType: 'openNow',
      name: 'Open Now',
      on: false,
      image: require('../../../assets/images/filters/realtime-protection.png')
    },
    {
      _id: 1,
      filterType: 'price',
      name: 'Price',
      on: false,
      image: require('../../../assets/images/filters/dollar-sign-icon.png')
    },
    {
      _id: 2,
      filterType: 'wifi',
      name: 'Wifi',
      on: false,
      image: require('../../../assets/images/filters/wifi-icon.png')
    }
  ],
  restaurants,
  minDistance: 1,
  maxDistance: 10,
  distance: 10,
  pricing: 1
});

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  let oldFilters;
  let newFilters;
  let immutableFilters;

  switch (type) {
    case TOGGLE_FILTER_REQUEST:
    case LIST_VENDORS_REQUEST:
    case UPDATE_DISTANCE_REQUEST:
    case UPDATE_PRICE_FILTER_REQUEST:
    case GET_USER_CURRENT_LOCATION_REQUEST:
      return state.set('isBusy', true);
    case TOGGLE_FILTER_FAILURE:
    case LIST_VENDORS_FAILURE:
    case UPDATE_DISTANCE_FAILURE:
    case UPDATE_PRICE_FILTER_FAILURE:
    case GET_USER_CURRENT_LOCATION_FAILURE:
    case GET_USER_CURRENT_LOCATION_SUCCESS:
      return state.set('isBusy', false);
    case TOGGLE_FILTER_SUCCESS:
      oldFilters = state.get('filters').toJS();
      newFilters = oldFilters.map(filter => {
        const newFilter = { ...filter };
        if (filter._id === payload) {
          newFilter.on = !filter.on;
        }

        return newFilter;
      });
      immutableFilters = fromJS(newFilters);

      return state.set('filters', immutableFilters);
    case LIST_VENDORS_SUCCESS:
      const updatedRestaurants = payload.map(ele => ele.set('disable', false));
      return state.update('isBusy', () => false).update('restaurants', () => updatedRestaurants);
    case UPDATE_DISTANCE_SUCCESS:
      return state
        .set('distance', payload)
        .set('isBusy', false);
    case UPDATE_PRICE_FILTER_SUCCESS:
        return state
        .update('pricing', () => payload)
        .update('isBusy', () => false);
    case DISABLE_VENDOR_LIST_ITEM:
      const updatedRest = state.get('restaurants').map(ele => {
        if(ele.get('_id') === payload) {
          return ele.update('disable', () => true);
        }
        return ele.update('disable', () => false);
      });
      console.log(updatedRest.toJS());
      return state.update('restaurants', () => updatedRest);
    default:
      return state;
  }
};
