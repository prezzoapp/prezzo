// @flow
import { fromJS } from 'immutable';
import {
  TOGGLE_FILTER_REQUEST,
  TOGGLE_FILTER_SUCCESS,
  TOGGLE_FILTER_FAILURE
} from './types';

const restaurants = [];

for (let i = 0; i < 5; i += 1) {
  restaurants.push({
    id: i,
    imagePath: require('../../../assets/images/card_1.jpg'),
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
  filters: [
    {
      id: 0,
      filterType: 'realtime',
      name: 'Open Now',
      active: false,
      image: require('../../../assets/images/filters/realtime-protection.png')
    },
    {
      id: 1,
      filterType: 'price',
      name: 'Price',
      active: false,
      image: require('../../../assets/images/filters/dollar-sign-icon.png')
    },
    {
      id: 2,
      filterType: 'wifi',
      name: 'Wifi',
      active: false,
      image: require('../../../assets/images/filters/wifi-icon.png')
    },
    {
      id: 3,
      filterType: 'delivery',
      name: 'Delivery',
      active: false,
      image: require('../../../assets/images/filters/delivery.png')
    },
    {
      id: 4,
      filterType: 'breakfast',
      name: 'Breakfast',
      active: false,
      image: require('../../../assets/images/filters/breakfast.png')
    }
  ],
  sections: [
    {
      title: 'trending',
      data: [restaurants]
    },
    {
      title: 'featured',
      data: [restaurants]
    },
    {
      title: 'near me',
      data: [restaurants]
    }
  ],
  restaurants
});

export default (state = INITIAL_STATE, action) => {
  let oldFilters;
  let newFilters;
  let immutableFilters;

  switch (action.type) {
    case TOGGLE_FILTER_SUCCESS:
      oldFilters = state.get('filters').toJS();
      newFilters = oldFilters.map(filter => {
        const newFilter = { ...filter };
        if (filter.id === action.payload) {
          newFilter.active = !filter.active;
        }

        return newFilter;
      });
      immutableFilters = fromJS(newFilters);

      return state.set('filters', immutableFilters);
    case TOGGLE_FILTER_REQUEST:
    case TOGGLE_FILTER_FAILURE:
    default:
      return state;
  }
};
