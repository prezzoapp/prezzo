import {
  LIST_OPEN_TABLE_REQUEST,
  LIST_QUEUED_TABLE_REQUEST,
  LIST_DELIVERED_TABLE_REQUEST,
  ACCEPT_QUEUED_REQUEST,
  DELETE_QUEUED_REQUEST,
  SECTION_CHANGE,
  LAYOUT_CHANGE,
  CLOSED_TABLE_SECTION_CHANGE
} from './types';

// import store from '../../redux/store';

export const listWaiterRequestTable = () => ({
  type: LIST_OPEN_TABLE_REQUEST,
  payload: null
});

export const listPhotoReviewTable = () => ({
  type: LIST_QUEUED_TABLE_REQUEST,
  payload: null
});

export const listDeliveredTable = () => ({
  type: LIST_DELIVERED_TABLE_REQUEST,
  payload: null
});

export const acceptQueuedRequest = (queueList: any, requestId: string) => {
  const queuedList = queueList.filter(element => element.id != requestId);
  return {
    type: ACCEPT_QUEUED_REQUEST,
    payload: queuedList
  };
};

export const deleteQueuedRequest = (queueList: any, requestId: string) => {
  const queuedList = queueList.filter(element => element.id != requestId);
  return {
    type: DELETE_QUEUED_REQUEST,
    payload: queuedList
  };
};

export const changeSection = (section: number) => ({
  type: SECTION_CHANGE,
  payload: section
});

export const changeLayout = (layout: string) => ({
  type: LAYOUT_CHANGE,
  payload: layout
});

export const changeClosedSection = (section: number) => ({
  type: CLOSED_TABLE_SECTION_CHANGE,
  payload: section
});
