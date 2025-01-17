// @flow
import { Map } from 'immutable';
import {
  LIST_OPEN_TABLE_REQUEST,
  LIST_QUEUED_TABLE_REQUEST,
  ACCEPT_QUEUED_REQUEST,
  DELETE_QUEUED_REQUEST,
  SECTION_CHANGE,
  LAYOUT_CHANGE,
  CLOSED_TABLE_SECTION_CHANGE,
  LIST_DELIVERED_TABLE_REQUEST
} from './types';

const INITIAL_STATE = Map({
  layout: 'list',
  section: 0,
  deliveredTableSection: 0,
  openTableList: [],
  queuedTableList: [],
  deliveredTableList: []
});

function getDummyData() {
  return [
    {
      id: '1',
      userName: 'Danny',
      address: '731 Admiralty Way, Marina del Rey CA',
      userImg:
        'https://wrappixel.com/ampleadmin/ampleadmin-html/plugins/images/users/varun.jpg',
      status: false,
      items: [
        {
          imgUrl: require('../../../assets/images/item5.png'),
          itemName: 'Buffalo Cauliflower',
          quantity: 2,
          status: 1
        },
        {
          imgUrl: require('../../../assets/images/item5.png'),
          itemName: "Mac n' Cheese",
          quantity: 3,
          status: 2
        },
        {
          imgUrl: require('../../../assets/images/item5.png'),
          itemName: 'BBQ Pinapple',
          quantity: 2,
          status: 1
        },
        {
          imgUrl: require('../../../assets/images/item5.png'),
          itemName: 'Mole Bowl',
          quantity: 1,
          status: 2
        }
      ]
    },
    {
      id: '2',
      userName: 'Robert',
      address: '731 Admiralty Way, Marina del Rey CA',
      userImg:
        'https://wrappixel.com/ampleadmin/ampleadmin-html/plugins/images/users/varun.jpg',
      status: true,
      items: [
        {
          imgUrl: require('../../../assets/images/item5.png'),
          itemName: 'Buffalo Cauliflower',
          quantity: 2,
          status: 2
        },
        {
          imgUrl: require('../../../assets/images/item5.png'),
          itemName: "Mac n' Cheese",
          quantity: 3,
          status: 2
        },
        {
          imgUrl: require('../../../assets/images/item5.png'),
          itemName: 'BBQ Pinapple',
          quantity: 2,
          status: 1
        }
      ]
    },
    {
      id: '3',
      userName: 'Angelica',
      address: '731 Admiralty Way, Marina del Rey CA',
      userImg:
        'https://wrappixel.com/ampleadmin/ampleadmin-html/plugins/images/users/varun.jpg',
      status: true,
      items: [
        {
          imgUrl: require('../../../assets/images/item5.png'),
          itemName: "Mac n' Cheese",
          quantity: 3,
          status: 2
        },
        {
          imgUrl: require('../../../assets/images/item5.png'),
          itemName: 'BBQ Pinapple',
          quantity: 2,
          status: 1
        }
      ]
    },
    {
      id: '3',
      userName: 'James',
      address: '731 Admiralty Way, Marina del Rey CA',
      userImg:
        'https://wrappixel.com/ampleadmin/ampleadmin-html/plugins/images/users/varun.jpg',
      status: true,
      items: [
        {
          imgUrl: require('../../../assets/images/item5.png'),
          itemName: 'BBQ Pinapple',
          quantity: 2,
          status: 1
        },
        {
          imgUrl: require('../../../assets/images/item5.png'),
          itemName: 'Buffalo Cauliflower',
          quantity: 2,
          status: 1
        }
      ]
    }
  ];
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_OPEN_TABLE_REQUEST:
      return state.update('openTableList', () => getDummyData());

    case LIST_QUEUED_TABLE_REQUEST:
      return state.update('queuedTableList', () => getDummyData());

    case ACCEPT_QUEUED_REQUEST:
      return state.update('queuedTableList', () => action.payload);

    case DELETE_QUEUED_REQUEST:
      return state.update('queuedTableList', () => action.payload);

    case SECTION_CHANGE:
      return state.update('section', () => action.payload);

    case LAYOUT_CHANGE:
      return state.update('layout', () => action.payload);

    case CLOSED_TABLE_SECTION_CHANGE:
      return state.update('deliveredTableSection', () => action.payload);

    case LIST_DELIVERED_TABLE_REQUEST:
      return state.update('deliveredTableList', () => getDummyData());
    default:
      return state;
  }
};

export default reducer;
