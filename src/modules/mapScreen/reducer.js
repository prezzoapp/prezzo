import { fromJS } from 'immutable';

const initialState = fromJS({
  data: [
    {
      id: 1,
      name: 'Restaurant #1',
      distance: 0.34,
      status: 'Open Now',
      latitude: 28.006146,
      longitude: 73.3204178
    },
    {
      id: 2,
      name: 'Restaurant #2',
      distance: 0.72,
      status: 'Open Now',
      latitude: 28.006446,
      longitude: 73.3204478
    },
    {
      id: 3,
      name: 'Restaurant #3',
      distance: 1,
      status: 'Open Now',
      latitude: 28.006746,
      longitude: 73.3204778
    },
    {
      id: 4,
      name: 'Restaurant #4',
      distance: 0.66,
      status: 'Open Now',
      latitude: 28.006147,
      longitude: 73.3204179
    },
    {
      id: 5,
      name: 'Restaurant #5',
      distance: 2,
      status: 'Open Now',
      latitude: 28.006447,
      longitude: 73.3204479
    }
  ]
});

export default (state = initialState, action) => {
  return state;
};
