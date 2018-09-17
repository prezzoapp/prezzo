// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { listOpenTable, listQueuedTable, acceptQueuedRequest, deleteQueuedRequest, changeSection } from '../../../modules/table';

export const mapStateToProps = state => ({
    section : state.get('table').get('section'),
    openTableList: state.get('table').get('openTableList'),
    queuedTableList: state.get('table').get('queuedTableList'),
});

export const mapDispatchToProps = (dispatch) => ({
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    listOpenTable: bindActionCreators(listOpenTable, dispatch),
    listQueuedTable: bindActionCreators(listQueuedTable, dispatch),
    acceptQueuedRequest: bindActionCreators(acceptQueuedRequest, dispatch),
    deleteQueuedRequest: bindActionCreators(deleteQueuedRequest, dispatch),
    changeSection: bindActionCreators(changeSection, dispatch)
});
