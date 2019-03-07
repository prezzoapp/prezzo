// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import {
  listWaiterRequestTable,
  listPhotoReviewTable,
  changeSection,
  changeLayout,
  addPhotoReviewItemDetails,
  removePhotoReviewItemDetails
} from '../../../modules/vendorActivity';

export const mapStateToProps = state => ({
  layout: state.get('vendorActivity').get('layout'),
  section: state.get('vendorActivity').get('section'),
  waiterRequestedTableList: state.get('vendorActivity').get('waiterRequestedTableList'),
  photoReviewList: state.get('vendorActivity').get('photoReviewList'),
  isBusy: state.get('vendorActivity').get('isBusy'),
  photoReviewSelectedItem: state.get('vendorActivity').get('photoReviewSelectedItem'),
  vendorData: state.get('vendor').get('data')
});

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  listWaiterRequestTable: bindActionCreators(listWaiterRequestTable, dispatch),
  listPhotoReviewTable: bindActionCreators(listPhotoReviewTable, dispatch),
  changeSection: bindActionCreators(changeSection, dispatch),
  changeLayout: bindActionCreators(changeLayout, dispatch),
  addPhotoReviewItemDetails: bindActionCreators(addPhotoReviewItemDetails, dispatch),
  removePhotoReviewItemDetails: bindActionCreators(removePhotoReviewItemDetails, dispatch)
});
