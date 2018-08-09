// @flow
import { fromJS } from 'immutable';
import {
  TOGGLE_FILTER_REQUEST,
  TOGGLE_FILTER_SUCCESS,
  TOGGLE_FILTER_FAILURE,
  LIST_VENDORS_REQUEST,
  LIST_VENDORS_SUCCESS,
  LIST_VENDORS_FAILURE
} from './types';

const restaurants = [];

for (let i = 0; i < 5; i += 1) {
  restaurants.push({
    _id: i,
    imagePath: require('../../../assets/images/exploreRestaurantItem.png'),
    likes: 0,
    name: 'True Food',
    city: 'Santa Monica',
    distance: 2,
    status: 'Open Now',
    latitude: 28.006447,
    longitude: 73.3204479
  });
}

const INITIAL_STATE = fromJS({
  isBusy: false,
  filters: [
    {
      _id: 0,
      filterType: 'realtime',
      name: 'Open Now',
      active: false,
      image: require('../../../assets/images/filters/realtime-protection.png')
    },
    {
      _id: 1,
      filterType: 'price',
      name: 'Price',
      active: false,
      image: require('../../../assets/images/filters/dollar-sign-icon.png')
    },
    {
      _id: 2,
      filterType: 'wifi',
      name: 'Wifi',
      active: false,
      image: require('../../../assets/images/filters/wifi-icon.png')
    },
    {
      _id: 3,
      filterType: 'delivery',
      name: 'Delivery',
      active: false,
      image: require('../../../assets/images/filters/delivery.png')
    },
    {
      _id: 4,
      filterType: 'breakfast',
      name: 'Breakfast',
      active: false,
      image: require('../../../assets/images/filters/breakfast.png')
    }
  ],
  restaurants
});

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  let oldFilters;
  let newFilters;
  let immutableFilters;

  switch (type) {
    case TOGGLE_FILTER_REQUEST:
    case LIST_VENDORS_REQUEST:
      return state.set('isBusy', true);
    case TOGGLE_FILTER_FAILURE:
    case LIST_VENDORS_FAILURE:
      return state.set('isBusy', false);
    case TOGGLE_FILTER_SUCCESS:
      oldFilters = state.get('filters').toJS();
      newFilters = oldFilters.map(filter => {
        const newFilter = { ...filter };
        if (filter._id === payload) {
          newFilter.active = !filter.active;
        }

        return newFilter;
      });
      immutableFilters = fromJS(newFilters);

      return state.set('filters', immutableFilters);
    case LIST_VENDORS_SUCCESS:
      return state.set('isBusy', false).set('restaurants', payload);
    default:
      return state;
  }
};
