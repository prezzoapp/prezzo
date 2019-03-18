// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import {
  listOpenTable,
  listQueuedTable,
  changeSection,
  changeLayout,
  listClosedTable,
  makePaymentAndCompleteOrder,
  changeOrderStatus,
  checkOpenOrderStatus,
  checkQueueOrderStatus
} from '../../../modules/table';
import { userLogout } from '../../../modules/auth';

export const mapStateToProps = state => ({
  layout: state.get('table').get('layout'),
  section: state.get('table').get('section'),
  openTableList: state.get('table').get('openTableList'),
  queuedTableList: state.get('table').get('queuedTableList'),
  closedTableSection: state.get('table').get('closedTableSection'),
  closedTableList: state.get('table').get('closedTableList'),
  vendorData: state.get('vendor').get('data'),
  isBusy: state.get('table').get('isBusy'),
  openOrderFinalStatus: state.get('table').get('openOrderFinalStatus')
});

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  listOpenTable: bindActionCreators(listOpenTable, dispatch),
  listQueuedTable: bindActionCreators(listQueuedTable, dispatch),
  changeSection: bindActionCreators(changeSection, dispatch),
  changeLayout: bindActionCreators(changeLayout, dispatch),
  listClosedTable: bindActionCreators(listClosedTable, dispatch),
  makePaymentAndCompleteOrder: bindActionCreators(makePaymentAndCompleteOrder, dispatch),
  changeOrderStatus: bindActionCreators(changeOrderStatus, dispatch),
  checkOpenOrderStatus: bindActionCreators(checkOpenOrderStatus, dispatch),
  checkQueueOrderStatus: bindActionCreators(checkQueueOrderStatus, dispatch),
  userLogout: bindActionCreators(userLogout, dispatch)
});
