import {
  listOpenTable,
  listQueuedTable,
  // acceptQueuedRequest,
  // deleteQueuedRequest,
  changeSection,
  changeLayout,
  // changeClosedSection,
  listClosedTable,
  changeOrderStatus,
  makePaymentAndCompleteOrder,
  openTableItemDetails,
  removeTableItemDetails,
  checkStatusAndCancelItem,
  checkOpenOrderStatus,
  checkQueueOrderStatus,
  loadMoreOpenTableList,
  loadMoreQueuedTableList,
  loadMoreClosedTableList
} from './actions';

import reducer from './reducer';

export {
  listOpenTable,
  listQueuedTable,
  // acceptQueuedRequest,
  // deleteQueuedRequest,
  changeSection,
  changeLayout,
  // changeClosedSection,
  listClosedTable,
  changeOrderStatus,
  makePaymentAndCompleteOrder,
  openTableItemDetails,
  removeTableItemDetails,
  checkStatusAndCancelItem,
  checkOpenOrderStatus,
  checkQueueOrderStatus,
  loadMoreOpenTableList,
  loadMoreQueuedTableList,
  loadMoreClosedTableList
};

export default reducer;
