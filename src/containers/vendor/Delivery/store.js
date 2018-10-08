// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import {
  listOpenTable,
  listQueuedTable,
  acceptQueuedRequest,
  deleteQueuedRequest,
  changeSection,
  changeLayout,
  changeClosedSection,
  listDeliveredTable
} from '../../../modules/delivery';

export const mapStateToProps = state => ({
  layout: state.get('delivery').get('layout'),
  section: state.get('delivery').get('section'),
  openTableList: state.get('delivery').get('openTableList'),
  queuedTableList: state.get('delivery').get('queuedTableList'),
  deliveredTableSection: state.get('delivery').get('deliveredTableSection'),
  deliveredTableList: state.get('delivery').get('deliveredTableList'),
  vendorData: state.get('vendor').get('data')
});

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  listOpenTable: bindActionCreators(listOpenTable, dispatch),
  listQueuedTable: bindActionCreators(listQueuedTable, dispatch),
  acceptQueuedRequest: bindActionCreators(acceptQueuedRequest, dispatch),
  deleteQueuedRequest: bindActionCreators(deleteQueuedRequest, dispatch),
  changeSection: bindActionCreators(changeSection, dispatch),
  changeLayout: bindActionCreators(changeLayout, dispatch),
  changeClosedSection: bindActionCreators(changeClosedSection, dispatch),
  listDeliveredTable: bindActionCreators(listDeliveredTable, dispatch)
});
