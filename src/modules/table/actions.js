import {
    LIST_OPEN_TABLE_REQUEST,
    LIST_QUEUED_TABLE_REQUEST,
    ACCEPT_QUEUED_REQUEST,
    DELETE_QUEUED_REQUEST
} from './types';

//import store from '../../redux/store';

export const listOpenTable = () => {
  
    return {
      type: LIST_OPEN_TABLE_REQUEST,
      payload: null
    };
  };

  export const listQueuedTable = () => {
    return {
      type: LIST_QUEUED_TABLE_REQUEST,
      payload: null
    };
  };

  export const acceptQueuedRequest = (queueList: any, requestId: string) => {
    
    let queuedList = queueList.filter((element) => {
      return element.id != requestId
    })
    return {
      type: ACCEPT_QUEUED_REQUEST,
      payload: queuedList
    };
   
    
  };

  export const deleteQueuedRequest = (queueList: any, requestId: string) => {
    let queuedList = queueList.filter((element) => {
      return element.id != requestId
    })
    return {
      type: ACCEPT_QUEUED_REQUEST,
      payload: queuedList
    };
  };