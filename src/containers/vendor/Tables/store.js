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
  listClosedTable
} from '../../../modules/table';

export const mapStateToProps = state => ({
  layout: state.get('table').get('layout'),
  section: state.get('table').get('section'),
  openTableList: state.get('table').get('openTableList'),
  queuedTableList: state.get('table').get('queuedTableList'),
  closedTableSection: state.get('table').get('closedTableSection'),
  closedTableList: state.get('table').get('closedTableList'),
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
  listClosedTable: bindActionCreators(listClosedTable, dispatch)
});
