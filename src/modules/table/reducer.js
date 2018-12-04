// @flow
import { fromJS } from 'immutable';
import {
  LIST_OPEN_TABLE_REQUEST,
  LIST_OPEN_TABLE_SUCCESS,
  LIST_OPEN_TABLE_FAILURE,

  LIST_QUEUED_TABLE_SUCCESS,
  LIST_QUEUED_TABLE_FAILURE,
  LIST_QUEUED_TABLE_REQUEST,

  CHANGE_ORDER_STATUS_REQUEST,
  CHANGE_ORDER_STATUS_SUCCESS,
  CHANGE_ORDER_STATUS_FAILURE,

  MAKE_PAYMENT_AND_COMPLETE_ORDER_REQUEST,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_SUCCESS,
  MAKE_PAYMENT_AND_COMPLETE_ORDER_FAILURE,

  OPEN_TABLE_SELECTED_ITEM_REQUEST,
  OPEN_TABLE_SELECTED_ITEM_SUCCESS,
  OPEN_TABLE_SELECTED_ITEM_FAILURE,

  CHECK_OPEN_ORDER_STATUS_REQUEST,
  CHECK_OPEN_ORDER_STATUS_SUCCESS,
  CHECK_OPEN_ORDER_STATUS_FAILURE,

  CHECK_QUEUE_ORDER_STATUS_REQUEST,
  CHECK_QUEUE_ORDER_STATUS_SUCCESS,
  CHECK_QUEUE_ORDER_STATUS_FAILURE,

  CHANGE_STATUS_AND_CANCEL_ORDER_REQUEST,
  CHANGE_STATUS_AND_CANCEL_ORDER_SUCCESS,
  CHANGE_STATUS_AND_CANCEL_ORDER_FAILURE,
  SHOW_ALERT,

  LIST_CLOSED_TABLE_REQUEST,
  LIST_CLOSED_TABLE_SUCCESS,
  LIST_CLOSED_TABLE_FAILURE,
  ACCEPT_QUEUED_REQUEST,
  DELETE_QUEUED_REQUEST,
  SECTION_CHANGE,
  LAYOUT_CHANGE,
  CLOSED_TABLE_SECTION_CHANGE
} from './types';

function getDummyData() {
  return [
    {
      id: '1',
      userName: 'Danny',
      tableId: 1221,
      userImg:
        'https://wrappixel.com/ampleadmin/ampleadmin-html/plugins/images/users/varun.jpg',
      status: false,
      items: [
        {
          imgUrl: require('../../../assets/images/item2.png'),
          itemName: 'Buffalo Cauliflower',
          quantity: 2,
          status: 1
        },
        {
          imgUrl: require('../../../assets/images/item8.png'),
          itemName: "Mac n' Cheese",
          quantity: 3,
          status: 2
        },
        {
          imgUrl: require('../../../assets/images/item6.png'),
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
      tableId: 1242,
      userImg:
        'https://wrappixel.com/ampleadmin/ampleadmin-html/plugins/images/users/varun.jpg',
      status: true,
      items: [
        {
          imgUrl: require('../../../assets/images/item2.png'),
          itemName: 'Buffalo Cauliflower',
          quantity: 2,
          status: 2
        },
        {
          imgUrl: require('../../../assets/images/item8.png'),
          itemName: "Mac n' Cheese",
          quantity: 3,
          status: 2
        },
        {
          imgUrl: require('../../../assets/images/item6.png'),
          itemName: 'BBQ Pinapple',
          quantity: 2,
          status: 1
        }
      ]
    },
    {
      id: '3',
      userName: 'Angelica',
      tableId: 1223,
      userImg:
        'https://wrappixel.com/ampleadmin/ampleadmin-html/plugins/images/users/varun.jpg',
      status: true,
      items: [
        {
          imgUrl: require('../../../assets/images/item8.png'),
          itemName: "Mac n' Cheese",
          quantity: 3,
          status: 2
        },
        {
          imgUrl: require('../../../assets/images/item6.png'),
          itemName: 'BBQ Pinapple',
          quantity: 2,
          status: 1
        }
      ]
    },
    {
      id: '4',
      userName: 'James',
      tableId: 1341,
      userImg:
        'https://wrappixel.com/ampleadmin/ampleadmin-html/plugins/images/users/varun.jpg',
      status: true,
      items: [
        {
          imgUrl: require('../../../assets/images/item6.png'),
          itemName: 'BBQ Pinapple',
          quantity: 2,
          status: 1
        },
        {
          imgUrl: require('../../../assets/images/item2.png'),
          itemName: 'Buffalo Cauliflower',
          quantity: 2,
          status: 1
        }
      ]
    },
    {
      id: '5',
      userName: 'James',
      tableId: 1341,
      userImg:
        'https://wrappixel.com/ampleadmin/ampleadmin-html/plugins/images/users/varun.jpg',
      status: true,
      items: [
        {
          imgUrl: require('../../../assets/images/item6.png'),
          itemName: 'BBQ Pinapple',
          quantity: 2,
          status: 1
        },
        {
          imgUrl: require('../../../assets/images/item2.png'),
          itemName: 'Buffalo Cauliflower',
          quantity: 2,
          status: 1
        }
      ]
    },
    {
      id: '6',
      userName: 'James',
      tableId: 1341,
      userImg:
        'https://wrappixel.com/ampleadmin/ampleadmin-html/plugins/images/users/varun.jpg',
      status: true,
      items: [
        {
          imgUrl: require('../../../assets/images/item6.png'),
          itemName: 'BBQ Pinapple',
          quantity: 2,
          status: 1
        },
        {
          imgUrl: require('../../../assets/images/item2.png'),
          itemName: 'Buffalo Cauliflower',
          quantity: 2,
          status: 1
        }
      ]
    },
    {
      id: '7',
      userName: 'James',
      tableId: 1341,
      userImg:
        'https://wrappixel.com/ampleadmin/ampleadmin-html/plugins/images/users/varun.jpg',
      status: true,
      items: [
        {
          imgUrl: require('../../../assets/images/item6.png'),
          itemName: 'BBQ Pinapple',
          quantity: 2,
          status: 1
        },
        {
          imgUrl: require('../../../assets/images/item2.png'),
          itemName: 'Buffalo Cauliflower',
          quantity: 2,
          status: 1
        }
      ]
    },
    {
      id: '8',
      userName: 'James',
      tableId: 1341,
      userImg:
        'https://wrappixel.com/ampleadmin/ampleadmin-html/plugins/images/users/varun.jpg',
      status: true,
      items: [
        {
          imgUrl: require('../../../assets/images/item6.png'),
          itemName: 'BBQ Pinapple',
          quantity: 2,
          status: 1
        },
        {
          imgUrl: require('../../../assets/images/item2.png'),
          itemName: 'Buffalo Cauliflower',
          quantity: 2,
          status: 1
        }
      ]
    },
    {
      id: '9',
      userName: 'James',
      tableId: 1341,
      userImg:
        'https://wrappixel.com/ampleadmin/ampleadmin-html/plugins/images/users/varun.jpg',
      status: true,
      items: [
        {
          imgUrl: require('../../../assets/images/item6.png'),
          itemName: 'BBQ Pinapple',
          quantity: 2,
          status: 1
        },
        {
          imgUrl: require('../../../assets/images/item2.png'),
          itemName: 'Buffalo Cauliflower',
          quantity: 2,
          status: 1
        }
      ]
    },
    {
      id: '10',
      userName: 'James',
      tableId: 1341,
      userImg:
        'https://wrappixel.com/ampleadmin/ampleadmin-html/plugins/images/users/varun.jpg',
      status: true,
      items: [
        {
          imgUrl: require('../../../assets/images/item6.png'),
          itemName: 'BBQ Pinapple',
          quantity: 2,
          status: 1
        },
        {
          imgUrl: require('../../../assets/images/item2.png'),
          itemName: 'Buffalo Cauliflower',
          quantity: 2,
          status: 1
        }
      ]
    }
  ];
}

const INITIAL_STATE = fromJS({
  layout: 'list',
  section: 0,
  closedTableSection: 0,
  openTableList: [],
  queuedTableList: [],
  closedTableList: [],
  openTableSelectedItem: null,
  isBusy: false,
  openOrderFinalStatus: ''
});

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_OPEN_TABLE_REQUEST:
    return state.update('isBusy', () => true);

    case LIST_OPEN_TABLE_FAILURE:
    return state.update('isBusy', () => false);

    case LIST_QUEUED_TABLE_REQUEST:
    return state.update('isBusy', () => true);

    case LIST_QUEUED_TABLE_FAILURE:
    return state.update('isBusy', () => false);

    case CHANGE_ORDER_STATUS_REQUEST:
    return state.update('isBusy', () => true);

    case CHANGE_ORDER_STATUS_FAILURE:
    return state.update('isBusy', () => false);

    case LIST_CLOSED_TABLE_REQUEST:
    return state.update('isBusy', () => true);

    case LIST_CLOSED_TABLE_FAILURE:
    return state.update('isBusy', () => false);

    case MAKE_PAYMENT_AND_COMPLETE_ORDER_REQUEST:
    case OPEN_TABLE_SELECTED_ITEM_REQUEST:
       return state.update('isBusy', () => true);


    case LIST_OPEN_TABLE_SUCCESS:
      return state.update('openTableList', () => action.payload).update('isBusy', () => false);

    case LIST_QUEUED_TABLE_SUCCESS:
      return state.update('queuedTableList', () => action.payload).update('isBusy', () => false);

    case ACCEPT_QUEUED_REQUEST:
      return state.update('queuedTableList', () => action.payload);

    case DELETE_QUEUED_REQUEST:
      return state.update('queuedTableList', () => action.payload);

    case SECTION_CHANGE:
      return state.update('section', () => action.payload);

    case LAYOUT_CHANGE:
      return state.update('layout', () => action.payload);

    case CLOSED_TABLE_SECTION_CHANGE:
      return state.update('closedTableSection', () => action.payload);

    case LIST_CLOSED_TABLE_SUCCESS:
      //return state.update('closedTableList', () => action.payload);
      return state.update('closedTableList', () => action.payload).update('isBusy', () => false);


    case CHECK_OPEN_ORDER_STATUS_SUCCESS:
    case CHANGE_STATUS_AND_CANCEL_ORDER_SUCCESS:
      // const updatedStateAfterOrderStatusCheck =
      //   (action.payload.get('finalStatus') === 'complete' ||
      //   action.payload.get('finalStatus') === 'denied')
      //     ? action.payload.update('order', () => [])
      //     : action.payload;
      //
      // return state
      //   .update('openTableSelectedItem', () => updatedStateAfterOrderStatusCheck)
      //   .update('isBusy', () => false);

      const updatedStateAfterOrderStatusCheck =
        (action.payload.first().get('status') === 'complete' ||
        action.payload.first().get('status') === 'denied')
          ? null
          : action.payload.first();

      return state
        .update('openTableSelectedItem', () => updatedStateAfterOrderStatusCheck)
        .update('openOrderFinalStatus', () => action.payload.get('status'))
        .update('isBusy', () => false);

    case CHECK_QUEUE_ORDER_STATUS_SUCCESS:
      console.log(action.payload.get('order').first().get('status'));
      if(
        action.payload.get('order').first().get('status') === 'active' ||
        action.payload.get('order').first().get('status') === 'denied' ||
        action.payload.get('order').first().get('status') === 'complete') {
        const newQueuedList = state.get('queuedTableList').filter(item => item.get('_id') !== action.payload.get('order').first().get('_id'));
        return state.update('queuedTableList', () => newQueuedList);
      }
      return state;

    case MAKE_PAYMENT_AND_COMPLETE_ORDER_SUCCESS:
      // const updatedStateAfterPayment =
      //   (action.payload.get('finalStatus') === 'complete')
      //     ? action.payload.update('order', () => [])
      //     : action.payload;
      //
      // return state
      //   .update('openTableSelectedItem', () => updatedStateAfterPayment)
      //   .update('isBusy', () => false);

      const updatedStateAfterPayment =
        (action.payload.get('status') === 'complete')
          ? null
          : action.payload.first();

      return state
        .update('openTableSelectedItem', () => updatedStateAfterPayment)
        .update('openOrderFinalStatus', () => action.payload.get('status'))
        .update('isBusy', () => false);

    case CHANGE_ORDER_STATUS_SUCCESS:
      return state;
      // console.log(action.payload.orderId, action.payload.status, action.payload.type);
      // if(action.payload.type === 'queued') {
      //   console.log("Queued List Item: ");
      //   console.log(state.get('queuedTableList').filter(item => {
      //     if(action.payload.status === 'active' && item.get('_id') === action.payload.orderId) {
      //       item.set('status', action.payload.status);
      //     }
      //     return item;
      //   }).toJS());
      // }

    case OPEN_TABLE_SELECTED_ITEM_SUCCESS:
      console.log(action.payload.toJS());
      return state.update('openTableSelectedItem', () => action.payload).update('isBusy', () => false);

    case MAKE_PAYMENT_AND_COMPLETE_ORDER_FAILURE:
      return state.update('isBusy', () => false);
    case SHOW_ALERT:
    default:
      return state;
  }
};

export default reducer;
