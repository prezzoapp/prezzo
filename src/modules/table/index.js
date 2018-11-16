import {
  listOpenTable,
  listQueuedTable,
  acceptQueuedRequest,
  deleteQueuedRequest,
  changeSection,
  changeLayout,
  changeClosedSection,
  listClosedTable,
  changeOrderStatus,
  makePaymentAndCompleteOrder
} from './actions';

import reducer from './reducer';

export {
  listOpenTable,
  listQueuedTable,
  acceptQueuedRequest,
  deleteQueuedRequest,
  changeSection,
  changeLayout,
  changeClosedSection,
  listClosedTable,
  changeOrderStatus,
  makePaymentAndCompleteOrder
};

export default reducer;
