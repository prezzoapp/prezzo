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
  UPDATE_PRICE_FILTER_FAILURE
} from './types';

const restaurants = [];

// for (let i = 0; i < 5; i += 1) {
//   restaurants.push({
//     _id: i,
//     imagePath: require('../../../assets/images/exploreRestaurantItem.png'),
//     likes: 0,
//     name: 'True Food',
//     city: 'Santa Monica',
//     distance: 2,
//     status: 'Open Now',
//     latitude: 28.006447,
//     longitude: 73.3204479
//   });
// }

const INITIAL_STATE = fromJS({
  isBusy: false,
  filters: [
    {
      _id: 0,
      filterType: 'openNow',
      name: 'Open Now',
      on: true,
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
    // {
    //   _id: 3,
    //   filterType: 'delivery',
    //   name: 'Delivery',
    //   on: false,
    //   image: require('../../../assets/images/filters/delivery.png')
    // },
    // {
    //   _id: 4,
    //   filterType: 'breakfast',
    //   name: 'Breakfast',
    //   on: false,
    //   image: require('../../../assets/images/filters/breakfast.png')
    // }
  ],
  restaurants,
  minDistance: 1,
  maxDistance: 10,
  distance: 10,
  pricing: 0
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
      return state.set('isBusy', true);
    case TOGGLE_FILTER_FAILURE:
    case LIST_VENDORS_FAILURE:
    case UPDATE_DISTANCE_FAILURE:
    case UPDATE_PRICE_FILTER_FAILURE:
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
      return state.set('isBusy', false).set('restaurants', payload);
    case UPDATE_DISTANCE_SUCCESS:
      //console.log(payload.vendorsData.toJS());
      return state
        .set('isBusy', false)
        .set('restaurants', payload.vendorsData)
        .set('distance', payload.updatedDistance);
    case UPDATE_PRICE_FILTER_SUCCESS:
        return state
        // .update('pricing', () => action.payload.pricing)
        .update('restaurants', () => action.payload.updatedVendors)
        .update('isBusy', () => false);
    default:
      return state;
  }
};
