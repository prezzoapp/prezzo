import {
    LIST_OPEN_TABLE_REQUEST,
    LIST_QUEUED_TABLE_REQUEST,
    ACCEPT_QUEUED_REQUEST,
    DELETE_QUEUED_REQUEST
} from './types';

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

  export const acceptQueuedRequest = (requestId: string) => {
   
    return {
      type: ACCEPT_QUEUED_REQUEST,
      payload: requestId
    };
  };

  export const deleteQueuedRequest = (requestId: string) => {
    return {
      type: ACCEPT_QUEUED_REQUEST,
      payload: requestId
    };
  };