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
} from '../../../modules/vendorActivity';

export const mapStateToProps = state => ({
  layout: state.get('vendorActivity').get('layout'),
  section: state.get('vendorActivity').get('section'),
  openTableList: state.get('vendorActivity').get('openTableList'),
  queuedTableList: state.get('vendorActivity').get('queuedTableList'),
  deliveredTableSection: state
    .get('vendorActivity')
    .get('deliveredTableSection'),
  deliveredTableList: state.get('vendorActivity').get('deliveredTableList'),
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
