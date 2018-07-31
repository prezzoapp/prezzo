import { fromJS } from 'immutable';

import {
  TOGGLE_FILTER_REQUEST,
  TOGGLE_FILTER_SUCCESS,
  TOGGLE_FILTER_FAILURE
} from './types';

const filters = fromJS({
  filters: [{
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
  ]
});

const filtersReducer = (state = filters, action) => {
  switch (action.type) {
    case TOGGLE_FILTER_SUCCESS:
      return state.set(
        'filters',
        state.get('filters').update(
          state.get('filters').findIndex(item => {
          return item.get('id') === action.payload;
          }),
          item => {
            return item.set('active', !item.get('active'));
          }
        )
      );

    case TOGGLE_FILTER_REQUEST:
    case TOGGLE_FILTER_FAILURE:
    default:
      return state;
  }
};

export default filtersReducer;
